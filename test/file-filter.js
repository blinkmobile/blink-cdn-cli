'use strict';

const test = require('ava');
const mockery = require('mockery');

const fileFilterModule = '../lib/file-filter.js';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(fileFilterModule, true);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test('it should exit early if source file is not on s3', t => {
  const fileStatsMock = {
    getStat: function () { throw new Error('Should not be called'); }
  };
  mockery.registerMock('./file-stats.js', fileStatsMock);

  const fileFilter = require(fileFilterModule)([]);
  t.notThrows(() => fileFilter('test.js'));
});

test('it should accept all files for upload', t => {
  const fileStatsMock = {
    getStat: name => ({name, dateModified: new Date()})
  };
  mockery.registerMock('./file-stats.js', fileStatsMock);

  const s3Files = [
    {name: 'www/1.js', dateModified: new Date(1980, 1, 1)},
    {name: 'www/2.js', dateModified: new Date(1980, 1, 1)},
    {name: 'www/3.js', dateModified: new Date(1980, 1, 1)},
    {name: 'www/4.js', dateModified: new Date(1980, 1, 1)}
  ];
  const filesToUpload = ['www/1.js', 'www/2.js', 'www/3.js', 'www/4.js'];
  const fileFilter = require(fileFilterModule)(s3Files);
  const results = filesToUpload.filter(fileFilter);
  
  t.is(results.length, filesToUpload.length);
  t.same(results, filesToUpload);
});

test('it should return 1 file for upload', t => {
  const fileStatsMock = {
    getStat: name => ({name, dateModified: new Date(2016, 1, 1)})
  };
  mockery.registerMock('./file-stats.js', fileStatsMock);

  const s3Files = [
    {name: 'www/1.js', dateModified: new Date(1980, 1, 1)},
    {name: 'www/2.js', dateModified: new Date()},
    {name: 'www/3.js', dateModified: new Date()},
    {name: 'www/4.js', dateModified: new Date()}
  ];
  const filesToUpload = ['www/1.js', 'www/2.js', 'www/3.js', 'www/4.js'];
  const fileFilter = require(fileFilterModule)(s3Files);
  const results = filesToUpload.filter(fileFilter);
  
  t.is(results.length, 1);
  t.same(results[0], filesToUpload[0]);
});


test('it should return 0 files for upload', t => {
  const fileStatsMock = {
    getStat: name => ({name, dateModified: new Date(1980, 1, 1)})
  };
  mockery.registerMock('./file-stats.js', fileStatsMock);

  const s3Files = [
    {name: 'www/1.js', dateModified: new Date()},
    {name: 'www/2.js', dateModified: new Date()},
    {name: 'www/3.js', dateModified: new Date()},
    {name: 'www/4.js', dateModified: new Date()}
  ];
  const filesToUpload = ['www/1.js', 'www/2.js', 'www/3.js', 'www/4.js'];
  const fileFilter = require(fileFilterModule)(s3Files);
  const results = filesToUpload.filter(fileFilter);
  
  t.is(results.length, 0);
  t.same(results, []);
});
