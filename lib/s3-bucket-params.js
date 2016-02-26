'use strict';
const objectMerge = require('object-merge');

const configHelper = require('./utils/config-helper');

const defaults = {
  Expires: 60,
  ACL: 'public-read'
};

function toS3 (cfg) {
  return Object.assign({}, cfg.cdn.objectParams, {Bucket: cfg.cdn.scope});
}

function read () {
  return configHelper.read().then(cfg => {
    return (cfg.cdn.objectParams ? toS3(cfg) : false) || write(defaults).then(cfg => toS3(cfg));
  });
}

function write (options) {
  return configHelper.write(config => objectMerge(config, {cdn: {objectParams: options}}));
}

module.exports = {read};
