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
import {LOGOUT} from './reducers/user';
import {
	REFRESH_USER_TICKET_FAILURE,
	REFRESH_USER_TICKET_REQUEST,
	REFRESH_USER_TICKET_SUCCESS,
} from './reducers/auth/userTicket';
import base64 from 'base-64';

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
		// if (userTicket.userTicket) {
		// 	if (
		// 		Date.now() - userTicket.expires_in * 1000 + 50 * 60 * 1000 >
		// 		Date.parse(userTicket.create_date)
		// 	) {
		// 		const encodeData = base64.encode(`${'web'}:${'123456789'}`);
		//
		// 		dispatch({
		// 			type: REFRESH_USER_TICKET_REQUEST,
		// 			params: {
		// 				refresh_token: userTicket.refresh_token,
		// 				Authorization: 'Basic ' + encodeData,
		// 			},
		// 		});
		//
		// 		console.log('HERE');
		// 	}
		// }
	}, [userTicket]);

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
