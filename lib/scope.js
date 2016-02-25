'use strict';

const objectMerge = require('object-merge');

const configHelper = require('./utils/config-helper');

function read () {
  return configHelper.read()
    .then(cfg => cfg.cdn ? cfg.cdn : {});
}

function write (options) {
  if (!options || !options.scope) {
    return Promise.reject(new Error('Options.scope was not defined.'));
  }

  let values = {cdn: {scope: options.scope, region: options.region}};
  return configHelper.write(config => objectMerge(config, values));
}

function show () {
  read().then(log)
    .catch(() => {
      console.log('s3 Bucket scope has not been set yet.');
    });
}

function log (details) {
  console.log(`s3 Bucket name: ${details.scope}`);
  console.log(`s3 Bucket region: ${details.region}`);
}

module.exports = {read, write, show};
