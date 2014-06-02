/**
 * Module dependencies.
 */

var Settings = require('settings');
var path = require('path');


module.exports = function(dir) {
  var config = global._config;

  dir = dir || path.resolve(process.cwd(), 'config');

  var base = require(path.resolve(dir, 'base'));

  if (config) {
    return config;
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
    base[env] = custom;
  } catch(e) {

  }

  /**
   * Expose globals
   */

  global._env = env;
  global._config = new Settings(base, {env: env});

  return global._config;
};

