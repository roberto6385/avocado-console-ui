import React, {useCallback, useEffect} from 'react';
import useInput from '../../hooks/useInput';
import Modal from 'react-modal';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	DefaultButton,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
} from '../../styles/global_design';
import {IoCloseOutline} from 'react-icons/all';
import Input_ from '../RecycleComponents/Input_';

const _Modal = styled(Modal)`
	border: 1px solid ${BORDER_COLOR};
	position: absolute;
	z-index: 5;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	background: white;
	border-radius: 4px;
	width: 404px;
`;

const _Header = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _Span = styled.span`
	line-height: ${FOLDER_HEIGHT};
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid ${BORDER_COLOR};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${AVOCADO_FONTSIZE};
	padding: 18px 16px 29px 16px;
`;

const ChangePasswordForm = ({open, setOpen}) => {
	const [currentPassword, onChangeCurrentPassword] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [confrimPassword, onChangeConfirmPassword] = useInput('');

	const onSubmitForm = useCallback((e) => {
		e.preventDefault();
		console.log('some action');
		closeModal();
	}, []);

	const closeModal = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		console.log(open);
	}, [open]);
	// onClickCloseForm
	return (
		<_Modal
			isOpen={open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_Span>Change Password</_Span>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<Input_ title={'Current Password'}>
					<_Input
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={'Type in current password'}
					/>
				</Input_>

				<Input_ title={'New Password'}>
					<_Input
						value={password}
						onChange={onChangePassword}
						placeholder={'New Password'}
					/>
				</Input_>

				<Input_ title={'Confirm new password'}>
					<_Input
						value={confrimPassword}
						onChange={onChangeConfirmPassword}
						placeholder={'New Password'}
					/>
				</Input_>
				<button
					type='submit'
					id={'change_password_form_submit_button'}
					style={{display: 'none'}}
				/>
			</_Form>

			<_Footer>
				<DefaultButton onClick={closeModal}>Cancel</DefaultButton>
				<PrimaryButton
					onClick={() =>
						document
							.getElementById(
								'change_password_form_submit_button',
							)
							.click()
					}
				>
					Save
				</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

ChangePasswordForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
