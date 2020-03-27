const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolveAlias = dir => path.join(__dirname, '.', dir)
const theme = require('./theme')

const proxyApi = {
  '/api': {
    target: 'https://admin.yesterdaypub.cn',
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/api': '/api'
    }
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      noIeCompat: true,
      javascriptEnabled: true,
      modifyVars: { ...theme }
    }),
    addWebpackAlias({
      '@': resolveAlias('src')
    })
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = process.env.NODE_ENV === 'development' ? proxyApi : null
    const config = configFunction(proxy, allowedHost)
    return config
  }
}
