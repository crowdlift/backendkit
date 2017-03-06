import rollupConfig from './lib/rollup/config';

const pkg = require('./package.json');

const config = rollupConfig({
  profile: 'serverless',
  quiet: process.env.QUIET,
  pkg,
});

export default config;
