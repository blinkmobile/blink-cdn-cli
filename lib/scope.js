/* @flow */
'use strict'

const objectMerge = require('object-merge')
const configHelper = require('./utils/config-helper')
const getTenantData = require('./getTenantData')

function read(cwd /* : string */) /* : Promise<Object> */ {
  return configHelper
    .read(cwd)
    .then(cfg => (cfg.cdn ? cfg.cdn : {}))
    .then(cfg => {
      // Set defaults for service
      cfg.service = cfg.service || {}
      if (!cfg.service.origin && !!cfg.tenant) {
        cfg.service.origin = getTenantData.getOrigin(cfg.tenant)
      }
      cfg.service.origin = cfg.service.origin || getTenantData.TENANTS.ONEBLINK

      const matches = cfg.service.origin.match(
        /https:\/\/client-cli-service(-test)?\.blinkm\.io/
      )

      if (matches) {
        const subdomains = cfg.service.origin.split('.')
        if (matches[1]) {
          subdomains[0] = `${subdomains[0]}${matches[1] || ''}`
        }
        cfg.service.origin = `https://${subdomains.join('.')}`
      }

      return cfg
    })
}

function write(
  cwd /* : string */,
  options /* : Object */
) /* : Promise<Object> */ {
  if (!options || !options.scope) {
    return Promise.reject(new Error('Options.scope was not defined.'))
  }

  let values = { cdn: { scope: options.scope, region: options.region } }
  return configHelper.write(cwd, config => objectMerge(config, values))
}

function show(cwd /* : string */) /* : Promise<void> */ {
  return read(cwd).then(cfg =>
    cfg.scope ? log(cfg) : console.log('s3 Bucket scope has not been set yet.')
  )
}

function log({ scope, region }) {
  console.log(`s3 Bucket name: ${scope}`)
  console.log(`s3 Bucket region: ${region}`)
}

module.exports = { read, write, show }
