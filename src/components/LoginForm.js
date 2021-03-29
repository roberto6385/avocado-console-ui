import React, {useCallback, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../hooks/useInput';
import auth_ws from '../ws/auth_ws';
import useAuthWs from '../ws/useAuthWs';
import AUTH from '../dist/auth_pb';

const LoginForm = () => {
	const [user, onChangeUser] = useInput('root');
	const [password, onChangePassword] = useInput('Netand141)');
	// const [loggedIn, setLoggedIn] = useState(false);
	const [socket, result] = useAuthWs(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (user === 'root' && password === 'Netand141)') {
				const message = new AUTH.Message();
				const request = new AUTH.Request();
				const login = new AUTH.LoginRequest();
				login.setUser('root');
				login.setPassword('Netand141)');

				request.setLogin(login);
				message.setRequest(request);

				socket.current.send(message.serializeBinary());
			}
		},
		[user, password],
	);

	// const logout = useCallback(() => {
	// 	const ws_auth = new WebSocket('ws://211.253.10.9:8081/ws/auth');
	// 	auth_ws({
	// 		keyword: 'LogoutRequest',
	// 		ws_auth,
	// 	}).then((response) => {
	// 		setLoggedIn(false);
	// 		console.log(response);
	// 	});
	// }, []);

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
			{/*{loggedIn && <Button onClick={logout}>Logout</Button>}*/}
		</Form>
	);
};

export default LoginForm;
