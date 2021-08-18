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
import ConfirmDialogBox from './components/DialogBoxs/Alert/ConfirmDialogBox';
import DeleteDialogBox from './components/DialogBoxs/Alert/DeleteDialogBox';
import TextBoxDialogBox from './components/DialogBoxs/Form/TextBoxDialogBox';
import SaveDialogBox from './components/DialogBoxs/Alert/SaveDialogBox';
import {authAction, authSelector} from './reducers/api/auth';
import Toast_ from './components/RecycleComponents/Toast_';
import GlobalStyle from './styles/global/GlobalStyle';
import {ThemeProvider} from 'styled-components';
import {themeValues} from './json/themeValues';
import WarningDialogBox from './components/DialogBoxs/Alert/WarningDialogBox';
import {ENCODE_DATA} from './api/constants';
import {settingSelector} from './reducers/setting';

const App = () => {
	const dispatch = useDispatch();

	const {userData} = useSelector(authSelector.all);
	const {theme} = useSelector(settingSelector.all);

	const handleOnActive = useCallback(() => {
		//after idle time, user is online
		if (userData) {
			dispatch(authAction.revokeRequest());
		}
	}, [dispatch, userData]);

	const handleOnAction = useCallback(() => {
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

	//TODO: VARIFY_USER_TICKET_REQUEST로 토큰유효성 테스트 해야함.
	const {start, pause, reset} = useIdleTimer({
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
	}, [pause, reset, start, userData]);

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
				<TextBoxDialogBox />
				<Toast_ />
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
