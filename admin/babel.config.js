const IS_PROD = process.env.NODE_ENV === 'production'
const plugins = ['dynamic-import-node']

if (IS_PROD) {
  // 去除日志的插件
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': 3
      }
    ]
  ],
  plugins
}
