import React, {useCallback, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import 'xterm/css/xterm.css';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
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
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';
import InputDialogBox from './components/DialogBoxs/Form/InputDialogBox';
import SaveDialogBox from './components/DialogBoxs/Alert/SaveDialogBox';
import {AUTH, authAction} from './reducers/api/auth';
import Toast_ from './components/RecycleComponents/Toast_';
import GlobalStyle from './styles/global/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {themeValues} from './json/themeValues';
import {properties} from './json/properties';
import WarningDialogBox from './components/DialogBoxs/Alert/WarningDialogBox';
import {ENCODE_DATA} from './api/constants';

const App = () => {
	const dispatch = useDispatch();

	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const {theme} = useSelector((state) => state.common, shallowEqual);

	// const handleOnIdle = useCallback(() => {
	// 	// console.log('stop');
	// 	// sessionStorage.setItem('lastTouchTime', getLastActiveTime());
	// }, []);

	const handleOnActive = useCallback(() => {
		//after idle time, user is online
		if (userData) {
			dispatch(authAction.revokeRequest());
		}
	}, [dispatch, userData]);

	const handleOnAction = useCallback(() => {
		// sessionStorage.setItem('lastTouchTime', Date.now());
		if (userData) {
			//from 10 min before expire token
			if (
				Date.now() - userData.expires_in * 1000 + 10 * 60 * 1000 >
				Date.parse(userData.create_date)
			) {
				dispatch(
					authAction.refreshRequest({
						refresh_token: userData.refresh_token,
						Authorization: 'Basic ' + ENCODE_DATA,
					}),
				);
			}
		}
	}, [dispatch, userData]);

	//TODO VARIFY_USER_TICKET_REQUEST로 토큰유효성 테스트 해야함.
	const {start, pause, reset, getLastActiveTime} = useIdleTimer({
		timeout: userData?.expires_in * 1000,
		// onIdle: handleOnIdle,
		onActive: handleOnActive,
		onAction: handleOnAction,
		debounce: 5000,
	});

	useEffect(() => {
		if (userData) start();
		else {
			reset();
			pause();
		}
	}, [userData]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={themeValues[theme]}>
				<GlobalStyle />
				<Switch>
					<Route path='/' exact component={Home} />
					<Route path='/account' component={Account} />
					<Route path='/preferences' component={Preferences} />
					<Route path='/identities' component={Identities} />
					<ThemeProvider theme={themeValues['light']}>
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
