'use strict';

var Cacheman = require('cacheman');
var fuzzylogic = require('fuzzylogic');

var Fuchy = function (cacheName, config) {
  if ('object' === typeof cacheName) {
    config = cacheName;
  };

  config = config || {};

  if (!config.engine) { throw new Error('Missing mandatory engine property'); }

  this.noCacheKeys = config.noCacheKeys || [];
  this.ttl = config.ttl || 3600;

  this.cacheman = new Cacheman(cacheName, {
    ttl: this.ttl,
    engine: config.engine
  });
};

Fuchy.prototype.get = function (key, callback) {
  this.cacheman._engine.get(this.cacheman.key(key) + ':info', function (err, info) {
    if (info) {
      var timelapse = this._ttl * 1000;

      var half = timelapse / 2;
      var qrt = half / 2;
      var mid_time = info.cached_time + half + qrt;

      var request_time = Date.now();

      var fuzzy = fuzzylogic.trapezoid(request_time, info.cached_time, info.cached_time, mid_time, info.expiration_time);
      var valid = !!Math.round(fuzzy);

      if (!valid) {
        this.del(key);
        this._engine.del(this.key(key) + ':info');
      }
    }
  }.bind(this.cacheman));
  this.cacheman.get(key, callback);
};

Fuchy.prototype.set = function (key, data, callback) {
  var info = {
    key: key,
    cached_time: Date.now(),
    expiration_time: Date.now() + (this.ttl * 1000)
  };

  if (this.noCacheKeys.indexOf(key) > -1) {
    return callback(null, data);
  };

  this.cacheman._engine.set(this.cacheman.key(key) + ':info', info, this.ttl);
  this.cacheman.set(key, data, callback);
};

Fuchy.prototype.verify = function (property) {
  return this.noCacheKeys.indexOf(property) > -1;
};

module.exports = Fuchy;
