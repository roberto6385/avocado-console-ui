import React, {useCallback} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import 'xterm/css/xterm.css';
import {useDispatch, useSelector} from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';

import {
	NotFound,
	Home,
	SignIn,
	Account,
	Preferences,
	Identities,
	SignUp,
	Password,
	Redirect,
} from './pages';
import AlertPopup from './components/Popup/AlertPopup';
import AddServerForm from './components/Form/AddServerForm';
import WarningAlertPopup from './components/Popup/WarningAlertPopup';
import InputPopup from './components/Popup/InputPopup';
import SavePopup from './components/Popup/SavePopup';
import RefreshPopup from './components/Popup/RefreshPopup';
import {getRevoke} from './reducers/auth/revoke';

const App = () => {
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket);

	const handleOnIdle = useCallback((e) => {
		console.log('logout 하야 함');
		//expire token
	}, []);

	const handleOnActive = useCallback(
		(e) => {
			//다시 움직이기 시작
			if (userTicket) {
				dispatch(
					getRevoke({
						Authorization: 'Bearer ' + userTicket.access_token,
					}),
				);
				sessionStorage.clear();
				window.location.reload();
			}
		},
		[dispatch, userTicket],
	);

	const handleOnAction = useCallback((e) => {
		sessionStorage.setItem('lastTouchTime', Date.now());
	}, []);

	const {getRemainingTime, getLastActiveTime} = useIdleTimer({
		timeout: userTicket?.expires_in * 1000,
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 500,
	});

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
				<Route path='/Redirect' component={Redirect} />
				<Route component={NotFound} />
			</Switch>
			<AddServerForm />
			<AlertPopup />
			<WarningAlertPopup />
			<InputPopup />
			<SavePopup />
			<RefreshPopup />
		</BrowserRouter>
	);
};

export default App;
