import React, {useCallback, useEffect, useRef} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import InputField_ from '../RecycleComponents/inputField_';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {closeIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/default';
import {PrimaryGreenButton, PrimaryGreyButton} from '../../styles/button';
import {fontColor} from '../../styles/color';
import {putModify} from '../../reducers/auth/modify';
import {DefaultIconButton} from '../../styles/icon';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 404px;
`;

const ChangePasswordForm = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changePasswordForm');

	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {userInfo, userTicket} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);

	const [currentPassword, onChangeCurrentPassword, setCurrentPassword] =
		useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword, setConfrimPassword] =
		useInput('');

	const currentRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmRef = useRef(null);

	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (
				password === '' ||
				currentPassword === '' ||
				confirmPassword === ''
			) {
				console.log('입력하지 않은 값이 있습니다.');
				currentPassword === '' && currentRef.current?.focus();
				password === '' && passwordRef.current?.focus();
				confirmPassword === '' && confirmRef.current?.focus();
			} else if (currentPassword !== localStorage.getItem('password')) {
				console.log('현재 비밀번호 값이 올바르지 않습니다.');
				setCurrentPassword('');
				currentRef.current?.focus();
			} else if (password !== confirmPassword) {
				console.log('입력한 두 비밀번호가 일치하지 않습니다');
				setPassword('');
				setConfrimPassword('');
				passwordRef.current?.focus();
			} else {
				dispatch(
					putModify({
						userUid: userInfo.userUid,
						name: userInfo.name,
						password: password,
						access_token: userTicket.access_token,
					}),
				);
				closeModal();
			}
		},
		[
			password,
			currentPassword,
			confirmPassword,
			closeModal,
			setCurrentPassword,
			setPassword,
			setConfrimPassword,
			dispatch,
			userInfo,
			userTicket,
		],
	);

	useEffect(() => {
		if (open) {
			setCurrentPassword('');
			setPassword('');
			setConfrimPassword('');
		}
	}, [open, setConfrimPassword, setCurrentPassword, setPassword]);

	return (
		<_PopupModal
			isOpen={open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('title')}</div>
				<DefaultIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</DefaultIconButton>
			</ModalHeader>
			<Form onSubmit={onSubmitForm}>
				<InputField_ title={t('current')}>
					<Input
						ref={currentRef}
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
						theme_value={theme}
					/>
				</InputField_>

				<InputField_ title={t('new')}>
					<Input
						ref={passwordRef}
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
						theme_value={theme}
					/>
				</InputField_>
				<InputField_ title={t('confirm')}>
					<Input
						ref={confirmRef}
						type='password'
						value={confirmPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('place.confirm')}
						theme_value={theme}
					/>
				</InputField_>
			</Form>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton theme_value={theme} onClick={onSubmitForm}>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

ChangePasswordForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
