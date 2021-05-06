import React, {useCallback, useEffect} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';

import useInput from '../../hooks/useInput';
import {AddServerModal, IconButton} from '../../styles/common';
import {FaTimes} from 'react-icons/all';
import * as PropTypes from 'prop-types';

const ChangePasswordForm = ({open, setOpen}) => {
	const [currentPassword, onChangeCurrentPassword] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [confrimPassword, onChangeConfirmPassword] = useInput('');

	const onSubmitForm = useCallback(() => {}, []);

	const onClickCloseForm = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		console.log(open);
	}, [open]);

	return (
		<Modal
			style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
			show={open}
			onHide={onClickCloseForm}
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header as='h5'>
				Change Password
				<IconButton className={'right'}>
					<FaTimes onClick={onClickCloseForm} />
				</IconButton>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmitForm}>
					<Form.Group>
						<Form.Label>Current Password</Form.Label>
						<Form.Control
							type='password'
							value={currentPassword}
							placeholder='Type in current password'
							onChange={onChangeCurrentPassword}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>New Password</Form.Label>
						<Form.Control
							type='password'
							value={password}
							placeholder='Type in new password'
							onChange={onChangePassword}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='password'
							value={confrimPassword}
							placeholder='Confirm new password'
							onChange={onChangeConfirmPassword}
						/>
					</Form.Group>
					<Button onClick={onClickCloseForm}>Cancel</Button>
					<Button type='submit'>Submit</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

ChangePasswordForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
