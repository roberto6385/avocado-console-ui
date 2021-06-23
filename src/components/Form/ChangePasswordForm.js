import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import {fontColor} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {closeIconSmall} from '../../icons/icons';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	PopupModal,


} from '../../styles/default';
import {PrimaryGreenButton, PrimaryGreyButton} from "../../styles/button";

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 404px;
`;

const ChangePasswordForm = ({open, setOpen}) => {
	const {t} = useTranslation('changePasswordForm');
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);

	const [
		currentPassword,
		onChangeCurrentPassword,
		setCurrentPassword,
	] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [
		confrimPassword,
		onChangeConfirmPassword,
		setConfrimPassword,
	] = useInput('');

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			//TODO: Add submit action

			closeModal();
		},
		[currentPassword, password, confrimPassword],
	);

	const closeModal = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		if (open) {
			setCurrentPassword('');
			setPassword('');
			setConfrimPassword('');
		}
	}, [open]);

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
				<ModalHeaderIconButton theme_value={theme} onClick={closeModal}>
					{closeIconSmall}
				</ModalHeaderIconButton>
			</ModalHeader>
			<Form onSubmit={onSubmitForm}>
				<InputFiled_ title={t('current')}>
					<Input
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
						theme_value={theme}
					/>
				</InputFiled_>

				<InputFiled_ title={t('new')}>
					<Input
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
						theme_value={theme}
					/>
				</InputFiled_>
				<InputFiled_ title={t('confirm')}>
					<Input
						type='password'
						value={confrimPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('place.confirm')}
						theme_value={theme}
					/>
				</InputFiled_>
			</Form>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton
					theme_value={theme}
					onClick={closeModal}
					color={fontColor[theme]}
				>
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
