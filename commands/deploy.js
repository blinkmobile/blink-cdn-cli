'use strict';

const s3Uploader = require('../lib/s3-uploader.js');
const fileList = require('../lib/file-list.js');

function upload (sourceDir) {
  let files = fileList(sourceDir);
  s3Uploader.uploadBatch(files);
}

module.exports = function (input, flags, options) {
  let sourceDir = input[0] || null;
  upload(sourceDir);
};
