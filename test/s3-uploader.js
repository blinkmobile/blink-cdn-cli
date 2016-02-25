'use strict';

const test = require('ava');
const mockery = require('mockery');

const s3UploaderModule = '../lib/s3-uploader.js';
const s3BucketFactoryModule = './s3-bucket-factory.js';

const fsMock = {
  createReadStream: () => ({
    on: () => true
  })
};

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(s3UploaderModule, true);
  mockery.registerMock('fs', fsMock);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should pass a configuration object to s3', t => {
  const chainer = {
    on: () => chainer,
    send: () => chainer
  };

  const s3BucketFactoryMock = () => Promise.resolve({
    upload: params => {
      t.ok(params.Key);
      t.ok(params.Body);

      return chainer;
    }
  });

  t.plan(2);

  mockery.registerMock(s3BucketFactoryModule, s3BucketFactoryMock);

  const uploader = require(s3UploaderModule);

  return uploader.upload(s3UploaderModule);
});
