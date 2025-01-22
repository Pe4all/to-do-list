const { ESLint } = require('eslint');
const jsConfig = require('@eslint/js').configs.recommended;
const tsEslintConfig = require('typescript-eslint').configs.recommended;
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');

module.exports = new ESLint({
  ignore: ['dist'],
  overrideConfigFile: 'tsconfig.json',
  extends: [jsConfig, tsEslintConfig],
  files: ['**/*.{ts,tsx}'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    browser: true,
  },
  plugins: ['react-hooks', 'react-refresh'],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
});
