import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';

import store from './store/configureStore';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</CookiesProvider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
