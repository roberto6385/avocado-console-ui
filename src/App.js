import React, {useCallback, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import 'xterm/css/xterm.css';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useIdleTimer} from 'react-idle-timer';
import base64 from 'base-64';

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
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import AddServerDialogBox from './components/DialogBoxs/Form/AddServerDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';
import InputDialogBox from './components/DialogBoxs/Form/InputDialogBox';
import SaveDialogBox from './components/DialogBoxs/Alert/SaveDialogBox';
import AddFavoritesDialogBox from './components/DialogBoxs/Form/AddFavoritesDialogBox';
import {
	REFRESH_USER_TICKET_REQUEST,
	REVOKE_USER_TICKET_SUCCESS,
} from './reducers/auth/userTicket';
import Toast_ from './components/RecycleComponents/Toast_';
import FileStatusDialogBox from './components/DialogBoxs/Form/FileStatusDialogBox';
import GlobalStyle from './styles/global/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {themeValues} from './json/themeValues';
import {properties} from './json/properties';
import WarningDialogBox from './components/DialogBoxs/Alert/WarningDialogBox';

const App = () => {
	const dispatch = useDispatch();

	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const {theme} = useSelector((state) => state.common, shallowEqual);

	// const handleOnIdle = useCallback(() => {
	// 	// console.log('stop');
	// 	// sessionStorage.setItem('lastTouchTime', getLastActiveTime());
	// }, []);

	const handleOnActive = useCallback(() => {
		//after idle time, user is online
		if (userTicket) {
			dispatch({type: REVOKE_USER_TICKET_SUCCESS});
		}
	}, [userTicket]);

	const handleOnAction = useCallback(() => {
		// sessionStorage.setItem('lastTouchTime', Date.now());
		if (userTicket) {
			//from 10 min before expire token
			if (
				Date.now() - userTicket.expires_in * 1000 + 10 * 60 * 1000 >
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
		// onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 5000,
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
			<ThemeProvider theme={themeValues[theme]}>
				<GlobalStyle />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/account' component={Account} />
					<Route path='/preferences' component={Preferences} />
					<Route path='/identities' component={Identities} />
					<ThemeProvider theme={properties}>
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route path='/password' component={Password} />
						<Route path='/Redirect' component={Redirect} />
					</ThemeProvider>
					<Route component={NotFound} />
				</Switch>
				<ConfirmDialogBox />
				<WarningDialogBox />
				<SaveDialogBox />
				<DeleteDialogBox />
				<InputDialogBox />
				<Toast_ />
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
