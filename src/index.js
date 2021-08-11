import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import './i18n';
import App from './App';
import configStore from './store/configureStore';
import './styles/global/index.css';

const {store, persistor} = configStore();

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
