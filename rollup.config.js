import rollupConfig from './lib/rollup/config';

const pkg = require('./package.json');

const config = rollupConfig({
  bundleDependencies: false,
  quiet: process.env.QUIET,
  pkg,
});

export default config;
