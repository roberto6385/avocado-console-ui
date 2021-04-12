import React, {useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'base-64';
import useInput from '../../hooks/useInput';
import {getUserTicket} from '../../reducers/userTicket';
import {SAVE_ENCODE_DATA} from '../../reducers/common';

const UserAuthForm = () => {
	const dispatch = useDispatch();
	const [user, onChangeUser] = useInput('web');
	const [password, onChangePassword] = useInput('123456789');

	const onSubmitForm = useCallback((e) => {
		e.preventDefault();
		const encodeData = base64.encode(`${user}:${password}`);
		dispatch({type: SAVE_ENCODE_DATA, data: encodeData});
		dispatch(
			getUserTicket({
				Authorization: 'Basic ' + encodeData,
				username: user,
				password: password,
			}),
		);
	}, []);

	return (
		<Form
			style={{
				width: '50%',
				margin: '0',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
			onSubmit={onSubmitForm}
		>
			<Form.Group>
				<Form.Label>Authorization - User</Form.Label>
				<Form.Control
					type='text'
					value={user}
					placeholder='Enter Username'
					onChange={onChangeUser}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Authorization - Password</Form.Label>
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

export default UserAuthForm;
