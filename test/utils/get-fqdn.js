/* @flow */
'use strict'

const test = require('ava')

const getFQDN = require('../../lib/utils/get-fqdn.js')

test('it should return fqdn', (t) => {
  const project = 'customer-project.blinkm.io'
  const env = 'dev'
  const fqdn = 'customer-project-dev.blinkm.io'

  t.is(getFQDN(project, env), fqdn)
})

test('it should return fqdn for "prod"', (t) => {
  const project = 'customer-project.blinkm.io'
  const env = 'prod'

  t.is(getFQDN(project, env), project)
})
