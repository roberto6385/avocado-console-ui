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
import AddFavoritesForm from './components/Form/AddFavoritesForm';
import {
	REFRESH_USER_TICKET_REQUEST,
} from './reducers/auth/userTicket';
import base64 from 'base-64';


const App = () => {
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket);

	const handleOnIdle = useCallback(() => {
		// console.log('stop');
		sessionStorage.setItem('lastTouchTime', getLastActiveTime());
	}, []);

	const handleOnActive = useCallback(() => {
		//after idle time, user is online
		if (userTicket) {
			// dispatch(
			// 	revokeUserTicket({
			// 		Authorization: 'Bearer ' + userTicket.access_token,
			// 	}),
			// );
			sessionStorage.clear();
		}
	}, [userTicket]);

	const handleOnAction = useCallback(() => {
		sessionStorage.setItem('lastTouchTime', Date.now());
		if (userTicket) {
			//from 10 min before expire token
			if (
				Date.now() - userTicket.expires_in * 1000 + 50 * 60 * 1000 >
				Date.parse(userTicket.create_date)
			) {
				const encodeData = base64.encode(`${'web'}:${'123456789'}`);

				dispatch({
					type: REFRESH_USER_TICKET_REQUEST,
					params: {
						refresh_token: userTicket.refresh_token,
						Authorization: 'Basic ' + encodeData,
					},
				});
			}
		}
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
			<AddFavoritesForm />
			<AlertPopup />
			<WarningAlertPopup />
			<InputPopup />
			<SavePopup />
		</BrowserRouter>
	);
};

export default App;
