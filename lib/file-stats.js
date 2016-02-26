'use strict';

const fs = require('fs');

function getFileStats (file) {
  let stats = fs.lstatSync(file);
  return {
    name: file,
    dateModified: new Date(stats.mtime)
  };
}

module.exports = {
  getStat: getFileStats,
  getStats: files => files.map(getFileStats)
};
