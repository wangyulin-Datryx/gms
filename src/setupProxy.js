const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://8.130.177.91:8080/',
    pathRewrite: {
      '^/api': '',
    },
    changeOrigin: true,
    secure: false
  }))
}