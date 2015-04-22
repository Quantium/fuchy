'use strict';

var assert = require('assert');
var redis = require('redis');
var CacheHandler = require('../index');

var client = redis.createClient(6379, 'localhost');
var cacheablesFile = './test/cacheables.json';
var cacheables = {
  prop: {
    subprop1: true,
    subprop2: false,
  }
};

var cacheHandler = new CacheHandler({
  cacheables: cacheables,
  engine: client,
  ttl: 3600
});

describe('Cache Handler', function () {
  it('should be a function', function () {
    assert(typeof CacheHandler, 'function');
  });

  it('should be a instance of CacheHandler', function () {
    assert(cacheHandler instanceof CacheHandler);
  });

  it('should be initialized without mandatory `cacheables` property', function () {
    try {
      var _cacheHandler = new CacheHandler({ engine: client });
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory cacheables property');
    }
  });

  it('should be initialized without mandatory `engine` property', function () {
    try {
      var _cacheHandler = new CacheHandler({ cacheables: cacheables });
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory engine property');
    }
  });

  it('should be initialized with cacheables as object or path', function () {
    var _cacheHandler;

    _cacheHandler = new CacheHandler({ cacheables: cacheables, engine: client });
    assert.equal(typeof _cacheHandler.cacheables, 'object');

    _cacheHandler = new CacheHandler({ cacheables: cacheablesFile, engine: client });
    assert.equal(typeof _cacheHandler.cacheables, 'object');
    assert.equal(_cacheHandler._cacheablesFile, cacheablesFile);
  });

  it('should have this properties correctly', function () {
    assert(cacheHandler.ttl);
    assert.equal(typeof cacheHandler.ttl, 'number');
    assert.equal(cacheHandler.ttl, 3600);
  });

  it('should have this public functions', function () {
    assert(cacheHandler.get);
    assert(cacheHandler.set);
    assert(cacheHandler.verify);
  });

  it('should have this private functions', function () {});
});
