/* @flow */
'use strict'

/*
Default AWS S3 config

BucketName is per project
*/

const AWS = require('aws-sdk')
const ora = require('ora')
const request = require('request')

const scope = require('./scope.js')

const pkg = require('../package.json')
const BlinkMobileIdentity = require('@blinkmobile/bm-identity')
const blinkMobileIdentity = new BlinkMobileIdentity(pkg.name)

function s3Factory (
  bucketDetails /* : Object */,
  env /* : string */,
  cwd /* : string */
) /* : Promise<Object> */ {
  const spinner = ora({spinner: 'dots', text: 'Authenticating...'}).start()
  return Promise.all([
    blinkMobileIdentity.getAccessToken(),
    scope.read(cwd)
  ])
    .then(([ accessToken, cfg ]) => {
      return new Promise((resolve, reject) => {
        request(`${cfg.service.origin}/v1/service-instances/${cfg.scope}/environments/${env}/aws-role`, {
          auth: {
            bearer: accessToken
          },
          json: true
        }, (err, response, body) => {
          if (err) {
            return reject(err)
          }
          if (response.statusCode !== 200) {
            return reject(new Error(body && body.message ? body.message : 'Unknown error, please try again and contact support if the problem persists'))
          }
          return resolve(body)
        })
      })
    })
    .then((body) => new AWS.S3(Object.assign({
      accessKeyId: body.Credentials.AccessKeyId,
      secretAccessKey: body.Credentials.SecretAccessKey,
      sessionToken: body.Credentials.SessionToken
    }, bucketDetails)))
    .then((s3) => {
      spinner.succeed('Authentication complete!')
      return s3
    })
    .catch((err) => {
      spinner.fail('Authentication failed!')
      return Promise.reject(err)
    })
}

module.exports = s3Factory
