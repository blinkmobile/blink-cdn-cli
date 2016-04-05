'use strict';

const elegantSpinner = require('elegant-spinner');
const logUpdate = require('log-update');
const upload = require('@blinkmobile/aws-s3').upload;

const s3Factory = require('../lib/s3-bucket-factory');

module.exports = function (input, flags, options) {
  const frame = elegantSpinner();
  let timer = setInterval(() => {
    logUpdate(frame());
  }, 100);

  let sourceDir = input[0] || null;

  return s3Factory()
    .then((s3) => {
      const task = upload({
        cwd: sourceDir,
        s3,
        skip: flags.skip
      });
      task.on('skipped', (fileName) => {
        clearTimeout(timer);
        console.log(`skipped: ${fileName}`);
      });
      task.on('uploaded', (fileName) => {
        clearTimeout(timer);
        console.log(`uploaded: ${fileName}`);
      });
      return task.promise;
    })
    .then(() => {
      clearTimeout(timer);
      process.exit(0); // mysteriously required ??
    })
    .catch((err) => {
      clearTimeout(timer);
      console.log();
      console.error(err);
      console.log();
      process.exit(1);
    });
};
