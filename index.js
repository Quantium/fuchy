'use strict';

var CacheHandler = function (config) {
  config = config || {};

  if (!config.config) { throw new Error('Missing mandatory config property'); }
  if (!config.engine) { throw new Error('Missing mandatory engine property'); }

  this.config = config.config;
  this.engine = config.engine;

  if (typeof this.config === 'string') {
    this.config = require(this.config);
  };
};

module.exports = CacheHandler;
