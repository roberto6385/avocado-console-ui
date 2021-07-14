import React, {useCallback, useEffect} from 'react';
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

	const handleOnIdle = useCallback(() => {
		sessionStorage.setItem('lastTouchTime', getLastActiveTime());
	}, []);

	const handleOnActive = useCallback(() => {
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
	}, [userTicket]);

	const handleOnAction = useCallback(() => {
		// sessionStorage.setItem('lastTouchTime', Date.now());
	}, []);

	const {start, pause, reset, getLastActiveTime} = useIdleTimer({
		timeout: userTicket?.expires_in * 1000,
		onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 500,
	});

	useEffect(() => {
		if (userTicket) start();
		else {
			reset();
			pause();
		}
	}, [userTicket]);

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
