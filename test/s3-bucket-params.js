'use strict';

const test = require('ava');
const mockery = require('mockery');

const configHelperModule = './utils/config-helper';
const s3BucketParamsModule = '../lib/s3-bucket-params';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(s3BucketParamsModule, true);
  mockery.registerAllowables(['object-merge', 'object-foreach', 'clone-function']);
});

test.afterEach(() => {
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should return the stored params', t => {
  const config = {
    cdn: {
      scope: 'a',
      region: 'b',
      objectParams: {
        Expires: 60,
        ACL: 'public-read'
      }
    }
  };
  const expectedConfig = {
    computeChecksums: true,
    region: 'b',
    params: {
      Bucket: 'a',
      Expires: 60,
      ACL: 'public-read'
    }
  };

  const configHelperMock = {
    read: () => Promise.resolve(config),
    write: () => new Error('should not be executed')
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(s3BucketParamsModule);

  t.plan(1);

  return scope.read().then(s => t.same(expectedConfig, s));
});

test.serial('it should return the default params and call write()', t => {
  const config = {
    cdn: {
      scope: 'a',
      objectParams: {
        Expires: 60,
        ACL: 'public-read'
      }
    }
  };

  const configHelperMock = {
    read: () => Promise.resolve(config),
    write: () => Promise.resolve(config.cdn.objectParams)
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(s3BucketParamsModule);

  return scope.read().then(s => t.same(config.objectParams, s.objectParams));
});
