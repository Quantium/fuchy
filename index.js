'use strict';

var CacheHandler = function (config) {
  config = config || {};

  if (!config.cacheables) { throw new Error('Missing mandatory cacheables property'); }
  if (!config.engine) { throw new Error('Missing mandatory engine property'); }

  this.cacheables = config.cacheables;
  this.engine = config.engine;
  this.ttl = config.ttl || 3600;

  if (typeof this.cacheables === 'string') {
    this._cacheablesFile = config.cacheables;
    this.cacheables = require(this.cacheables);
  };
};

// redis.hmset(obj, _.pick(obj, propNames))
CacheHandler.prototype.get = function () {};
CacheHandler.prototype.set = function () {};
CacheHandler.prototype.verify = function () {};

module.exports = CacheHandler;
