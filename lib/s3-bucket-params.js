'use strict';
const objectMerge = require('object-merge');

const configHelper = require('./utils/config-helper');

const defaults = {
  Expires: 60,
  ACL: 'public-read'
};

function toS3 (cfg) {
  return {
    computeChecksums: true,
    region: cfg.cdn.region,
    params: Object.assign({}, cfg.cdn.objectParams, {Bucket: cfg.cdn.scope})
  };
}

function read () {
  return configHelper.read()
    .then(cfg => (cfg.cdn.objectParams ? toS3(cfg) : false) || write(defaults).then(cfg => toS3(cfg)))
    .catch(() => {
      console.log('No scope has been set. Please set the scope and try again');
      process.exit(1);
    });
}

function write (options) {
  return configHelper.write(config => objectMerge(config, {cdn: {objectParams: options}}));
}

module.exports = {read};
