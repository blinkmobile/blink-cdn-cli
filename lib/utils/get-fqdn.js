/* @flow */
'use strict'

function getFQDN (
  fqdn /* : string */,
  env /* : string */
) /* : string */ {
  if (env.toLowerCase() === 'prod') {
    return fqdn
  }
  const arr = fqdn.split('.')
  arr[0] += `-${env}`
  return arr.join('.')
}

module.exports = getFQDN
