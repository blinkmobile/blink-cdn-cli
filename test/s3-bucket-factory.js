/* @flow */
'use strict'

const test = require('ava')
const mockery = require('mockery')

const identityModule = '@blinkmobile/bm-identity'

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true })
  mockery.warnOnUnregistered(false)
})

test.afterEach(() => {
  mockery.warnOnUnregistered(true)
  mockery.deregisterAll()
  mockery.resetCache()
  mockery.disable()
})

test.serial('it should have the bucket name pre-configured', (t) => {
  const params = {
    region: 'region',
    params: {
      Bucket: 'a',
      Expires: 60,
      ACL: 'public-read'
    }
  }

  function bmIdentityMock () {
    this.assumeAWSRole = () => Promise.resolve({accessKey: 'abcd'})
  }

  mockery.registerMock(identityModule, bmIdentityMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return s3Factory(params, 'dev').then((s3) => t.truthy(s3.config.params.Bucket))
})

test.serial('it should reject and stop the spinner if authentication fails', (t) => {
  const params = {
    region: 'region',
    params: {
      Bucket: 'a',
      Expires: 60,
      ACL: 'public-read'
    }
  }

  function bmIdentityMock () {
    this.assumeAWSRole = () => Promise.reject(new Error('test error'))
  }

  mockery.registerMock(identityModule, bmIdentityMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return t.throws(s3Factory(params, 'dev'), 'test error')
})
