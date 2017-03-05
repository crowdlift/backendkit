/*
TODO: add modules?
- rollup-plugin-eslint
- rollup-plugin-instanbul
- filesize
- uglify

See:
https://github.com/rollup/rollup/wiki/Plugins
https://github.com/rollup/rollup/wiki/JavaScript-API
*/

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import yaml from 'rollup-plugin-yaml';

const pkg = require('./package.json');

const external = Object.keys(pkg.dependencies);

export default {
  format: 'umd',
  sourceMap: true,
  moduleName: pkg.name,
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      preferBuiltins: true,
    }),
    commonjs(),
    // Not sure if this is needed with babel
    inject({
      Promise: 'es6-promise',
      include: '**/*.js',
      exclude: 'node_modules/**',
    }),
    json({
      exclude: 'node_modules/**',
    }),
    yaml({
      exclude: 'node_modules/**',
    }),
    // See https://github.com/rollup/rollup-plugin-babel
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true,
    }),
  ],
  external,
};
