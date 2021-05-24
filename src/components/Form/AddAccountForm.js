import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../../hooks/useInput';
import {CLOSE_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {ACCOUT_CONTROL_ID, SAVE_ACCOUT} from '../../reducers/common';
import styled from 'styled-components';
import Modal from 'react-modal';
import {
	ACCOUNT_BUTTON_WIDTH,
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	Default_Button,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	Primary_Button,
} from '../../styles/global_design';
import {IoCloseOutline} from 'react-icons/all';
import Input_Container from '../container/Input_Container';
import Select_ from '../RecycleComponents/Select_';

const _Modal = styled(Modal)`
	border: 1px solid ${BORDER_COLOR};
	position: absolute;
	z-index: 5;
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

const Input = styled.input`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const BrowseButton = styled(Primary_Button)`
	margin-top: 8px;
`;

const LongInput = styled(Input)`
	width: 100%;
`;

const FileInput = styled.input`
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
	ailgn-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _Span = styled.span`
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
	padding: 18px 16px 29px 16px;
`;

const AddAccountForm = () => {
	const dispatch = useDispatch();
	const {account, accountListControlId} = useSelector(
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
				<_Span>Add Account</_Span>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<_Item>
					<Input_Container title={'Identity'}>
						<Input
							value={identity}
							onChange={onChangeIdentity}
							placeholder={'temp Account'}
						/>
					</Input_Container>
					<Select_
						title='Authentication'
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
					/>
				</_Item>
				<_Item>
					<Input_Container title={'Username'}>
						<LongInput
							value={username}
							onChange={onChangeUsername}
							placeholder={'Username'}
						/>
					</Input_Container>
				</_Item>
				{authentication === 'Password' ? (
					<_Item>
						<Input_Container title={'Password'}>
							<LongInput
								type='password'
								value={password}
								onChange={onChangePassword}
								placeholder={'Password'}
							/>
						</Input_Container>
					</_Item>
				) : (
					<React.Fragment>
						<_Item>
							<Input_Container title={'Private Key File'}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<FileInput
										id={'add_server_form_type_file'}
										type='file'
										value={keyFile}
										onChange={onChangeKeyFile}
										placeholder={'Key File'}
									/>
								</_Label>
							</Input_Container>
							<BrowseButton
								onClick={() =>
									document
										.getElementById(
											'add_server_form_type_file',
										)
										.click()
								}
							>
								Browse
							</BrowseButton>
						</_Item>

						<_Item>
							<Input_Container title={'Key File Password'}>
								<LongInput
									type='password'
									value={password}
									onChange={onChangePassword}
									placeholder={'Password'}
								/>
							</Input_Container>
						</_Item>
					</React.Fragment>
				)}
				<_Item>
					<Input_Container title={'Note'}>
						<LongInput
							value={note}
							onChange={onChangeNote}
							placeholder={'Note'}
						/>
					</Input_Container>
				</_Item>
				<button
					type='submit'
					id={'add_account_form_submit_button'}
					style={{display: 'none'}}
				/>
			</_Form>
			<_Footer>
				<Default_Button onClick={closeModal}>Cancel</Default_Button>
				<Primary_Button
					onClick={() =>
						document
							.getElementById('add_account_form_submit_button')
							.click()
					}
				>
					Save
				</Primary_Button>
			</_Footer>
		</_Modal>
	);
};

export default AddAccountForm;
