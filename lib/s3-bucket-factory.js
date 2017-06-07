/* @flow */
'use strict'

/*
Default AWS S3 config

BucketName is per project
*/

const AWS = require('aws-sdk')
const ora = require('ora')

const pkg = require('../package.json')
const BlinkMobileIdentity = require('@blinkmobile/bm-identity')
const blinkMobileIdentity = new BlinkMobileIdentity(pkg.name)

function s3Factory (
 bucketDetails /* : Object */,
 env /* : string */
) /* : Promise<Object> */ {
  const spinner = ora({spinner: 'dots', text: 'Authenticating...'}).start()
  return blinkMobileIdentity.assumeAWSRole({
    bmProject: bucketDetails.params.Bucket,
    command: 'deploy',
    environment: env
  })
    .then((credentials) => {
      spinner.succeed('Authentication complete!')
      return new AWS.S3(Object.assign({credentials}, bucketDetails))
    })
    .catch((err) => {
      spinner.fail('Authentication failed!')
      return Promise.reject(err)
    })
}

module.exports = s3Factory
