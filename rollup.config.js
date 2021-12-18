import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import litSass from '@j1shin/rollup-plugin-lit-sass';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: [
    { file: 'public/bundle.js', format: 'esm', sourcemap: true },
  ],
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    resolve(),
    litSass(),
    production && terser(), // minify, but only in production
    summary(),
  ],
};
