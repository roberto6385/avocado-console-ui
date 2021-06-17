import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import Input_ from '../RecycleComponents/Input_';
import {
	PATH_SEARCH_INPUT_HEIGHT,
	borderColor,
	fontColor,
	inputColor,
} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {closeIconSmall} from '../../icons/icons';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {FONT_14} from '../../styles/length';
import {
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	PopupModal,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/default';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 404px;
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${FONT_14};
	padding: 18px 16px 29px 16px;
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
			themeValue={theme}
		>
			<ModalHeader themeValue={theme}>
				<div>{t('title')}</div>
				<ModalHeaderIconButton themeValue={theme} onClick={closeModal}>
					{closeIconSmall}
				</ModalHeaderIconButton>
			</ModalHeader>
			<_Form onSubmit={onSubmitForm}>
				<Input_ title={t('current')}>
					<_Input
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>

				<Input_ title={t('new')}>
					<_Input
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>
				<Input_>
					<_Input
						type='password'
						value={confrimPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('place.confirm')}
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
					/>
				</Input_>
			</_Form>

			<ModalFooter themeValue={theme}>
				<PrimaryGreyButton
					themeValue={theme}
					onClick={closeModal}
					color={fontColor[theme]}
				>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={onSubmitForm}>
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
