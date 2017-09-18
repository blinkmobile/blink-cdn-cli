/* @flow */
'use strict'

const path = require('path')

const test = require('ava')
const mockery = require('mockery')

const identityModule = '@blinkmobile/bm-identity'
const requestModule = 'request'

const EXISTING_PROJECT_PATH = path.join(__dirname, 'fixtures', 'existing-project')

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
    this.getAccessToken = () => Promise.resolve('jwt')
  }

  function requestMock (url, options, cb) {
    cb(null, {
      statusCode: 200
    }, {
      Credentials: {}
    })
  }

  mockery.registerMock(identityModule, bmIdentityMock)
  mockery.registerMock(requestModule, requestMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return s3Factory(params, 'dev', EXISTING_PROJECT_PATH).then((s3) => t.truthy(s3.config.params.Bucket))
})

test.serial('it should reject and stop the spinner if authentication fails', (t) => {
  function bmIdentityMock () {
    this.getAccessToken = () => Promise.reject(new Error('test error'))
  }

  mockery.registerMock(identityModule, bmIdentityMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return t.throws(s3Factory({}, 'dev', EXISTING_PROJECT_PATH), 'test error')
})

test.serial('it should reject and stop the spinner if request for aws credentials fails', (t) => {
  function bmIdentityMock () {
    this.getAccessToken = () => Promise.resolve('jwt')
  }

  function requestMock (url, options, cb) {
    cb(new Error('test error'))
  }

  mockery.registerMock(identityModule, bmIdentityMock)
  mockery.registerMock(requestModule, requestMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return t.throws(s3Factory({}, 'dev', EXISTING_PROJECT_PATH), 'test error')
})

test.serial('it should reject and stop the spinner if aws credentials could not be retrieved', (t) => {
  function bmIdentityMock () {
    this.getAccessToken = () => Promise.resolve('jwt')
  }

  function requestMock (url, options, cb) {
    cb(null, {
      statusCode: 403
    }, {
      message: 'Forbidden'
    })
  }

  mockery.registerMock(identityModule, bmIdentityMock)
  mockery.registerMock(requestModule, requestMock)

  const s3Factory = require('../lib/s3-bucket-factory.js')
  return t.throws(s3Factory({}, 'dev', EXISTING_PROJECT_PATH), 'Forbidden')
})
