'use strict';
const fs = require('fs');
const path = require('path');

const pify = require('pify');
const test = require('ava');
const temp = require('temp');
const mockery = require('mockery');

const fileData = 'test contents\n\n';
const pWriteFile = pify(fs.writeFile);
const pMkdir = pify(temp.mkdir);

const s3FactoryModule = './s3-bucket-factory';
const fileFilterModule = '../lib/file-filter';
const s3BucketContentsModule = '../lib/s3-bucket-contents';
const s3UploaderModule = '../lib/s3-uploader';

const fileFilterMock = bucket => file => true;
const s3BucketContentsMock = () => Promise.resolve([]);

const chainer = {
  on: () => chainer,
  send: () => chainer
};

const s3BucketFactoryMock = () => Promise.resolve({
  uploadBatch: params => {
    return chainer;
  }
});

const s3UploaderMock = {
  uploadBatch: () => Promise.resolve()
};

const makeArray = num => {
  let arr = [];
  for (let i = 0; i < num; ++i) {
    arr.push(i);
  }

  return arr;
};

const createFile = dir => id => {
  const filePath = path.join(dir, `${id}.js`);
  return pWriteFile(filePath, fileData);
};

temp.track();
mockery.enable();
mockery.registerMock(fileFilterModule, fileFilterMock);
mockery.registerMock(s3FactoryModule, s3BucketFactoryMock);
mockery.registerMock(s3BucketContentsModule, s3BucketContentsMock);
mockery.registerMock(s3UploaderModule, s3UploaderMock);
mockery.registerAllowables([
  '../commands/deploy',
  '../lib/file-list',
  'fs',
  'path']);

test.after(() => mockery.disable());

function makeTest (timerLabel, numFiles) {
  return t => {
    const deploy = require('../commands/deploy');
    const upload = dir => {
      console.time(timerLabel);
      deploy([dir]);
    };

    let tempPath;
    return pMkdir('temp' + numFiles).then(dirPath => {
      let count = makeArray(100);
      tempPath = dirPath;
      return Promise.all(count.map(createFile(tempPath)));
    }).then(results => upload(tempPath))
      .then(result => console.timeEnd(timerLabel));
  };
}

test('read 100 files from disk', makeTest('100Files', 100));

test('read 500 files from disk', makeTest('500Files', 500));

test('read 1000 files from disk', makeTest('1000Files', 1000));

test('read 2000 files from disk', makeTest('2000Files', 2000));
