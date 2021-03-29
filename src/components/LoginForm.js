import React, {useCallback, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../hooks/useInput';
import auth_ws from '../ws/auth_ws';

const LoginForm = () => {
	const dispatch = useDispatch();
	const {me} = useSelector((state) => state.common);
	const [user, onChangeUser] = useInput('root');
	const [password, onChangePassword] = useInput('Netand141)');
	const [loggedIn, setLoggedIn] = useState(false);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			console.log(user);
			console.log(password);
			if (user === 'root' && password === 'Netand141)') {
				const ws_auth = new WebSocket('ws://211.253.10.9:8081/ws/auth');
				ws_auth.binaryType = 'arraybuffer';
				ws_auth.onopen = () => {
					auth_ws({
						keyword: 'LoginRequest',
						ws_auth,
						user,
						password,
					}).then((response) => {
						setLoggedIn(true);
						console.log(response);
					});
				};
			}
		},
		[user, password],
	);

	const logout = useCallback(() => {
		const ws_auth = new WebSocket('ws://211.253.10.9:8081/ws/auth');
		auth_ws({
			keyword: 'LogoutRequest',
			ws_auth,
		}).then((response) => {
			setLoggedIn(false);
			console.log(response);
		});
	}, []);

	return (
		<Form onSubmit={onSubmitForm}>
			<Form.Group>
				<Form.Label>User</Form.Label>
				<Form.Control
					type='text'
					value={user}
					placeholder='Enter Username'
					onChange={onChangeUser}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={password}
					placeholder='Password'
					onChange={onChangePassword}
				/>
			</Form.Group>

			<Button type='submit'>Login</Button>
			{loggedIn && <Button onClick={logout}>Logout</Button>}
		</Form>
	);
};

export default LoginForm;
