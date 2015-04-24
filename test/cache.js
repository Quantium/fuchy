'use strict';

var assert = require('assert');
var Fuchy = require('../index');

var keys = [
  'noCachedKey'
];

var fuchy = new Fuchy('test', {
  noCacheKeys: keys,
  engine: 'redis',
  ttl: 3600 * 24
});

describe('Fuchy', function () {
  it('should be a function', function () {
    assert(typeof Fuchy, 'function');
  });

  it('should be a instance of Fuchy', function () {
    assert(fuchy instanceof Fuchy);
  });

  it('should not be initialized without mandatory `engine` property', function () {
    try {
      var _cacheHandler = new Fuchy();
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory engine property');
    }
  });

  it('should be initialized with `restricted` property', function () {
    try {
      var _cacheHandler = new Fuchy({ restricted: '' });
    } catch (err) {
      assert(err instanceof Error, 'error is not an instance of Error');
      assert.equal(err, 'Error: Missing mandatory engine property');
    }
  });

  it('should have this properties correctly', function () {
    assert(fuchy.ttl);
    assert.equal(typeof fuchy.ttl, 'number');
    assert.equal(fuchy.ttl, 86400);
  });

  it('should have this public functions', function () {
    assert(fuchy.get);
    assert(fuchy.set);
    assert(fuchy.verify);
  });
});

describe('Verifying no cacheable keys', function () {
  it('should be found no cacheable keys', function () {
    assert.equal(fuchy.verify('noCachedKey'), true);
  });
});

describe('Cache', function () {
  it('should avoid to cache the keys marked as no cacheables', function (done) {
    fuchy.set('noCachedKey', 'my fake value', function (err, value) {
      assert.equal(value, 'my fake value');
    });

    fuchy.get('noCachedKey', function (err, value) {
      if (value) {
        done('Value is not empty cache');
      }

      done();
    })
  });
});
