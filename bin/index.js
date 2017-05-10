#!/usr/bin/env node
'use strict'

// foreign modules

const updateNotifier = require('update-notifier')
const meow = require('meow')

// local modules

const help = require('../lib/help')
const main = require('../index.js')
const pkg = require('../package.json')

// this module

updateNotifier({ pkg }).notify()

const cli = meow({
  help,
  version: true
}, {
  boolean: [ 'prune', 'skip' ],
  default: {
    skip: true
  },
  string: ['bucket', 'region']
})

main(cli.input, cli.flags)
