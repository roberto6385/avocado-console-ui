const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/', {
			target:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
			changeOrigin: true,
		}),
	);
};
