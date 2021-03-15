module.exports = {
	// parser : JavaScript transpiler 및 ES 언어 features 을 조정할 수 있습니다.
	parser: 'babel-eslint', // bable-eslint : ESLint가 Babel에 의해 변환 된 소스 코드에서 실행될 수 있도록하는 파서입니다.
	env: {
		browser: true, // ex) document, setInterval, clearInterval
		node: true,
	},
	plugins: ['react', 'prettier'], //jsx, prettier 활성화
	rules: {
		// 0 false, 1 warn, 2 error
		'prettier/prettier': 0, //prettier 에 대한 경고 끄기
		'for-direction': 2, // for 루프가 무한대로 실행되는 것을 방지
		'no-undef': 2,
		'no-console': 2,
		'no-empty': 2,
		'no-dupe-args': 2,
		'no-dupe-keys': 2,
		'no-unreachable': 2,
		'react/jsx-key': 2,
		'react/jsx-no-duplicate-props': 2,
		'react/jsx-no-undef': 2,
		'react/jsx-uses-vars': 2,
		'react/no-children-prop': 2,
		'react/no-deprecated': 2, // react version 감지하여 deprecated 된 함수 경고
		'react/no-direct-mutation-state': 2, // state 를 직접 바꾸지 않게하기 위한 옵션
		'react/no-is-mounted': 2,
		'react/no-render-return-value': 2,
		'react/no-unknown-property': 2,
		'react/require-render-return': 2, //render method를 작성할때 return 이 없으면 경고
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	globals: {
		naver: 'readonly', // global 변수 naver 설정
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'], // 확장하고 싶은 기본 규칙 추가 ex) ["eslint:recommended", "plugin:react/recommended"]
};
