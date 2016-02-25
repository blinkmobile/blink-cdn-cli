'use strict';

/*
Default AWS S3 config

BucketName is per project
*/

const AWS = require('aws-sdk');

const bucketParams = require('./s3-bucket-params.js');

module.exports = () => bucketParams.read().then((params) => new AWS.S3({params}));
