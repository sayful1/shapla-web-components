import summary from 'rollup-plugin-summary'
import resolve from '@rollup/plugin-node-resolve'
import litSass from '@j1shin/rollup-plugin-lit-sass'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
// import { terser } from 'rollup-plugin-terser'
// import postcss from 'rollup-plugin-postcss'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default {
  input: { bundle: (production ? 'src/index.ts' : 'src/main.ts') },
  output: [
    { dir: 'dist', format: 'esm', sourcemap: true },
  ],
  external: !production ? [] : [/node_modules/],
  plugins: [
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    resolve(),
    litSass(),
    // postcss(),
    // production && terser(), // minify, but only in production
    summary(),
    typescript()
  ],
}
