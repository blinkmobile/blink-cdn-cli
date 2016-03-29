'use strict';

const scope = require('../lib/scope');

const REGION = 'ap-southeast-2';

function write (bucketName, region) {
  return scope.write({ scope: bucketName, region })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = function (input, flags, options) {
  let bucket = flags.bucket || input[0];
  if (bucket) {
    return write(bucket, flags.region || REGION).then(scope.show);
  }

  scope.show();
};
