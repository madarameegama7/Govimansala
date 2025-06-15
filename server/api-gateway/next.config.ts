const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
  async middleware() {
    return [
      createProxyMiddleware('/api/auth', {
        target: 'http://localhost:3001',
        pathRewrite: { '^/api/auth': '' },
        changeOrigin: true,
      }),
      createProxyMiddleware('/api/orders', {
        target: 'http://localhost:3002',
        pathRewrite: { '^/api/orders': '' },
        changeOrigin: true,
      })
    ]
  }
}