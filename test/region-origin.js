'use strict'

const test = require('ava')

const tenant = require('../lib/tenant')

test.beforeEach(t => {
  t.context.logger = {
    log: () => {}
  }
})

test('Should get correct origin for ONEBLINK tenant', t => {
  const tenant = 'oneblink'
  const origin = tenant.getOrigin(tenant)
  t.is(origin, tenant.TENANTS.ONEBLINK)
})

test('Should get correct origin for CIVICPLUS tenant', t => {
  const tenant = 'civicplus'
  const origin = tenant.getOrigin(tenant)
  t.is(origin, tenant.TENANTS.CIVICPLUS)
})

test('Should get correct origin for NO tenant', t => {
  const tenant = null
  const origin = tenant.getOrigin(tenant)
  t.is(origin, tenant.TENANTS.ONEBLINK)
})
