/* @flow */
'use strict'

const test = require('ava')
const mockery = require('mockery')

const configHelperModule = './utils/config-helper'

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true })
  mockery.registerAllowable('../lib/s3-bucket-params', true)
  mockery.registerAllowables(['object-merge', 'object-foreach', 'clone-function', '../lib/s3-bucket-params'])
})

test.afterEach(() => {
  mockery.deregisterAll()
  mockery.resetCache()
  mockery.disable()
})

test.serial('it should return the stored params', (t) => {
  const config = {
    cdn: {
      scope: 'a',
      region: 'b',
      objectParams: {
        Expires: 60,
        ACL: 'public-read'
      }
    }
  }
  const expectedConfig = {
    computeChecksums: true,
    region: 'b',
    params: {
      Bucket: 'a',
      Expires: 60,
      ACL: 'public-read'
    }
  }

  const configHelperMock = {
    read: () => Promise.resolve(config),
    write: () => new Error('should not be executed')
  }

  mockery.registerMock(configHelperModule, configHelperMock)

  const scope = require('../lib/s3-bucket-params')

  t.plan(1)

  return scope.read('').then((s) => t.deepEqual(expectedConfig, s))
})

test.serial('it should return the default params and call write()', (t) => {
  const expected = {
    ACL: 'public-read',
    Bucket: 'a',
    Expires: 60
  }

  const configHelperMock = {
    read: () => Promise.resolve({
      cdn: {
        scope: 'a'
      }
    }),
    write: () => Promise.resolve({
      cdn: {
        scope: 'a',
        objectParams: {
          Expires: 60,
          ACL: 'public-read'
        }
      }
    })
  }

  mockery.registerMock(configHelperModule, configHelperMock)

  const scope = require('../lib/s3-bucket-params')

  return scope.read('')
    .then((s) => t.deepEqual(s.params, expected))
})
