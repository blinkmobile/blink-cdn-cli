'use strict';

const test = require('ava');
const mockery = require('mockery');

const configHelperModule = './utils/config-helper';
const scopeModule = '../lib/scope';

test.beforeEach(() => {
  mockery.enable({ useCleanCache: true });
  mockery.registerAllowable(scopeModule, true);
  mockery.registerAllowables(['object-merge', 'object-foreach', 'clone-function']);
});

test.afterEach(() => {
  mockery.deregisterAll();
  mockery.resetCache();
  mockery.disable();
});

test.serial('it should return the currently set scope', (t) => {
  const expectedScope = 'a';
  const configHelperMock = {
    read: () => Promise.resolve({cdn: {scope: expectedScope}})
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(scopeModule);

  return scope.read().then((s) => t.deepEqual(s.scope, expectedScope));
});

test.serial('it should handle an unitinitalised config file', (t) => {
  const expectedScope = undefined;
  const configHelperMock = {
    read: () => Promise.resolve({})
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(scopeModule);
  return scope.read().then((s) => t.deepEqual(s.scope, expectedScope));
});

test.serial('it should reject if no scope is set', (t) => {
  const configHelperMock = {
    write: (fn) => Promise.reject({})
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(scopeModule);
  let p = scope.write();
  t.throws(p, 'Options.scope was not defined.');
});

test.serial('it should merge new scope with the current config', (t) => {
  const originalConfig = {
    bmp: {
      scope: 'blah'
    },
    cdn: {
      scope: 'old',
      extra: 'existing'
    }
  };

  const configHelperMock = {
    write: (fn) => Promise.resolve(fn(originalConfig))
  };

  mockery.registerMock(configHelperModule, configHelperMock);

  const scope = require(scopeModule);
  scope.write({scope: 'c'}).then((config) => {
    t.notDeepEqual(config.cdn.scope, 'old');
    t.deepEqual(config.cdn.scope, 'c');
    t.deepEqual(config.cdn.extra, 'existing');
  });
});
