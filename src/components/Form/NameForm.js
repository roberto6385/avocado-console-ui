import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import InputFiled_ from '../RecycleComponents/InputFiled_';
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
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';
import {putModify} from '../../reducers/auth/modify';
import {ClickableIconButton} from "../../styles/icon";

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 404px;
`;

const ChangeNameForm = ({open, setOpen}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changeNameForm');

	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {userInfo, userTicket} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);

	const [currentName, onChangeCurrentName, setCurrentName] = useInput('');

	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			console.log(userInfo);

			if (currentName !== '') {
				dispatch(
					putModify({
						userUid: userInfo.userUid,
						name: currentName,
						password: localStorage.getItem('password'),
						access_token: userTicket.access_token,
					}),
				);
			}

			closeModal();
		},
		[userTicket, userInfo, currentName, closeModal, dispatch],
	);

	useEffect(() => {
		if (open) {
			setCurrentName('');
		}
	}, [open, setCurrentName]);

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
				<InputFiled_ title={t('name')}>
					<Input
						type='text'
						value={currentName}
						onChange={onChangeCurrentName}
						placeholder={t('place.name')}
						theme_value={theme}
					/>
				</InputFiled_>
				{/*<InputFiled_ title={t('current')}>*/}
				{/*	<Input*/}
				{/*		type='password'*/}
				{/*		value={currentPassword}*/}
				{/*		onChange={onChangeCurrentPassword}*/}
				{/*		placeholder={t('place.current')}*/}
				{/*		theme_value={theme}*/}
				{/*	/>*/}
				{/*</InputFiled_>*/}
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

ChangeNameForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default ChangeNameForm;
