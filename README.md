
https://github.com/rollup/rollup-starter-project

Uses babel transform-runtime to reduce duplication of transpiled code
https://babeljs.io/docs/plugins/transform-runtime/

Uses babel-polyfill for compatibility
https://babeljs.io/docs/usage/polyfill/


## Tests

TDD with mocha, istanbul and testdouble.

https://github.com/testdouble/testdouble.js

https://github.com/testdouble/react-d3-blog-example


## Notes

In general, always try to use es modules that use import instead of require.
This allows rollup to perform better tree shaking.

### lodash

Use lodash-es along with `import [func] from 'lodash-es/[func]'` syntax
unless using babel-plugin-lodash.

Lodash has a known issue with rollup where it's hard for the tree shaking
algorithm to remove unused code, even when using lodash-es.
https://github.com/rollup/rollup/issues/691

Combine babel-plugin-lodash with lodash-es for the smallest possible build
when bundling dependencies.

https://github.com/lodash/babel-plugin-lodash

```js
// .babelrc
{
  "plugins": [
    "lodash",
  ],
}

// src file
import { cloneDeep } from 'lodash-es';

// rollup.config.js
import rollupConfig from './lib/rollup/config';
const pkg = require('./package.json');
const config = rollupConfig({ bundleDependencies: true, pkg });
export default config;
```
