import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/scripts/main.js',
  dest: 'dist/diapo.js',
  moduleName: 'Diapo',
  plugins: [ nodeResolve(), commonjs(), babel() ],
  format: 'umd'
};
