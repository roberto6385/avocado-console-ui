import React, {useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../hooks/useInput';

const LoginForm = () => {
	const dispatch = useDispatch();
	const {me} = useSelector((state) => state.common);
	const [user, onChangeUser] = useInput('');
	const [password, onChangePassword] = useInput('');

	const onSubmitForm = useCallback((e) => {
		e.preventDefault();
		console.log(user);
		console.log(password);
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

			<Button type='submit'>Submit</Button>
		</Form>
	);
};

export default LoginForm;
