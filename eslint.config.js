import a from 'eslint-config-a'

export default [
  ...a,
  {
    ignores: ['next-env.d.ts'],
  },
  {
    rules: {
      'sort-imports': ['error', {
        ignoreCase: true,
        // 宣言順の並べ替えは import/order に任せ、ここでは同一宣言内の名前順だけを検査する
        ignoreDeclarationSort: true,
      }],
      'import/order': ['error', {
        alphabetize: { order: 'asc', caseInsensitive: true },
      }],
    },
  },
]
