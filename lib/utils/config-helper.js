'use strict';

const ty = require('then-yield').using(Promise.cast);

const pkg = require('../../package.json');
const configLoader = require('@blinkmobile/blinkmrc');

const projectConfig = configLoader.projectConfig({name: pkg.name});

let read = ty.async(function * () {
  let c = yield projectConfig.load();
  return c;
});

let write = ty.async(function * (updater) {
  let c = yield projectConfig.update(updater);
  return c;
});

module.exports = {read, write};
