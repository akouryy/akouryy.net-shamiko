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
      // import 文どうしの並び順は検査せず、同一 import 内の名前の並びだけを揃える
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    },
  },
])
