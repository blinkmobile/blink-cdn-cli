'use strict';

const test = require('ava');
const mockery = require('mockery');

const fileListModule = '../lib/file-list.js';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(fileListModule, true);
});

test.afterEach(() => {
  mockery.warnOnUnregistered(true);
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should throw an error when the specified path is invalid', t => {
  const fsMock = {
    existsSync: () => false
  };

  mockery.registerMock('fs', fsMock);
  mockery.registerMock('path', {join: () => 'path'});

  const fileList = require(fileListModule);

  t.throws(() => fileList('./does-not-exist'));
});

test.serial('it should return an array of unix style file paths', t => {
  const fsMock = {
    existsSync: () => true,
    readdirSync: () => [1, 2, 3, 4, 5].map(num => `subfolder\\${num}.js`)
  };

  const pathMock = {
    join: dir => dir,
    normalize: filename => filename
  };

  mockery.registerMock('fs', fsMock);
  mockery.registerMock('path', pathMock);

  const fileList = require(fileListModule);
  const files = fileList('test\\folder');

  t.plan(files.length);
  files.forEach(filename => t.is(filename.indexOf('\\'), -1));
});
