import antfu from '@antfu/eslint-config'

export default antfu({
  ignorePatterns: ['*.md'],
  rules: {
    'no-console': 'off',
    'n/prefer-global/process': 'off',
    'no-useless-return': 'off',
  },
})
