'use strict';

const s3Factory = require('./s3-bucket-factory');

function transformer (obj) {
  return {
    name: obj.Key,
    dateModified: Date.parse(obj.LastModified)
  };
}

function getObjectList () {
  return s3Factory().then(s3 => {
    return new Promise((resolve, reject) => {
      s3.listObjects({}, function (err, data) {
        if (err) {
          reject(new Error(err));
        }

        resolve(data.Contents.map(transformer));
      });
    });
  });
}

module.exports = getObjectList;
