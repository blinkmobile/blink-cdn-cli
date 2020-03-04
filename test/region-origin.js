'use strict'

const test = require('ava')

const tenantData = require('../lib/tenant')

test.beforeEach(t => {
  t.context.logger = {
    log: () => {}
  }
})

test('Should get correct origin for ONEBLINK tenant', t => {
  const tenant = 'oneblink'
  const origin = tenantData.getOrigin(tenant)
  t.is(origin, tenantData.TENANTS.ONEBLINK)
})

test('Should get correct origin for CIVICPLUS tenant', t => {
  const tenant = 'civicplus'
  const origin = tenantData.getOrigin(tenant)
  t.is(origin, tenantData.TENANTS.CIVICPLUS)
})

test('Should get correct origin for NO tenant', t => {
  const tenant = null
  const origin = tenantData.getOrigin(tenant)
  t.is(origin, tenantData.TENANTS.ONEBLINK)
})
