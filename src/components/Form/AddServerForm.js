import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {EDIT_SERVER, SAVE_SERVER} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {
	CLOSE_ADD_SERVER_FORM_POPUP,
	OPEN_ALERT_POPUP,
} from '../../reducers/popup';
import Modal from 'react-modal';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	IconButton,
	FOLDER_HEIGHT,
	MAIN_HEIGHT,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
	ICON_DARK_COLOR,
	BorderButton,
	SecondaryButtonGreen,
} from '../../styles/global';

import {IoCloseOutline} from 'react-icons/all';
import styled from 'styled-components';
import Input_ from '../RecycleComponents/Input_';
import Select_ from '../RecycleComponents/Select_';
import {SERVER_FORM_INPUT_WIDTH} from '../../styles/global';

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
const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid ${BORDER_COLOR};
`;

const _Title = styled.div`
	line-height: ${FOLDER_HEIGHT};
`;

const _Input = styled.input`
	width: ${SERVER_FORM_INPUT_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const BrowseButton = styled(SecondaryButtonGreen)`
	margin: 10px 8px 0px 8px;
`;

const LongInput = styled(_Input)`
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

const _Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	font-size: ${AVOCADO_FONTSIZE};
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
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const {add_server_form_popup} = useSelector((state) => state.popup);

	const [name, onChangeName, setName] = useInput('');
	const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput();
	const [identity, onChangeIdentity, setIdentity] = useInput('root');
	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
	const [keyFile, onChangeKeyFile, setKeyFile] = useInput('');

	const [username, onChangeUsername, setUsername] = useInput('root');
	const [password, onChangePassword, setPassword] = useInput('Netand141)');
	const [note, onChangeNote, setNote] = useInput('');

	const protocol_options = [
		{value: 'SSH2', label: 'SSH2'},
		{value: 'SFTP', label: 'SFTP'},
	];
	const authentication_options = [
		{value: 'Password', label: 'Password'},
		{value: 'KeyFile', label: 'Key File'},
	];

	// user option은 reducer-common에서 account와 연결된다.
	// 현재는 디자인 작업을 위해 option을 별도로 생성했다.
	// options와 account의 저장 방식을 통일할 필요가 있다.
	const user_options = [
		{value: 'root', label: 'root'},
		{value: 'ctl', label: 'ctl'},
	];

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (!duplicationTest(server, name, host, port, protocol)) {
				dispatch({type: OPEN_ALERT_POPUP, data: 'server_duplicate'});
			} else if (!isValidHostname(host)) {
				dispatch({type: OPEN_ALERT_POPUP, data: 'invalid_server'});
			} else {
				const ws = new WebSocket(`ws://${host}:8081/ws/ssh`);
				ws.binaryType = 'arraybuffer';

				ws.onerror = () => {
					dispatch({type: OPEN_ALERT_POPUP, data: 'invalid_server'});
				};

				ws.onopen = () => {
					ssht_ws_request({
						keyword: 'SendConnect',
						ws: ws,
						data: {
							token: userTicket,
							host: host,
							user: identity,
							password: password,
							port: port,
						},
					});
				};

				ws.onmessage = (evt) => {
					const message = GetMessage(evt.data);
					console.log(message);
					if (message.type === 'CONNECT') {
						ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
						const newData = {
							name: name,
							host: host,
							user: identity,
							protocol: protocol,
							password: password,
							port: port,
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
					} else console.log('V AddServerForm onmessage: ', message);
				};
			}
		},
		[
			name,
			protocol,
			host,
			port,
			identity,
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
				setPort();
				setIdentity('root');
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
				setProtocol('SSH2');
				setHost(data.host);
				setPort(data.port);
				setIdentity(data.user);
				setAuthentication('Password');
				setPassword(data.password);
				setKeyFile('');
				setUsername('');
				setNote('');
			}
		}
	}, [add_server_form_popup]);

	return (
		<_Modal
			isOpen={add_server_form_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_Title>Add Server</_Title>
				<IconButton color={ICON_DARK_COLOR} onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			<_Form onSubmit={onSubmitForm}>
				<Item_Container>
					<Input_ title={'Name'} flex={1}>
						<LongInput
							type='text'
							value={name}
							onChange={onChangeName}
							placeholder={'Server Name'}
						/>
					</Input_>
					<Select_
						width={'178px'}
						title='Protocol'
						options={protocol_options}
						value={protocol}
						setValue={setProtocol}
					/>
				</Item_Container>
				<Item_Container>
					<Input_ title={'Address'} flex={1}>
						<LongInput
							type='text'
							value={host}
							onChange={onChangeHost}
							placeholder={'Host or IP'}
						/>
					</Input_>

					<Input_ title={'Port'}>
						<_Input
							type='number'
							value={port}
							onChange={onChangePort}
							placeholder={'Port'}
						/>
					</Input_>
				</Item_Container>
				<Item_Container>
					<Select_
						title='Identity'
						flex={1}
						options={user_options}
						value={identity}
						setValue={setIdentity}
					/>
					<Select_
						width={'178px'}
						title='Authentication'
						options={authentication_options}
						value={authentication}
						setValue={setAuthentication}
					/>
				</Item_Container>
				<Item_Container>
					<Input_ title={'Username'} flex={1}>
						<LongInput
							type='text'
							value={username}
							onChange={onChangeUsername}
							placeholder={'Username'}
						/>
					</Input_>
				</Item_Container>
				{authentication === 'Password' ? (
					<Item_Container>
						<Input_ title={'Password'} flex={1}>
							<LongInput
								type='password'
								value={password}
								onChange={onChangePassword}
								placeholder={'Password'}
							/>
						</Input_>
					</Item_Container>
				) : (
					<React.Fragment>
						<Item_Container>
							<Input_ title={'Private Key File'} flex={1}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<FileInput
										type='file'
										id={'add_server_form_type_file'}
										value={keyFile}
										onChange={onChangeKeyFile}
										placeholder={'Key File'}
									/>
								</_Label>
							</Input_>
							<BrowseButton
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
							</BrowseButton>
						</Item_Container>

						<Item_Container>
							<Input_ title={'Key File Password'} flex={1}>
								<LongInput
									type='password'
									value={password}
									onChange={onChangePassword}
									placeholder={'Password'}
								/>
							</Input_>
						</Item_Container>
					</React.Fragment>
				)}
				<Item_Container>
					<Input_ title={'Note'} flex={1}>
						<LongInput
							type='text'
							value={note}
							onChange={onChangeNote}
							placeholder={'Note'}
						/>
					</Input_>
				</Item_Container>
			</_Form>
			<_Footer>
				<BorderButton onClick={closeModal}>Cancel</BorderButton>
				<PrimaryButton onClick={onSubmitForm}>Save</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default AddServerForm;
