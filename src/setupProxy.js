const {legacyCreateProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api1',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
        })
    );
    app.use(
        '/api2',
        legacyCreateProxyMiddleware({
            target: 'http://localhost:4000',
            changeOrigin: true,
        })
    );
};