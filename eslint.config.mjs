// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginJsonc from 'eslint-plugin-jsonc'

export default withNuxt(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    rules: {
      '@stylistic/max-len': ['error', { code: 160 }],
      '@stylistic/eol-last': ['error', 'always']
    }
  },
  ...eslintPluginJsonc.configs['recommended-with-json'],
  {
    files: ['**/*.json'],
    rules: {
      'jsonc/array-bracket-spacing': ['error', 'always'],
      'jsonc/comma-dangle': ['error', 'never'],
      'jsonc/indent': ['error', 4],
      'jsonc/key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'jsonc/object-curly-spacing': ['error', 'never'],
      'jsonc/quotes': ['error', 'double']
    }
  }
)
  .overrideRules({
    'vue/max-attributes-per-line': ['error', { singleline: 5 }]
  })
