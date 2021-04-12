const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/oauth2', {
			target: 'http://211.253.24.87:10072',
			changeOrigin: true,
		}),
	);
};
