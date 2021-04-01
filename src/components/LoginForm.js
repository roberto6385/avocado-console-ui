import React, {useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

import useInput from '../hooks/useInput';
import auth_ws from '../ws/auth_ws';
import {LOGIN} from '../reducers/common';

const LoginForm = () => {
	const dispatch = useDispatch();
	const [user, onChangeUser] = useInput('root');
	const [password, onChangePassword] = useInput('Netand141)');

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const ws = new WebSocket('ws://211.253.10.9:8081/ws/auth');

			ws.binaryType = 'arraybuffer';
			ws.onopen = () => {
				if (user === 'root' && password === 'Netand141)') {
					auth_ws({
						keyword: 'LoginRequest',
						ws_auth: ws,
					}).then((r) => {
						if (r.type === 'LOGIN')
							dispatch({
								type: LOGIN,
								data: {token: r.result, socket: ws},
							});
					});
				}
			};
		},
		[user, password],
	);

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
		</Form>
	);
};

export default LoginForm;
