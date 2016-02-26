'use strict';

const objectMerge = require('object-merge');

const configHelper = require('./utils/config-helper');

function read () {
  return configHelper.read()
    .then(cfg => cfg.cdn ? cfg.cdn.scope : undefined);
}

function write (options) {
  if (!options || !options.scope) {
    return Promise.reject(new Error('Options.scope was not defined.'));
  }
  return configHelper.write(config => objectMerge(config, {cdn: {scope: options.scope}}));
}

module.exports = {read, write};
