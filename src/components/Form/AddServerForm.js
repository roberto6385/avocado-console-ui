import React, {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
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
import {PATH_SEARCH_INPUT_HEIGHT} from '../../styles/global';

import styled from 'styled-components';
import Input_ from '../RecycleComponents/Input_';
import Select_ from '../RecycleComponents/Select_';
import {SERVER_FORM_INPUT_WIDTH} from '../../styles/global';
import {closeIconSmall} from '../../icons/icons';
import {FONT_14} from '../../styles/length';
import {
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	PopupModal,
	PrimaryGreenButton,
	PrimaryGreyButton,
	SecondaryGreenButton,
} from '../../styles/default';
import {
	borderColor,
	fontColor,
	greyBackgroundNormalButtonColor,
} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	z-index: 5;
	width: 598px;
`;

const _Input = styled.input`
	width: ${SERVER_FORM_INPUT_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _SecondaryGreenButton = styled(SecondaryGreenButton)`
	margin: 10px 8px 0px 8px;
`;

const LongInput = styled(_Input)`
	width: 100%;
`;

const FileInput = styled.input`
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

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${FONT_14};
	padding: 18px 8px 12px 8px;
`;
const Item_Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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
	);
	// username, password는 이곳에서 가져와야 함.
	const correspondedIdentity = useMemo(
		() => identity.find((v) => v.key === clicked_server && v.checked),
		[identity, clicked_server],
	);
	const {userTicket} = useSelector((state) => state.userTicket);
	const {add_server_form_popup} = useSelector((state) => state.popup);

	const [name, onChangeName, setName] = useInput('');
	const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput(22);
	const [account, onChangeIdentity, setAccount] = useInput('');
	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
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

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			console.log(add_server_form_popup.type);

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
			name,
			protocol,
			host,
			port,
			account,
			password,
			add_server_form_popup,
			userTicket,
		],
	);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ADD_SERVER_FORM_POPUP});
	}, [dispatch]);

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
	}, [add_server_form_popup]);

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
	}, [clicked_server, add_server_form_popup]);

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
	}, [account, identity, clicked_server]);

	return (
		<_PopupModal
			isOpen={add_server_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			themeValue={theme}
		>
			<ModalHeader themeValue={theme}>
				<div>{t('addServer')}</div>
				<ModalHeaderIconButton themeValue={theme} onClick={closeModal}>
					{closeIconSmall}
				</ModalHeaderIconButton>
			</ModalHeader>
			<_Form onSubmit={onSubmitForm}>
				<Item_Container>
					<Input_ title={t('name')} flex={1}>
						<LongInput
							back={greyBackgroundNormalButtonColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={name}
							// onChange={onChangeName}
							readOnly
							placeholder={t('place.name')}
						/>
					</Input_>
					<Select_
						width={'178px'}
						title={t('protocol')}
						options={protocol_options}
						value={protocol}
						setValue={setProtocol}
					/>
				</Item_Container>
				<Item_Container>
					<Input_ title={t('address')} flex={1}>
						<LongInput
							back={greyBackgroundNormalButtonColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={host}
							// onChange={onChangeHost}
							readOnly
							placeholder={t('place.address')}
						/>
					</Input_>

					<Input_ title={t('port')}>
						<_Input
							back={greyBackgroundNormalButtonColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='number'
							value={port}
							// onChange={onChangePort}
							readOnly
							placeholder={t('place.port')}
						/>
					</Input_>
				</Item_Container>
				<Item_Container>
					<Select_
						title={t('identity')}
						flex={1}
						options={identityList}
						value={account}
						setValue={setAccount}
					/>
					<Select_
						width={'178px'}
						title={t('auth')}
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
						disabled={true}
					/>
				</Item_Container>
				<Item_Container>
					<Input_ title={t('userName')} flex={1}>
						<LongInput
							back={greyBackgroundNormalButtonColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={username}
							// onChange={onChangeUsername}
							readOnly
							placeholder={t('place.userName')}
						/>
					</Input_>
				</Item_Container>
				{authentication === 'Password' ? (
					<Item_Container>
						<Input_ title={t('password')} flex={1}>
							<LongInput
								back={greyBackgroundNormalButtonColor[theme]}
								color={fontColor[theme]}
								b_color={borderColor[theme]}
								type='password'
								value={password}
								// onChange={onChangePassword}
								readOnly
								placeholder={t('place.password')}
							/>
						</Input_>
					</Item_Container>
				) : (
					<React.Fragment>
						<Item_Container>
							<Input_ title={t('private')} flex={1}>
								<_Label
									htmlFor={'add_server_form_type_file'}
									back={
										greyBackgroundNormalButtonColor[theme]
									}
									color={fontColor[theme]}
									b_color={borderColor[theme]}
								>
									{keyFile}
									<FileInput
										type='file'
										id={'add_server_form_type_file'}
										value={keyFile}
										// onChange={onChangeKeyFile}
										readOnly
										placeholder={t('keyFile')}
									/>
								</_Label>
							</Input_>
							<_SecondaryGreenButton
								themeValue={theme}
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
						</Item_Container>

						<Item_Container>
							<Input_ title={t('keyFilePassword')} flex={1}>
								<LongInput
									back={
										greyBackgroundNormalButtonColor[theme]
									}
									color={fontColor[theme]}
									b_color={borderColor[theme]}
									type='password'
									value={password}
									// onChange={onChangePassword}
									readOnly
									placeholder={t('place.password')}
								/>
							</Input_>
						</Item_Container>
					</React.Fragment>
				)}
				<Item_Container>
					<Input_ title={t('note')} flex={1}>
						<LongInput
							back={greyBackgroundNormalButtonColor[theme]}
							color={fontColor[theme]}
							b_color={borderColor[theme]}
							type='text'
							value={note}
							// onChange={onChangeNote}
							readOnly
							placeholder={t('place.note')}
						/>
					</Input_>
				</Item_Container>
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

export default AddServerForm;
