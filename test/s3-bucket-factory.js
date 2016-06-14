'use strict';

const test = require('ava');
const mockery = require('mockery');

const s3BucketParamsModule = './s3-bucket-params';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(s3BucketParamsModule, true);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test('it should have the bucket name pre-configured', (t) => {
  const params = {
    region: 'region',
    params: {
      Bucket: 'a',
      Expires: 60,
      ACL: 'public-read'
    }
  };

  const s3BucketParamsMock = {
    read: () => Promise.resolve(params)
  };

  mockery.warnOnUnregistered(false);
  mockery.registerMock(s3BucketParamsModule, s3BucketParamsMock);

  const s3Factory = require('../lib/s3-bucket-factory.js');
  return s3Factory().then((s3) => t.truthy(s3.config.params.Bucket));
});
