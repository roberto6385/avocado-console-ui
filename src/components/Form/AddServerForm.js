import React, {useCallback, useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	CHANGE_IDENTITY_CHECKED,
	CHANGE_PROTOCOL,
	EDIT_SERVER,
	SAVE_SERVER,
} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {
	CLOSE_ADD_SERVER_FORM_POPUP,
	OPEN_ALERT_POPUP,
} from '../../reducers/popup';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import Select_ from '../RecycleComponents/Select_';
import {closeIcon} from '../../icons/icons';
import {
	Form,
	Input,
	ModalFooter,
	ModalHeader,
	PopupModal,
} from '../../styles/default';
import {
	borderColor,
	fontColor,
	greyNormalButtonBackgroundColor,
} from '../../styles/color';
import {
	ClickableIconButton,
	PrimaryGreenButton,
	PrimaryGreyButton,
	SecondaryGreenButton,
} from '../../styles/button';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 598px;
`;

const _Input = styled(Input)`
	width: '178px';
`;

const _SecondaryGreenButton = styled(SecondaryGreenButton)`
	margin: 10px 8px 0px 8px;
`;

const _FileInput = styled.input`
	display: none;
	border: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _InputFiled = styled(InputFiled_)`
	margin-right: 16px;
`;

const _Label = styled.label`
	width: 100%;
	height: '34px'
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	margin: 0;
	cursor: pointer;
`;

const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const _SecondItem = styled.div`
	margin-left: 16px;
`;

const isValidHostname = (host) => {
	if (
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			host,
		)
	)
		return true;
	return false;
};

const duplicationTest = (server, name, host, port, protocol) => {
	const nameArray = server.filter((v) => name === v.name);
	//name 제외
	if (nameArray.length > 0) return false;
	//host, port, protocol
	const hostArray = server.filter((v) => host === v.host);
	for (let i of hostArray) {
		if (i.port === port && i.protocol === protocol) return false;
	}
	return true;
};

const AddServerForm = () => {
	const {t} = useTranslation('addServerForm');
	const dispatch = useDispatch();
	const {server, theme, clicked_server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const {add_server_form_popup} = useSelector(
		(state) => state.popup,
		shallowEqual,
	);
	// username, password는 이곳에서 가져와야 함.
	const correspondedIdentity = useMemo(
		() => identity.find((v) => v.key === clicked_server && v.checked),
		[identity, clicked_server],
	);

	const [name, onChangeName, setName] = useInput('');
	const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput(22);
	const [account, onChangeIdentity, setAccount] = useInput('');
	const [authentication, onChangeAuthentication, setAuthentication] =
		useInput('Password');
	const [keyFile, onChangeKeyFile, setKeyFile] = useInput('');
	const [username, onChangeUsername, setUsername] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [note, onChangeNote, setNote] = useInput('');
	const [identityList, onChangeIdentityList, setIdentityList] = useInput([]);

	const protocol_options = [
		{value: 'SSH2', label: 'SSH2'},
		{value: 'SFTP', label: 'SFTP'},
	];
	const authentication_options = [
		{value: 'Password', label: t('password')},
		{value: 'KeyFile', label: t('keyFile')},
	];

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ADD_SERVER_FORM_POPUP});
	}, [dispatch]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (add_server_form_popup.type === 'add') {
				if (!duplicationTest(server, name, host, port, protocol)) {
					dispatch({
						type: OPEN_ALERT_POPUP,
						data: 'server_duplicate',
					});
				} else if (!isValidHostname(host)) {
					dispatch({type: OPEN_ALERT_POPUP, data: 'invalid_server'});
				} else {
					const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
					ws.binaryType = 'arraybuffer';

					ws.onerror = () => {
						dispatch({
							type: OPEN_ALERT_POPUP,
							data: 'invalid_server',
						});
					};

					ws.onopen = () => {
						ssht_ws_request({
							keyword: 'SendConnect',
							ws: ws,
							data: {
								token: userTicket,
								host: host,
								user: username,
								password: password,
								port: port,
							},
						});
					};

					ws.onmessage = (evt) => {
						const message = GetMessage(evt.data);
						console.log(message);
						if (message.type === 'CONNECT') {
							ssht_ws_request({
								keyword: 'SendDisconnect',
								ws: ws,
							});
							const newData = {
								name: name,
								host: host,
								user: username,
								protocol: protocol,
								password: password,
								port: port,
								auth: authentication,
							};
							if (add_server_form_popup.type === 'add')
								dispatch({
									type: SAVE_SERVER,
									data: newData,
								});
							else if (add_server_form_popup.type === 'edit')
								dispatch({
									type: EDIT_SERVER,
									data: {
										id: add_server_form_popup.id,
										data: newData,
									},
								});
						} else if (message.type === 'DISCONNECT') {
							dispatch({type: CLOSE_ADD_SERVER_FORM_POPUP});
						} else
							console.log('V AddServerForm onmessage: ', message);
					};
				}
			} else if (add_server_form_popup.type === 'edit') {
				const correspondedIdentityList = identity.filter(
					(v) => v.key === clicked_server,
				);
				const selectedIdentity = correspondedIdentityList.find(
					(v) => v.identityName === account,
				);

				if (
					correspondedIdentity !== selectedIdentity &&
					account !== ''
				) {
					dispatch({
						type: CHANGE_IDENTITY_CHECKED,
						payload: {
							prev: correspondedIdentity,
							next: selectedIdentity,
						},
					});
				}

				clicked_server &&
					dispatch({
						type: CHANGE_PROTOCOL,
						payload: {
							protocol,
							key: clicked_server,
						},
					});

				closeModal();
			}
		},
		[
			add_server_form_popup,
			server,
			name,
			host,
			port,
			protocol,
			dispatch,
			userTicket,
			username,
			password,
			authentication,
			identity,
			correspondedIdentity,
			account,
			clicked_server,
			closeModal,
		],
	);

	useEffect(() => {
		if (add_server_form_popup.open) {
			//add new server
			if (add_server_form_popup.type === 'add') {
				setName('');
				setProtocol('SSH2');
				setHost('');
				setPort(0);
				setAccount('');
				setIdentityList([]);
				setAuthentication('Password');
				setPassword('');
				setKeyFile('');
				setUsername('');
				setNote('');
				//edit exist server
			} else if (add_server_form_popup.type === 'edit') {
				const data = server.find(
					(v) => v.id === add_server_form_popup.id,
				);
				setName(data.name);
				setProtocol(data.protocol);
				setHost(data.host);
				setPort(data.port);
				setAccount(correspondedIdentity.identityName);
				setAuthentication(correspondedIdentity.type);
				setPassword(correspondedIdentity.password);
				// setIdentityList(
				// 	identity.slice().filter((v) => v.key === clicked_server),
				// );
				setKeyFile('');
				setUsername(correspondedIdentity.user);
				setNote('');
			}
		}
	}, [
		add_server_form_popup,
		correspondedIdentity,
		server,
		setAccount,
		setAuthentication,
		setHost,
		setIdentityList,
		setKeyFile,
		setName,
		setNote,
		setPassword,
		setPort,
		setProtocol,
		setUsername,
	]);

	useEffect(() => {
		const correspondedIdentityList = identity.filter(
			(v) => v.key === clicked_server,
		);
		const newArray = correspondedIdentityList.map((item) => {
			return {
				value: item.identityName,
				info: item,
				label: item.identityName,
			};
		});
		add_server_form_popup.type === 'edit' && setIdentityList(newArray);
	}, [clicked_server, add_server_form_popup, identity, setIdentityList]);

	useEffect(() => {
		const correspondedIdentityList = identity.filter(
			(v) => v.key === clicked_server,
		);
		const selectedIdentity = correspondedIdentityList.find(
			(v) => v.identityName === account,
		);

		if (selectedIdentity) {
			setUsername(selectedIdentity.user);
			setPassword(selectedIdentity.password);
			setAuthentication(selectedIdentity.type);
		}
	}, [
		account,
		identity,
		clicked_server,
		setUsername,
		setPassword,
		setAuthentication,
	]);

	return (
		<_PopupModal
			isOpen={add_server_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
			className={'hello'}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('addServer')}</div>
				<ClickableIconButton
					onClick={closeModal}
					color={fontColor[theme]}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<Form onSubmit={onSubmitForm}>
				<_ItemContainer>
					<_InputFiled title={t('name')} flex={1}>
						<Input
							theme_value={theme}
							type='text'
							value={name}
							// onChange={onChangeName}
							readOnly
							placeholder={t('place.name')}
						/>
					</_InputFiled>
					<_SecondItem>
						<Select_
							width={'178px'}
							title={t('protocol')}
							options={protocol_options}
							value={protocol}
							setValue={setProtocol}
							popup={true}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<_InputFiled title={t('address')} flex={1}>
						<Input
							theme_value={theme}
							type='text'
							value={host}
							// onChange={onChangeHost}
							readOnly
							placeholder={t('place.address')}
						/>
					</_InputFiled>
					<_SecondItem>
						<InputFiled_ title={t('port')}>
							<_Input
								theme_value={theme}
								type='number'
								value={port}
								// onChange={onChangePort}
								readOnly
								placeholder={t('place.port')}
							/>
						</InputFiled_>
					</_SecondItem>
				</_ItemContainer>

				<_ItemContainer>
					<Select_
						title={t('identity')}
						flex={1}
						options={identityList}
						value={account}
						setValue={setAccount}
						popup={true}
					/>
					<_SecondItem>
						<Select_
							width={'178px'}
							title={t('auth')}
							options={authentication_options}
							value={authentication}
							setValue={setAuthentication}
							disabled={true}
							popup={true}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<InputFiled_ title={t('userName')} flex={1}>
						<Input
							theme_value={theme}
							type='text'
							value={username}
							// onChange={onChangeUsername}
							readOnly
							placeholder={t('place.userName')}
						/>
					</InputFiled_>
				</_ItemContainer>
				{authentication === 'Password' ? (
					<_ItemContainer>
						<InputFiled_ title={t('password')} flex={1}>
							<Input
								theme_value={theme}
								type='password'
								value={password}
								// onChange={onChangePassword}
								readOnly
								placeholder={t('place.password')}
							/>
						</InputFiled_>
					</_ItemContainer>
				) : (
					<React.Fragment>
						<_ItemContainer>
							<InputFiled_ title={t('private')} flex={1}>
								<_Label
									htmlFor={'add_server_form_type_file'}
									back={
										greyNormalButtonBackgroundColor[theme]
									}
									color={fontColor[theme]}
									b_color={borderColor[theme]}
								>
									{keyFile}
									<_FileInput
										type='file'
										id={'add_server_form_type_file'}
										value={keyFile}
										// onChange={onChangeKeyFile}
										readOnly
										placeholder={t('keyFile')}
									/>
								</_Label>
							</InputFiled_>
							<_SecondaryGreenButton
								theme_value={theme}
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
							</_SecondaryGreenButton>
						</_ItemContainer>

						<_ItemContainer>
							<InputFiled_ title={t('keyFilePassword')} flex={1}>
								<Input
									theme_value={theme}
									type='password'
									value={password}
									// onChange={onChangePassword}
									readOnly
									placeholder={t('place.password')}
								/>
							</InputFiled_>
						</_ItemContainer>
					</React.Fragment>
				)}
				<_ItemContainer>
					<InputFiled_ title={t('note')} flex={1}>
						<Input
							theme_value={theme}
							type='text'
							value={note}
							// onChange={onChangeNote}
							readOnly
							placeholder={t('place.note')}
						/>
					</InputFiled_>
				</_ItemContainer>
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

export default AddServerForm;
