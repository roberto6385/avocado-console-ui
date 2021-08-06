import React, {useCallback, useEffect, useRef} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import useInput from '../../hooks/useInput';
import {CLOSE_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {ACCOUT_CONTROL_ID} from '../../reducers/common';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import ComboBox_ from '../RecycleComponents/ComboBox_';
import {closeIcon} from '../../icons/icons';

import {
	NormalButton,
	TransparentButton,
	NormalBorderButton,
} from '../../styles/components/button';
import {IconButton} from '../../styles/components/icon';
import {
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/components/disalogBox';
import TextBoxField_ from '../RecycleComponents/TextBoxField_';

const _PopupModal = styled(PopupModal)`
	width: 598px;
`;

const _Item = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const _Input = styled.input`
	width: '268px'
	height: '34px'
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _BrowseButton = styled(NormalBorderButton)`
	margin: 10px 8px 0px 8px;
`;

const _LongInput = styled(_Input)`
	width: 100%;
`;

const _FileInput = styled.input`
	display: none;
	border: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Label = styled.label`
	width: 100%;
	height: '34px'
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	background: ${(props) => props.back};
	margin: 0;
	cursor: pointer;
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: 14px;
	margin: 18px 8px 12px 8px;
`;

const AddAccountDialog = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('addAccountForm');

	const {account, accountListControlId} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {account_form_popup} = useSelector(
		(state) => state.popup,
		shallowEqual,
	);

	const [identity, onChangeIdentity, setIdentity] = useInput('');
	const [authentication, onChangeAuthentication, setAuthentication] =
		useInput('Password');
	const [username, onChangeUsername, setUsername] = useInput('');
	const [keyFile, onChangeKeyFile, setKeyFile] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [note, onChangeNote, setNote] = useInput('');

	const {current: authentication_options} = useRef([
		{value: 'Password', label: t('password')},
		{value: 'KeyFile', label: t('keyFile')},
	]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (authentication === 'Password') {
				if (identity !== '' && username !== '' && password !== '') {
					// dispatch({
					// 	type: SAVE_ACCOUT,
					// 	payload: {
					// 		identity,
					// 		username,
					// 		type: 'password',
					// 		key: currentResourceListKey,
					// 	},
					// });
				}
			} else {
				if (
					identity !== '' &&
					username !== '' &&
					keyFile !== '' &&
					password !== ''
				) {
					console.log('키파일 정보 저장');
				}
			}
			closeModal();
		},
		[authentication, closeModal, identity, username, password, keyFile],
	);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ADD_ACCOUT_FORM_POPUP});
		dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
	}, [dispatch]);

	useEffect(() => {
		if (account_form_popup.open) {
			if (accountListControlId !== null) {
				const item = account
					.slice()
					.find((item) => item.id === accountListControlId);

				if (item) {
					setAuthentication(
						item.type === 'password' ? t('password') : t('keyFile'),
					);
					setIdentity(item.name || '');
					setUsername(item.username || '');
				}
			} else {
				setIdentity('');
				setAuthentication('Password');
				setUsername('');
				setKeyFile('');
				setPassword('');
				setNote('');
			}
		}
	}, [
		account_form_popup,
		accountListControlId,
		account,
		setAuthentication,
		t,
		setIdentity,
		setUsername,
		setKeyFile,
		setPassword,
		setNote,
	]);

	return (
		<_PopupModal
			isOpen={account_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('addAccount')}</div>
				<IconButton
					btype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>
			<_Form onSubmit={onSubmitForm}>
				<_Item>
					<TextBoxField_ title={t('identity')} flex={1}>
						<_LongInput
							type='text'
							value={identity}
							onChange={onChangeIdentity}
							placeholder={t('place.identity')}
						/>
					</TextBoxField_>
					<ComboBox_
						width={'178px'}
						title={t('auth')}
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
					/>
				</_Item>
				<_Item>
					<TextBoxField_ title={t('userName')} flex={1}>
						<_LongInput
							type='text'
							value={username}
							onChange={onChangeUsername}
							placeholder={t('place.userName')}
						/>
					</TextBoxField_>
				</_Item>
				{authentication === 'Password' ? (
					<_Item>
						<TextBoxField_ title={t('password')} flex={1}>
							<_LongInput
								type='password'
								value={password}
								onChange={onChangePassword}
								placeholder={t('place.password')}
							/>
						</TextBoxField_>
					</_Item>
				) : (
					<React.Fragment>
						<_Item>
							<TextBoxField_ title={t('private')} flex={1}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<_FileInput
										id={'add_server_form_type_file'}
										type='file'
										value={keyFile}
										onChange={onChangeKeyFile}
									/>
								</_Label>
							</TextBoxField_>
							<_BrowseButton
								onClick={(e) => {
									e.preventDefault();
									document
										.getElementById(
											'add_server_form_type_file',
										)
										.click();
								}}
							>
								{t('browse')}
							</_BrowseButton>
						</_Item>

						<_Item>
							<TextBoxField_
								title={t('keyFilePassword')}
								flex={1}
							>
								<_LongInput
									type='password'
									value={password}
									onChange={onChangePassword}
									placeholder={t('place.password')}
								/>
							</TextBoxField_>
						</_Item>
					</React.Fragment>
				)}
				<_Item>
					<TextBoxField_ title={t('note')} flex={1}>
						<_LongInput
							type='text'
							value={note}
							onChange={onChangeNote}
							placeholder={t('place.note')}
						/>
					</TextBoxField_>
				</_Item>
			</_Form>
			<ModalFooter>
				<TransparentButton onClick={closeModal}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>{t('save')}</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default AddAccountDialog;
