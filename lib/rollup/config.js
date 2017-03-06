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

const PROFILE_SERVERLESS = {
  bundleDependencies: true,
};

const PROFILE_NODE = {
  bundleDependencies: false,
};

const PROFILES = {
  serverless: PROFILE_SERVERLESS,
  node: PROFILE_NODE,
};

const CONFIG_DEFAULTS = {
  // Use PROFILE_SERVERLESS as the default profile
  profile: 'node',
  // Output stats by default
  quiet: false,
  // package.json contents
  pkg: null,
};

const config = (_opts = CONFIG_DEFAULTS) => {
  const opts = (_opts.profile && PROFILES[_opts.profile]) ?
    // eslint-disable-next-line prefer-object-spread/prefer-object-spread
    Object.assign({}, PROFILES[_opts.profile], _opts) :
    _opts;

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
