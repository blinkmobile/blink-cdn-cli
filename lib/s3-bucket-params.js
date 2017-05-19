/* @flow */
'use strict'

const objectMerge = require('object-merge')

const configHelper = require('./utils/config-helper')

const DEFAULTS = {
  Expires: 60,
  ACL: 'public-read'
}

function toS3 (cfg) {
  return {
    computeChecksums: true,
    region: cfg.cdn.region,
    params: Object.assign({}, cfg.cdn.objectParams, {Bucket: cfg.cdn.scope})
  }
}

function read (
  cwd /* : string */
) /* : Promise<Object> */ {
  return configHelper.read(cwd)
    .catch(() => Promise.reject(new Error('Scope has not been set yet, see --help for information on how to set scope.')))
    .then((cfg) => cfg.cdn.objectParams ? cfg : write(cwd, DEFAULTS))
    .then((cfg) => toS3(cfg))
}

function write (cwd, options) {
  return configHelper.write(cwd, (config) => objectMerge(config, {cdn: {objectParams: options}}))
}

module.exports = {read}
