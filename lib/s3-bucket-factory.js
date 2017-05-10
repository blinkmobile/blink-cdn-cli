'use strict'

/*
Default AWS S3 config

BucketName is per project
*/

const awsProfiles = require('@blinkmobile/aws-profile-management')

const bucketParams = require('./s3-bucket-params')

module.exports = () => Promise.all([bucketParams.read(), awsProfiles.profile.read()])
  .then((results) => {
    const params = results[0]
    const profile = results[1]
    const AWS = awsProfiles.awsFactory(profile)
    return new AWS.S3(params)
  })
