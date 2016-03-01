'use strict';

const s3Uploader = require('../lib/s3-uploader');
const fileList = require('../lib/file-list');
const fileFilter = require('../lib/file-filter');
const s3BucketContents = require('../lib/s3-bucket-contents');

function upload (sourceDir) {
  return s3BucketContents().then(contents => {
    let files = fileList(sourceDir);
    let filesToUpload = files.filter(fileFilter(contents));

    s3Uploader.uploadBatch(filesToUpload);
  })
  .catch(err => {
    console.log('There was an error retrieving the contents of your bucket:');
    console.log();
    console.log(err);
    process.exit(1);
  });
}

module.exports = function (input, flags, options) {
  let sourceDir = input[0] || null;
  return upload(sourceDir);
};
