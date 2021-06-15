import React, {useCallback} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import base64 from 'base-64';

import useInput from '../../hooks/useInput';
import {getClientTicket} from '../../reducers/auth/clientTicket';
import styled from 'styled-components';

const _Form = styled(Form)`
	width: 50%;
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

//currently do not use
const ClientSignInForm = () => {
	const dispatch = useDispatch();
	const [user, onChangeUser] = useInput('web');
	const [password, onChangePassword] = useInput('123456789');

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const encodeData = base64.encode(`${user}:${password}`);
			dispatch(getClientTicket({Authorization: 'Basic ' + encodeData}));
		},
		[user, password],
	);

	return (
		<_Form onSubmit={onSubmitForm}>
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
		</_Form>
	);
};

export default ClientSignInForm;
