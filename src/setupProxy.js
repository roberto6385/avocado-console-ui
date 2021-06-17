const {createProxyMiddleware} = require('http-proxy-middleware');

exports.module = (app) => {
	app.use(
		createProxyMiddleware('/', {
			target:
				'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200',
			changeOrigin: true,
			onProxyRes: function (proxyRes) {
				proxyRes.headers['Access-Control-Allow-Origin'] =
					'http://ec2-3-36-116-0.ap-northeast-2.compute.amazonaws.com:10200';
			},
			pathRewrite: {
				'^/': '', // 하위 url 초기화
			},
		}),
	);
};
