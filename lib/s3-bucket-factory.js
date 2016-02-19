'use strict';

/*
Default AWS S3 config

BucketName is per project
 */

const AWS = require('aws-sdk');

// TODO - pull these defaults out from .blinkmrc.json
const params = {
  Bucket: 'app1-simon.blinkm.io',
  Expires: 60,
  ACL: 'public-read'
};

module.exports = () => new AWS.S3({params});
