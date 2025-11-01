import { defineConfig } from '@granite-js/react-native/config';
import { router } from '@granite-js/plugin-router';
import { hermes } from '@granite-js/plugin-hermes';
import path from 'path';

export default defineConfig({
  scheme: 'fortune',
  appName: 'fortune-teller',
  entryFile: 'index.js',
  plugins: [router(), hermes()],
  build: {
    resolver: {
      alias: [
        { from: '@theme', to: path.resolve(__dirname, 'src/theme') },
        { from: '@pages', to: path.resolve(__dirname, 'pages') },
        { from: '@src', to: path.resolve(__dirname, 'src') },
      ],
    },
  },
  metro: {
    resolver: {
      extraNodeModules: {
        '@theme': path.resolve(__dirname, 'src/theme'),
        '@pages': path.resolve(__dirname, 'pages'),
        '@src': path.resolve(__dirname, 'src'),
      },
    },
  },
});
