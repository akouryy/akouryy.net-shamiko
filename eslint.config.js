import love from 'eslint-config-love'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['.next/', '.vercel/', 'next-env.d.ts'],
  },
  {
    ...love,
    files: ['**/*.ts', '**/*.tsx'],
  },
  reactHooks.configs.flat.recommended,
  {
    rules: {
      '@eslint-community/eslint-comments/require-description': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/max-params': 'off',
      'prefer-named-capture-group': 'off',
      'no-negated-condition': 'off',
      eqeqeq: ['error', 'always', { null: 'never' }],
      'require-unicode-regexp': ['error', { requireFlag: 'u' }],
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsForRegex: ['Element$'] }],
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    },
  },
])
