import React, {useCallback, useEffect} from 'react';
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
import {
	ClickableIconButton,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';
import {putModify} from '../../reducers/auth/modify';

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
	const [confrimPassword, onChangeConfirmPassword, setConfrimPassword] =
		useInput('');

	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (
				currentPassword === localStorage.getItem('password') &&
				password === confrimPassword &&
				password !== ''
			) {
				dispatch(
					putModify({
						userUid: userInfo.userUid,
						name: userInfo.name,
						password: password,
						access_token: userTicket.access_token,
					}),
				);
			}

			closeModal();
		},
		[
			userInfo,
			currentPassword,
			password,
			confrimPassword,
			closeModal,
			dispatch,
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
				<ClickableIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>
			<Form onSubmit={onSubmitForm}>
				<InputField_ title={t('current')}>
					<Input
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
						theme_value={theme}
					/>
				</InputField_>

				<InputField_ title={t('new')}>
					<Input
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
						theme_value={theme}
					/>
				</InputField_>
				<InputField_ title={t('confirm')}>
					<Input
						type='password'
						value={confrimPassword}
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
