import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

const external = id => !id.startsWith('.') && !id.startsWith('/');

const globals = {
  react: 'React',
  'prop-types': 'PropTypes',
};

const getBabelOptions = () => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
});

export default [
  {
    input,
    output: {
      file: 'dist/react-event-listener.umd.js',
      format: 'umd',
      exports: 'named',
      name: 'ReactEventListener',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(getBabelOptions()),
      commonjs({ include: '**/node_modules/**' }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    external,
    plugins: [babel(getBabelOptions())],
  },

  {
    input,
    output: { file: pkg.module, format: 'es', exports: 'named' },
    external,
    plugins: [babel(getBabelOptions()), sizeSnapshot()],
  },
];
