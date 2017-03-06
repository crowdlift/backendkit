/*
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
import filesize from 'rollup-plugin-filesize';


const CONFIG_DEFAULTS = {
  // Output stats by default
  quiet: false,
  // package.json contents
  pkg: null,
  // Bundle pkg.dependencies
  bundleDependencies: false,
};

const config = (_opts = {}) => {
  // eslint-disable-next-line prefer-object-spread/prefer-object-spread
  const opts = Object.assign({}, CONFIG_DEFAULTS, _opts);

  const conf = {
    format: 'cjs',
    sourceMap: true,
    plugins: [
      nodeResolve({
        module: true,
        jsnext: true,
        main: true,
        browser: false,
        preferBuiltins: true,
      }),
      commonjs({
        include: 'node_modules/**',
      }),
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
  };

  if (!opts.bundleDependencies && opts.pkg && opts.pkg.dependencies) {
    const dependencies = Object.keys(opts.pkg.dependencies);
    const regex = new RegExp(`node_modules/(${dependencies.join('|')})`);
    conf.external = fileId => regex.test(fileId);
  }

  if (!opts.quiet) {
    conf.plugins.push(filesize());
  }

  return conf;
};

export default config;
