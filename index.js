'use strict'

// local modules

const help = require('./lib/help.js')

// this module

const commands = {
  scope: require('./commands/scope.js'),
  deploy: require('./commands/deploy.js')
}

module.exports = function (input, flags, options) {
  const command = input[0]

  if (!command) {
    console.log(help)
    process.exit(0)
  }

  if (!commands[command]) {
    console.error(`unknown command: ${command}`)
    console.log(help)
    process.exit(1)
  }

  if (typeof commands[command] !== 'function') {
    console.log('not implemented')
    process.exit(1)
  }

  commands[command](input.slice(1), flags, { cwd: process.cwd() })
}
