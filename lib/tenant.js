'use strict'
// @flow
const TENANTS = {
  ONEBLINK: {
    origin: 'https://auth-api.blinkm.io',
    region: 'ap-southeast-2',
    name: 'OneBlink'
  },
  CIVICPLUS: {
    origin: 'https://auth-api.transform.civicplus.com',
    region: 'us-east-2',
    name: 'CivicPlus'
  }
}

const getData = (tenant /* : ?string */) => {
  if (!tenant) tenant = 'ONEBLINK'
  return Object.keys(TENANTS).includes(tenant.toUpperCase())
    ? TENANTS[tenant.toUpperCase()]
    : TENANTS.ONEBLINK
}
module.exports = {
  getOrigin: (tenant /* : ?string */) /* : string */ => {
    return getData(tenant).origin
  },
  getRegion: (tenant /* : ?string */) /* : string */ => {
    return getData(tenant).region
  },
  getName: (tenant /* : ?string */) /* : string */ => {
    return getData(tenant).name
  },
  TENANTS
}
