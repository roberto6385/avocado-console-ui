const {createProxyMiddleware} = require('http-proxy-middleware');

exports.module = (app) => {
	app.use(
		createProxyMiddleware('/oauth2', {
			target:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
			changeOrigin: true,
			onProxyReq: function (request) {
				request.setHeader(
					'url',
					'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
				);
			},
		}),
	);
};
