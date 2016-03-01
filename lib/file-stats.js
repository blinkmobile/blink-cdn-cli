'use strict';

const fs = require('fs');

function getFileStats (file) {
  let stats = fs.lstatSync(file);
  return {
    name: file,
    dateModified: Date.parse(stats.mtime)
  };
}

module.exports = {
  getStat: getFileStats,
  getStats: files => files.map(getFileStats)
};
