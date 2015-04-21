'use strict';

var assert = require('assert');
var redis = require('redis');
var CacheHandler = require('../index');

var client = redis.createClient();
var configFile = './test/config.json';
var config = {
  prop: {
    subprop1: true,
    subprop2: false,
  }
};

var cacheHandler = new CacheHandler({ config: config, engine: client });

describe('Cache Handler', function () {
  it('should be a function', function () {
    assert(typeof CacheHandler, 'function');
  });

  it('should be a instance of CacheHandler', function () {
    assert(cacheHandler instanceof CacheHandler);
  });

  it('should be initialized without mandatory `config` property', function () {
    try {
      var _cacheHandler = new CacheHandler({ engine: client });
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory config property');
    }
  });

  it('should be initialized without mandatory `engine` property', function () {
    try {
      var _cacheHandler = new CacheHandler({ config: config });
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory engine property');
    }
  });

  it('should be initialized with config as object or path', function () {
    var _cacheHandler;

    _cacheHandler = new CacheHandler({ config: config, engine: client });
    assert.equal(typeof _cacheHandler.config, 'object');

    _cacheHandler = new CacheHandler({ config: configFile, engine: client });
    assert.equal(typeof _cacheHandler.config, 'object');
    assert.equal(_cacheHandler._configFile, configFile);
  });

  it('should have a config property correctly', function () {
    assert(typeof cacheHandler.config, 'object');
  });
});
