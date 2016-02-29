'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'www');

function getFileList (dir) {
  let fullPath = path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir) || ROOT;
  if (!fs.existsSync(fullPath)) {
    throw new Error(fullPath + ' was not found.');
  }

  return fs.readdirSync(fullPath).map(file => path.normalize(dir + '/' + file).replace(/\\/g, '/'));
}

module.exports = getFileList;
