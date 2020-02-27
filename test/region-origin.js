'use strict'

const test = require('ava')

const getTenantData = require('../lib/getTenantData')

test.beforeEach(t => {
  t.context.logger = {
    log: () => {}
  }
})

test('Should get correct origin for ONEBLINK tenant', t => {
  const tenant = 'oneblink'
  const origin = getTenantData.getOrigin(tenant)
  t.is(origin, getTenantData.TENANTS.ONEBLINK)
})

test('Should get correct origin for CIVICPLUS tenant', t => {
  const tenant = 'civicplus'
  const origin = getTenantData.getOrigin(tenant)
  t.is(origin, getTenantData.TENANTS.CIVICPLUS)
})

test('Should get correct origin for NO tenant', t => {
  const tenant = null
  const origin = getTenantData.getOrigin(tenant)
  t.is(origin, getTenantData.TENANTS.ONEBLINK)
})
