'use strict';

const fileStats = require('./file-stats.js');

let filterFiles = bucketContents => toBeUploaded => {
  let existingObject = bucketContents.find(s3obj => s3obj.name === toBeUploaded);
  if (!existingObject) {
    return true;
  }

  let localFile = fileStats.getStat(toBeUploaded);
  return localFile.dateModified > existingObject.dateModified;
};

module.exports = filterFiles;
