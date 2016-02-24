'use strict';

const scope = require('../lib/scope.js');
const prompt = require('prompt-input')();

function write (bucketName) {
  return scope.write({ scope: bucketName })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

function showScope (scope) {
  console.log(`s3 Bucket scope: ${scope}`);
  process.exit(0);
}

module.exports = function (input, flags, options) {
  if (input[0]) {
    return write(input[0]).then(s => showScope(s.cdn.scope));
  }

  scope.read()
    .then(showScope)
    .catch(() => {
      console.log('s3 Bucket scope has not been set yet.');
      prompt('s3 Bucket Name: (ctrl-c to quit)',
        bucket => write(bucket.replace(/[\r\n]/, '')).then(s => showScope(s.cdn.scope)));
    });
};
