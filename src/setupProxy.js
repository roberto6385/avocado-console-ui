const {createProxyMiddleware} = require('http-proxy-middleware');
const {config} = require('./api/config');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/oauth2', {
			target: config.auth,
			changeOrigin: true,
		}),
	);
	app.use(
		createProxyMiddleware('/open', {
			target: config.api,
			changeOrigin: true,
		}),
	);
};
