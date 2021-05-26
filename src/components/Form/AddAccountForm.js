import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../../hooks/useInput';
import {CLOSE_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {ACCOUT_CONTROL_ID, SAVE_ACCOUT} from '../../reducers/common';
import styled from 'styled-components';
import Modal from 'react-modal';

import {IoCloseOutline} from 'react-icons/all';
import Input_ from '../RecycleComponents/Input_';
import Select_ from '../RecycleComponents/Select_';
import {
	ACCOUNT_BUTTON_WIDTH,
	AVOCADO_FONTSIZE,
	BorderButton,
	BORDER_COLOR,
	FOLDER_HEIGHT,
	ICON_DARK_COLOR,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
	SecondaryButtonGreen,
} from '../../styles/global';

const _Modal = styled(Modal)`
	border: 1px solid ${BORDER_COLOR};
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	background: white;
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
	border: 1px solid ${BORDER_COLOR};
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
`;

const _Label = styled.label`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
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
	border-bottom: 1px solid ${BORDER_COLOR};
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
	border-top: 1px solid ${BORDER_COLOR};
`;

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${AVOCADO_FONTSIZE};
	padding: 18px 8px 12px 8px;
`;

const AddAccountForm = () => {
	const dispatch = useDispatch();
	const {account, accountListControlId, currentResourceListKey} = useSelector(
		(state) => state.common,
	);
	const {account_form_popup} = useSelector((state) => state.popup);

	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
	const [identity, onChangeIdentity, setIdentity] = useInput('Avocado');
	const [username, onChangeUsername, setUsername] = useInput('root');
	const [keyFile, onChangeKeyFile] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('Netand141)');
	const [note, onChangeNote] = useInput('');

	const authentication_options = [
		{value: 'Password', label: 'Password'},
		{value: 'KeyFile', label: 'Key File'},
	];

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			if (authentication === 'Password') {
				if (identity !== '' && username !== '' && password !== '') {
					dispatch({
						type: SAVE_ACCOUT,
						payload: {
							identity,
							username,
							type: 'password',
							key: currentResourceListKey,
						},
					});
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
		[identity, password, dispatch, account_form_popup],
	);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ADD_ACCOUT_FORM_POPUP});
		dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
	}, []);

	useEffect(() => {
		if (accountListControlId !== null) {
			if (account_form_popup.open) {
				const item = account
					.slice()
					.find((item) => item.id === accountListControlId);
				console.log(item);
				if (item) {
					setAuthentication(
						item.type === 'password' ? 'Password' : 'Key file',
					);
					setIdentity(item.name || '');
					setUsername(item.username || '');
				}
			}
		} else {
			setAuthentication('Password');
			setIdentity('');
			setUsername('');
			setPassword('');
		}
	}, [account_form_popup.open, accountListControlId]);

	// useEffect(() => {
	// 	if (account_form_popup.open) {
	// 		if (account_form_popup.type === 'add') {
	// 			setIdentity('Test');
	// 			setAuthentication('Password');
	// 			setPassword('Netand141)');
	// 		} else {
	// 			const data = server.find((v) => v.id === account_form_popup.id);
	// 			setIdentity(data.name);
	// 			setAuthentication('Password');
	// 			setPassword(data.password);
	// 		}
	// 	}
	// }, [account_form_popup]);

	return (
		<_Modal
			isOpen={account_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_Title>Add Account</_Title>
				<IconButton color={ICON_DARK_COLOR} onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<_Item>
					<Input_ title={'Identity'} flex={1}>
						<_LongInput
							value={identity}
							onChange={onChangeIdentity}
							placeholder={'temp Account'}
						/>
					</Input_>
					<Select_
						width={'178px'}
						title='Authentication'
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
					/>
				</_Item>
				<_Item>
					<Input_ title={'Username'} flex={1}>
						<_LongInput
							value={username}
							onChange={onChangeUsername}
							placeholder={'Username'}
						/>
					</Input_>
				</_Item>
				{authentication === 'Password' ? (
					<_Item>
						<Input_ title={'Password'} flex={1}>
							<_LongInput
								type='password'
								value={password}
								onChange={onChangePassword}
								placeholder={'Password'}
							/>
						</Input_>
					</_Item>
				) : (
					<React.Fragment>
						<_Item>
							<Input_ title={'Private Key File'} flex={1}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<_FileInput
										id={'add_server_form_type_file'}
										type='file'
										value={keyFile}
										onChange={onChangeKeyFile}
										placeholder={'Key File'}
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
								Browse
							</_BrowseButton>
						</_Item>

						<_Item>
							<Input_ title={'Key File Password'} flex={1}>
								<_LongInput
									type='password'
									value={password}
									onChange={onChangePassword}
									placeholder={'Password'}
								/>
							</Input_>
						</_Item>
					</React.Fragment>
				)}
				<_Item>
					<Input_ title={'Note'} flex={1}>
						<_LongInput
							value={note}
							onChange={onChangeNote}
							placeholder={'Note'}
						/>
					</Input_>
				</_Item>
			</_Form>
			<_Footer>
				<BorderButton onClick={closeModal}>Cancel</BorderButton>
				<PrimaryButton onClick={onSubmitForm}>Save</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default AddAccountForm;
