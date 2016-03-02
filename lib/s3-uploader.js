'use strict';

const fs = require('fs');

const s3Factory = require('./s3-bucket-factory.js');

function upload (fileName) {
  let stream = fs.createReadStream(fileName);
  stream.on('error', err => console.log('There was an error reading ' + fileName + ': ' + err));

  return s3Factory().then(s3 => {
    return s3.upload({Key: fileName, Body: stream})
      .send(function (err, data) {
        if (err) {
          console.log(`There was a problem uploading ${fileName} - ${err}`);
          return;
        }

        console.log(`${fileName} was successfully uploaded.`);
      });
  });
}

module.exports = {
  upload,
  uploadBatch: fileList => Promise.all(fileList.map(upload))
};
