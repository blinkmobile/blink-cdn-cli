'use strict';

const test = require('ava');
const mockery = require('mockery');

const fileStatsModule = '../lib/file-stats.js';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(fileStatsModule, true);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test('it should return an object with the needed properties', t => {
  const dateString = 'December 17, 1995 03:24:00';
  const fsMock = {
    lstatSync: file => ({mtime: dateString})
  };
  mockery.registerMock('fs', fsMock);

  const fileStats = require(fileStatsModule);
  let result = fileStats.getStat('www/1.js');
  t.ok(result.name);
  t.ok(result.dateModified);
  t.ok(result.dateModified.getDate)
});
