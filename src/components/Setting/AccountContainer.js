import React, {useCallback, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {OutlineCol} from '../../styles/common';

const AccountContainer = () => {
	const [authorization, setAuthorization] = useState('id-password');
	const [MFA, setMFA] = useState('true');

	const onChangeAuthorization = useCallback((e) => {
		setAuthorization(e.target.value);
	}, []);

	const onChangeMFA = useCallback((e) => {
		setMFA(e.target.value);
	}, []);

	return (
		<OutlineCol flex={1} className={'fix-height'}>
			<h4>Account</h4>
			<Form.Group>
				<Form.Label>Account</Form.Label>
				<Form.Control type='text' />
			</Form.Group>
			<Form.Group>
				<Form.Label>Full Name</Form.Label>
				<Form.Control type='text' />
			</Form.Group>
			<Form.Group>
				<Form.Label>Email Address</Form.Label>
				<Form.Control type='email' />
			</Form.Group>

			<h4>Authorization</h4>
			<Form.Group>
				<Form.Label>Default Authorization</Form.Label>
				<Form.Control
					as='select'
					value={authorization}
					onChange={onChangeAuthorization}
				>
					<option value='id-password'>ID/Password</option>
					<option value='alternative-auth'>AlternativeAuthN</option>
				</Form.Control>
				<Button disabled={authorization === 'alternative-auth' && true}>
					Change Password
				</Button>
			</Form.Group>

			<Form.Group>
				<Form.Check
					type='radio'
					label='Google'
					name='formHorizontalRadios'
					disabled={authorization === 'id-password' && true}
				/>
				<Form.Check
					type='radio'
					label='Kakao'
					name='formHorizontalRadios'
					disabled={authorization === 'id-password' && true}
				/>
				<Form.Check
					type='radio'
					label='Naver'
					name='formHorizontalRadios'
					disabled={authorization === 'id-password' && true}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>MFA</Form.Label>
				<Form.Control as='select' value={MFA} onChange={onChangeMFA}>
					<option value='true'>사용</option>
					<option value='false'>사용안함</option>
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Check
					type='radio'
					label='OTP'
					name='formHorizontalRadios'
					disabled={MFA === 'false' && true}
				/>
				<Form.Check
					type='radio'
					label='Mail'
					name='formHorizontalRadios'
					disabled={MFA === 'false' && true}
				/>
				<Form.Check
					type='radio'
					label='SMS'
					name='formHorizontalRadios'
					disabled={MFA === 'false' && true}
				/>
				<Form.Check
					type='radio'
					label='Finger Print'
					name='formHorizontalRadios'
					disabled={MFA === 'false' && true}
				/>
				<Form.Check
					type='radio'
					label='Face ID'
					name='formHorizontalRadios'
					disabled={MFA === 'false' && true}
				/>
			</Form.Group>
		</OutlineCol>
	);
};

export default AccountContainer;
