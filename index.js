/**
 * Module dependencies.
 */

var Settings = require('settings');
var path = require('path');


module.exports = function(dir) {
  var config = global._config;

  if (config) {
    return config;
  }

  dir = dir || path.resolve(process.cwd(), 'config');

  /**
   * Base configuration
   */

  var base = {};

  try {
    base = require(path.resolve(dir, 'base'));
  } catch(e) {}

  if (!base.common) {
    base.common = {};
  }

  /**
   * Find the env
   */

  var env = process.env.NODE_ENV || 'development';


  /**
   * Read custom env file
   */

  var custom = {};

  try {
    custom = require(path.resolve(dir, env + '.json'));
  } catch(e) {}

  base[env] = custom;

  /**
   * Expose globals
   */

  global._env = env;
  global._config = new Settings(base, {env: env});

  return global._config;
};

