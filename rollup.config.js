import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/scripts/main.js',
  dest: 'dist/diapo.js',
  moduleName: 'Diapo',
  plugins: [ nodeResolve(), commonjs() ],
  format: 'umd'
};
