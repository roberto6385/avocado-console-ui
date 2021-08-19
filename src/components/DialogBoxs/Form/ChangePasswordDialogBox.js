import React, {useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../../hooks/useInput';
import TextBoxField from '../../RecycleComponents/TextBoxField';
import {useDispatch, useSelector} from 'react-redux';
import {closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {IconButton} from '../../../styles/components/icon';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/disalogBox';
import {TextBox} from '../../../styles/components/textBox';
import {Form} from '../../../styles/components/form';
import {
	userResourceAction,
	userResourceSelector,
} from '../../../reducers/api/userResource';
import {authSelector} from '../../../reducers/api/auth';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

const _PopupModal = styled(DialogBox)`
	z-index: 5;
	width: 404px;
`;

const ChangePasswordDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('changePasswordForm');

	const {userData} = useSelector(authSelector.all);
	const {data} = useSelector(userResourceSelector.all);
	const {form} = useSelector(dialogBoxSelector.all);

	const [currentPassword, onChangeCurrentPassword, setCurrentPassword] =
		useInput('');
	const [newPassword, onChangeNewPassword, setNewPassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword, setConfrimPassword] =
		useInput('');

	const currentPasswordRef = useRef(null);
	const newPasswordRef = useRef(null);

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const onSubmitChangePassword = useCallback(
		(e) => {
			e.preventDefault();

			if (currentPassword !== localStorage.getItem('password')) {
				//TODO: check password match through auth server (not localStorage)
				//TODO: Show currentPassword does not match Message
				setCurrentPassword('');
				currentPasswordRef.current?.focus();
			} else if (newPassword !== confirmPassword) {
				//TODO: Show password !== confirmPassword Message
				setNewPassword('');
				setConfrimPassword('');
				newPasswordRef.current?.focus();
			} else {
				dispatch(
					userResourceAction.modifyUserRequest({
						userUid: data.userUid,
						name: data.name,
						password: newPassword,
						access_token: userData.access_token,
					}),
				);
				onClickCloseDialogBox();
			}
		},
		[
			newPassword,
			currentPassword,
			confirmPassword,
			setCurrentPassword,
			setNewPassword,
			setConfrimPassword,
			dispatch,
			data,
			userData,
			onClickCloseDialogBox,
		],
	);

	useEffect(() => {
		if (form.open && form.key === 'password') {
			setCurrentPassword('');
			setNewPassword('');
			setConfrimPassword('');
		}
	}, [form, setConfrimPassword, setCurrentPassword, setNewPassword]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'password'}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('title')}</div>
				<IconButton
					btype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>
			<Form onSubmit={onSubmitChangePassword}>
				<TextBoxField title={t('current')}>
					<TextBox
						ref={currentPasswordRef}
						type='password'
						value={currentPassword}
						onChange={onChangeCurrentPassword}
						placeholder={t('placeholder.current')}
						required
					/>
				</TextBoxField>

				<TextBoxField title={t('new')}>
					<TextBox
						ref={newPasswordRef}
						type='password'
						value={newPassword}
						onChange={onChangeNewPassword}
						placeholder={t('placeholder.new')}
						required
					/>
				</TextBoxField>
				<TextBoxField title={t('confirm')}>
					<TextBox
						type='password'
						value={confirmPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('placeholder.confirm')}
						required
					/>
				</TextBoxField>
			</Form>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitChangePassword}>
					{t('save')}
				</NormalButton>
			</DialogBoxFooter>
		</_PopupModal>
	);
};

export default ChangePasswordDialogBox;
