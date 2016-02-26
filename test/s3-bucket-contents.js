'use strict';

const test = require('ava');
const mockery = require('mockery');

const s3BucketContentsModule = '../lib/s3-bucket-contents.js';
const s3FactoryModule = './s3-bucket-factory';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(s3BucketContentsModule, true);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should reject if there is an error with s3', t => {
  const s3FactoryMock = () => Promise.resolve({
    listObjects: (d, cb) => cb(new Error('error'))
  });

  mockery.registerMock(s3FactoryModule, s3FactoryMock);

  const s3BucketContents = require(s3BucketContentsModule);
  let result = s3BucketContents();
  t.throws(result, 'Error: error');
});

test.serial('it should resolve with an array', t => {
  const response = {
    Contents: [{Key: 'test/1.js', LastModified:'Fri Feb 26 2016 16:24:07 GMT+1100 (AUS Eastern Daylight Time)'}]
  }
  const s3FactoryMock = () => Promise.resolve({
    listObjects: (d, cb) => cb(null, response)
  });

  mockery.registerMock(s3FactoryModule, s3FactoryMock);

  const s3BucketContents = require(s3BucketContentsModule);

  t.plan(1);
  return s3BucketContents().then(result => {
    t.same(result.length, 1);
  });
  
});
