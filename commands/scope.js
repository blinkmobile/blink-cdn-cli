'use strict';

const scope = require('../lib/scope.js');

const REGION = 'ap-southeast-2';

function write (bucketName, region) {
  return scope.write({ scope: bucketName, region })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = function (input, flags, options) {
  if (flags.bucket) {
    return write(flags.bucket, flags.region || REGION).then(scope.show);
  }

  scope.show();
};
