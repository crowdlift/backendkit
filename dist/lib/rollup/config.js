'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _rollupPluginBabel = require('rollup-plugin-babel');

var _rollupPluginBabel2 = _interopRequireDefault(_rollupPluginBabel);

var _rollupPluginNodeResolve = require('rollup-plugin-node-resolve');

var _rollupPluginNodeResolve2 = _interopRequireDefault(_rollupPluginNodeResolve);

var _rollupPluginCommonjs = require('rollup-plugin-commonjs');

var _rollupPluginCommonjs2 = _interopRequireDefault(_rollupPluginCommonjs);

var _rollupPluginInject = require('rollup-plugin-inject');

var _rollupPluginInject2 = _interopRequireDefault(_rollupPluginInject);

var _rollupPluginJson = require('rollup-plugin-json');

var _rollupPluginJson2 = _interopRequireDefault(_rollupPluginJson);

var _rollupPluginYaml = require('rollup-plugin-yaml');

var _rollupPluginYaml2 = _interopRequireDefault(_rollupPluginYaml);

var _rollupPluginFilesize = require('rollup-plugin-filesize');

var _rollupPluginFilesize2 = _interopRequireDefault(_rollupPluginFilesize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONFIG_DEFAULTS = {
  // Output stats by default
  quiet: false,
  // package.json contents
  pkg: null,
  // Bundle pkg.dependencies
  bundleDependencies: false
}; /*
   See:
   https://github.com/rollup/rollup/wiki/Plugins
   https://github.com/rollup/rollup/wiki/JavaScript-API
   */

var config = function config() {
  var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // eslint-disable-next-line prefer-object-spread/prefer-object-spread
  var opts = (0, _assign2.default)({}, CONFIG_DEFAULTS, _opts);

  var conf = {
    format: 'cjs',
    sourceMap: true,
    plugins: [(0, _rollupPluginNodeResolve2.default)({
      module: true,
      jsnext: true,
      main: true,
      browser: false,
      preferBuiltins: true
    }), (0, _rollupPluginCommonjs2.default)({
      include: 'node_modules/**'
    }),
    // Not sure if this is needed with babel
    (0, _rollupPluginInject2.default)({
      Promise: 'es6-promise',
      include: '**/*.js',
      exclude: 'node_modules/**'
    }), (0, _rollupPluginJson2.default)({
      exclude: 'node_modules/**'
    }), (0, _rollupPluginYaml2.default)({
      exclude: 'node_modules/**'
    }),
    // See https://github.com/rollup/rollup-plugin-babel
    (0, _rollupPluginBabel2.default)({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    })]
  };

  if (!opts.bundleDependencies && opts.pkg && opts.pkg.dependencies) {
    var dependencies = (0, _keys2.default)(opts.pkg.dependencies);
    var regex = new RegExp('node_modules/(' + dependencies.join('|') + ')');
    conf.external = function (fileId) {
      return regex.test(fileId);
    };
  }

  if (!opts.quiet) {
    conf.plugins.push((0, _rollupPluginFilesize2.default)());
  }

  return conf;
};

exports.default = config;
module.exports = exports['default'];