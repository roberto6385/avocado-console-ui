import React, {useCallback, useEffect, useRef} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../../hooks/useInput';
import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {IconButton} from '../../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	DialogBox,
} from '../../../styles/components/disalogBox';
import {Input} from '../../../styles/components/input';
import {Form} from '../../../styles/components/form';
import {
	USER_RESOURCE,
	userResourceAction,
} from '../../../reducers/api/userResource';
import {AUTH} from '../../../reducers/api/auth';
import {DIALOG_BOX, dialogBoxAction} from '../../../reducers/dialogBoxs';

const _PopupModal = styled(DialogBox)`
	z-index: 5;
	width: 404px;
`;

const ChangePasswordDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changePasswordForm');

	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const {data} = useSelector((state) => state[USER_RESOURCE], shallowEqual);
	const {form} = useSelector((state) => state[DIALOG_BOX], shallowEqual);

	const [currentPassword, onChangeCurrentPassword, setCurrentPassword] =
		useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword, setConfrimPassword] =
		useInput('');

	const currentRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmRef = useRef(null);

	const closeModal = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

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
					userResourceAction.modifyRequest({
						userUid: data.userUid,
						name: data.name,
						password: password,
						access_token: userData.access_token,
					}),
				);
				closeModal();
			}
		},
		[
			password,
			currentPassword,
			confirmPassword,
			setCurrentPassword,
			setPassword,
			setConfrimPassword,
			dispatch,
			data,
			userData,
			closeModal,
		],
	);

	useEffect(() => {
		if (form.open && form.key === 'password') {
			setCurrentPassword('');
			setPassword('');
			setConfrimPassword('');
		}
	}, [form, setConfrimPassword, setCurrentPassword, setPassword]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'password'}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>
			<Form onSubmit={onSubmitForm}>
				<TextBoxField_ title={t('current')}>
					<Input
						ref={currentRef}
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('place.current')}
					/>
				</TextBoxField_>

				<TextBoxField_ title={t('new')}>
					<Input
						ref={passwordRef}
						type='password'
						value={password}
						onChange={onChangePassword}
						placeholder={t('place.new')}
					/>
				</TextBoxField_>
				<TextBoxField_ title={t('confirm')}>
					<Input
						ref={confirmRef}
						type='password'
						value={confirmPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('place.confirm')}
					/>
				</TextBoxField_>
			</Form>

			<ModalFooter>
				<TransparentButton onClick={closeModal}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>{t('save')}</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default ChangePasswordDialogBox;
