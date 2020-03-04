/* @flow */
'use strict'

const scope = require('../lib/scope')

module.exports = function(
  input /* : string[] */,
  flags /* : Object */
) /* : Promise<void> */ {
  let bucket = flags.bucket || input[0]
  if (bucket) {
    return scope
      .write(flags.cwd, { scope: bucket })
      .then(cfg => scope.show(flags.cwd))
  }

  return scope.show(flags.cwd)
}
