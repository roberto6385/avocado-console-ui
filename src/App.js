import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import 'xterm/css/xterm.css';

import {
	NotFound,
	Home,
	SignIn,
	Account,
	Preferences,
	Identities,
	SignUp,
	Password,
} from './pages';
import AlertPopup from './components/Popup/AlertPopup';
import AddServerForm from './components/Form/AddServerForm';
import ConfirmPopup from './components/Popup/ConfirmPopup';
import AddAccountForm from './components/Form/AddAccountForm';

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/signin' component={SignIn} />
				<Route path='/signup' component={SignUp} />
				<Route path='/password' component={Password} />
				<Route path='/account' component={Account} />
				<Route path='/preferences' component={Preferences} />
				<Route path='/identities' component={Identities} />
				<Route component={NotFound} />
			</Switch>
			<AddAccountForm />
			<AddServerForm />
			<ConfirmPopup />
			<AlertPopup />
		</BrowserRouter>
	);
};

export default App;
