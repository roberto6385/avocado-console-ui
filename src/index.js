import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import './i18n';
import App from './App';
import {store, persistor} from './store/configureStore';
import './styles/index.css';

ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</CookiesProvider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
