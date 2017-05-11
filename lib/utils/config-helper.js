'use strict'

const pkg = require('../../package.json')
const configLoader = require('@blinkmobile/blinkmrc')

const projectConfig = configLoader.projectConfig({name: pkg.name})

let read = function () {
  return projectConfig.load()
}

let write = function (updater) {
  return projectConfig.update(updater)
}

module.exports = {read, write}
