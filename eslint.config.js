import { ESLint } from 'eslint';
import pkg from '@eslint/js';
const { configs: eslintJsConfigs } = pkg;
import { configs as tsEslintConfig } from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default new ESLint({
  overrideConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    extends: [
      eslintJsConfigs.recommended,
      tsEslintConfig.recommended,
    ],
    plugins: [
      'react-hooks',
      'react-refresh',
      '@typescript-eslint',
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
    },
    globals: {
      browser: true,
    },
    ignorePatterns: ['dist'],
    files: ['**/*.{ts,tsx}'],
  },
});
