#!/usr/bin/env node
'use strict'

// foreign modules

const updateNotifier = require('update-notifier')
const meow = require('meow')
const chalk = require('chalk')

// local modules

const help = require('../lib/help.js')
const pkg = require('../package.json')

// this module

updateNotifier({ pkg }).notify()

const commands = {
  scope: require('../commands/scope.js'),
  deploy: require('../commands/deploy.js')
}

const cli = meow({
  help,
  version: true
}, {
  boolean: [
    'debug',
    'force',
    'prune',
    'skip'
  ],
  default: {
    debug: false,
    cwd: process.cwd(),
    force: false,
    env: 'dev',
    skip: true
  },
  string: [
    'bucket',
    'cwd',
    'env',
    'region'
  ]
})

const command = cli.input[0]

if (!command) {
  cli.showHelp(0)
}

if (!commands[command]) {
  console.error(chalk.red(`
Unknown command: ${command}`))
  cli.showHelp(1)
}

if (typeof commands[command] !== 'function') {
  console.error(chalk.red(`
Command not implemented: ${command}`))
  cli.showHelp(1)
}

commands[command](cli.input.slice(1), cli.flags)
  .catch((err) => {
    console.log(`
There was a problem executing '${command}':

${chalk.red(cli.flags.debug && err && err.stack ? err.stack : err)}

Please fix the error and try again.
`)
    process.exitCode = 1
  })
  // remove the blow when https://blinkmobile.atlassian.net/browse/CC-22 is done
  .then(() => process.listenerCount('SIGINT') > 0 ? process.exit() : true)
