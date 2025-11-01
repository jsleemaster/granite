import { defineConfig } from '@granite-js/react-native/config';
import { router } from '@granite-js/plugin-router';
import { hermes } from '@granite-js/plugin-hermes';

export default defineConfig({
  scheme: 'fortune',
  appName: 'fortune-teller',
  entryFile: 'index.js',
  plugins: [router(), hermes()],
});
