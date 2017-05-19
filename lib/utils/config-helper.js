/* @flow */
'use strict'

const pkg = require('../../package.json')
const configLoader = require('@blinkmobile/blinkmrc')

function projectConfig (
  cwd /* : string */
) /* : Object */ {
  return configLoader.projectConfig({
    name: pkg.name,
    cwd: cwd
  })
}

function read (
  cwd /* : string */
) /* : Promise<Object> */ {
  return projectConfig(cwd).load()
}

function write (
  cwd /* : string */,
  updater /* : (Object) => Object  */
) /* : Promise<Object> */ {
  return projectConfig(cwd).update(updater)
}

module.exports = {read, write}
