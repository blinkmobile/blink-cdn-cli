'use strict';

/*
Default AWS S3 config

BucketName is per project
*/

const ty = require('then-yield');
const AWS = require('aws-sdk');

const bucketParams = require('./s3-bucket-params.js');

let config = ty.spawn(function * (params) {
  let config = yield bucketParams.read();
  return config;
});

module.exports = () => new AWS.S3({params: config});
