'use strict'

/*
Default AWS S3 config

BucketName is per project
*/

const AWS = require('aws-sdk')

const pkg = require('../package.json')
const BlinkMobileIdentity = require('@blinkmobile/bm-identity')
const blinkMobileIdentity = new BlinkMobileIdentity(pkg.name)

const bucketParams = require('./s3-bucket-params.js')

module.exports = () => {
  return bucketParams.read()
    .then((bucketDetails) => {
      console.log(`Authenticating...
`)

      return blinkMobileIdentity.assumeAWSRole({
        bmProject: bucketDetails.params.Bucket,
        command: 'deploy'
      }).then((credentials) => {
        console.log(`Authentication complete!
`)
        return Object.assign({credentials}, bucketDetails)
      })
    })
    .then((awsOptions) => new AWS.S3(awsOptions))
}
