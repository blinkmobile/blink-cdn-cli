'use strict'
// @flow
const TENANTS = {
  ONEBLINK: 'https://auth-api.blinkm.io',
  CIVICPLUS: 'https://auth-api.transform.civicplus.com'
}
module.exports = {
  getOrigin: (tenant /* : ?string */) /* : string */ => {
    if (!tenant) tenant = 'ONEBLINK'
    return Object.keys(TENANTS).includes(tenant.toUpperCase())
      ? TENANTS[tenant.toUpperCase()]
      : TENANTS.ONEBLINK
  },
  TENANTS
}
