'use strict';

var assert = require('assert');
var Fuchy = require('../index');

var fuchy = new Fuchy('test', {
  engine: 'redis',
  ttl: 3600 * 24
});

describe('Cache Handler', function () {
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

  it('should have this properties correctly', function () {
    assert(fuchy.ttl);
    assert.equal(typeof fuchy.ttl, 'number');
    assert.equal(fuchy.ttl, 86400);
  });

  it('should have this public functions', function () {
    assert(fuchy.get);
    assert(fuchy.set);
  });
});
