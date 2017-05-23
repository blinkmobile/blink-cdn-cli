/* @flow */
'use strict'

const scope = require('../lib/scope')

const REGION = 'ap-southeast-2'

function write (
  cwd /* : string */,
  bucketName /* : string */,
  region /* : string */
) /* : Promise<Object> */ {
  return scope.write(cwd, { scope: bucketName, region })
}

module.exports = function (
  input /* : string[] */,
  flags /* : Object */
) /* : Promise<void> */ {
  let bucket = flags.bucket || input[0]
  if (bucket) {
    return write(flags.cwd, bucket, flags.region || REGION)
      .then((cfg) => scope.show(flags.cwd, cfg))
  }

  return scope.show(flags.cwd)
}
