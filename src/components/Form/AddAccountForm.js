import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../../hooks/useInput';
import {CLOSE_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {ACCOUT_CONTROL_ID} from '../../reducers/common';
import styled from 'styled-components';
import Modal from 'react-modal';
import {useTranslation} from 'react-i18next';
import Input_ from '../RecycleComponents/Input_';
import Select_ from '../RecycleComponents/Select_';
import {
	ACCOUNT_BUTTON_WIDTH,
	AVOCADO_FONTSIZE,
	BorderButton,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
	SecondaryButtonGreen,
	formColor,
	borderColor,
	fontColor,
	iconColor,
	inputColor,
} from '../../styles/global';
import {closeIconSmall} from '../../icons/icons';

const _Modal = styled(Modal)`
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	border-radius: 4px;
	width: 600px;
`;

const _Item = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const _Input = styled.input`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _BrowseButton = styled(SecondaryButtonGreen)`
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
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	margin: 0;
	cursor: pointer;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
	border-color: ${(props) => props.b_color};
	font-weight: 500;
`;

const _Title = styled.div`
	line-height: ${FOLDER_HEIGHT};
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${AVOCADO_FONTSIZE};
	padding: 18px 8px 12px 8px;
`;

const AddAccountForm = () => {
	const {t} = useTranslation('addAccountForm');
	const dispatch = useDispatch();
	const {
		account,
		accountListControlId,
		currentResourceListKey,
		theme,
	} = useSelector((state) => state.common);
	const {account_form_popup} = useSelector((state) => state.popup);

	const [identity, onChangeIdentity, setIdentity] = useInput('');
	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
	const [username, onChangeUsername, setUsername] = useInput('');
	const [keyFile, onChangeKeyFile, setKeyFile] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [note, onChangeNote, setNote] = useInput('');

	const authentication_options = [
		{value: 'Password', label: t('password')},
		{value: 'KeyFile', label: t('keyFile')},
	];

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
		[identity, password, dispatch],
	);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ADD_ACCOUT_FORM_POPUP});
		dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
	}, []);

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
	}, [account_form_popup, accountListControlId]);

	return (
		<_Modal
			isOpen={account_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			back={formColor[theme]}
			b_color={borderColor[theme]}
			color={fontColor[theme]}
		>
			<_Header b_color={borderColor[theme]}>
				<_Title>{t('addAccount')}</_Title>
				<IconButton color={iconColor[theme]} onClick={closeModal}>
					{closeIconSmall}
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<_Item>
					<Input_ title={t('identity')} flex={1}>
						<_LongInput
							back={inputColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={identity}
							onChange={onChangeIdentity}
							placeholder={t('place.identity')}
						/>
					</Input_>
					<Select_
						back={inputColor[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
						width={'178px'}
						title={t('auth')}
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
					/>
				</_Item>
				<_Item>
					<Input_ title={t('userName')} flex={1}>
						<_LongInput
							back={inputColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={username}
							onChange={onChangeUsername}
							placeholder={t('place.userName')}
						/>
					</Input_>
				</_Item>
				{authentication === 'Password' ? (
					<_Item>
						<Input_ title={t('password')} flex={1}>
							<_LongInput
								back={inputColor[theme]}
								color={fontColor[theme]}
								b_color={borderColor[theme]}
								type='password'
								value={password}
								onChange={onChangePassword}
								placeholder={t('place.password')}
							/>
						</Input_>
					</_Item>
				) : (
					<React.Fragment>
						<_Item>
							<Input_ title={t('private')} flex={1}>
								<_Label
									htmlFor={'add_server_form_type_file'}
									back={inputColor[theme]}
									color={fontColor[theme]}
									b_color={borderColor[theme]}
								>
									{keyFile}
									<_FileInput
										id={'add_server_form_type_file'}
										type='file'
										value={keyFile}
										onChange={onChangeKeyFile}
									/>
								</_Label>
							</Input_>
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
							<Input_ title={t('keyFilePassword')} flex={1}>
								<_LongInput
									back={inputColor[theme]}
									color={fontColor[theme]}
									b_color={borderColor[theme]}
									type='password'
									value={password}
									onChange={onChangePassword}
									placeholder={t('place.password')}
								/>
							</Input_>
						</_Item>
					</React.Fragment>
				)}
				<_Item>
					<Input_ title={t('note')} flex={1}>
						<_LongInput
							back={inputColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={note}
							onChange={onChangeNote}
							placeholder={t('place.note')}
						/>
					</Input_>
				</_Item>
			</_Form>
			<_Footer b_color={borderColor[theme]}>
				<BorderButton onClick={closeModal} color={fontColor[theme]}>
					{t('cancel')}
				</BorderButton>
				<PrimaryButton onClick={onSubmitForm}>
					{t('save')}
				</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default AddAccountForm;
