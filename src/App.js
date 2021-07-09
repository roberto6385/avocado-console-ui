import React, {useCallback} from 'react';
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
	Redirect,
} from './pages';
import AlertPopup from './components/Popup/AlertPopup';
import AddServerForm from './components/Form/AddServerForm';
import WarningAlertPopup from './components/Popup/WarningAlertPopup';
import InputPopup from './components/Popup/InputPopup';
import SavePopup from './components/Popup/SavePopup';
import RefreshPopup from './components/Popup/RefreshPopup';
import {useDispatch, useSelector} from 'react-redux';
import {useCookies} from 'react-cookie';
import {useIdleTimer} from 'react-idle-timer';
import {REFRESH_USER_TICKET_REQUEST, REFRESH_USER_TICKET_SUCCESS} from './reducers/auth/userTicket';
import base64 from 'base-64';
import {getRevoke} from './reducers/auth/revoke';

export const isTokenExpired = () => {};

// export const userTokenHasToBeRefreshed = () => {
// 	const dispatch = useDispatch();
// 	const {userTicket} = useSelector((state) => state.userTicket);
// 	const [cookies, setCookie, removeCookie] = useCookies(['lastTouchTime']);
//
// 	if (Date.now - cookies('lastTouchTime') > userTicket.expires_in) {
// 		const encodeData = base64.encode(`${'web'}:${'123456789'}`);
// 		dispatch({
// 			type: GET_REFRESH_TICKET_REQUEST,
// 			params: {
// 				refresh_token: userTicket.refresh_token,
// 				Authorization: 'Basic ' + encodeData,
// 			},
// 		});
// 	}
// };

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
		[userTicket],
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
