import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';
import * as PropTypes from 'prop-types';

import {EDIT_SERVER, SAVE_SERVER} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {
	AddServerButtonContainer,
	AddServerModal,
	IconButton,
	PopupButton,
} from '../../styles/common';
import AlertPopup from '../Popup/AlertPopup';
import {ssht_ws_request} from '../../ws/ssht_ws_request';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';

const AddServerForm = ({open, setOpen, type, id}) => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const {me} = useSelector((state) => state.user);

	const [name, onChangeName, setName] = useInput('Test');
	const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('211.253.10.9');
	const [port, onChangePort, setPort] = useInput(10021);
	const [user, onChangeUser, setUser] = useInput('root');
	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
	const [key, onChangeKey] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('Netand141)');
	const [note, onChangeNote, setNote] = useInput('');
	const [openAlert, setOpenAlert] = useState(false);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const ws = new WebSocket('ws://' + host + ':8081/ws/ssh');

			ws.binaryType = 'arraybuffer';

			ws.onerror = () => {
				setOpenAlert(true);
			};

			ws.onopen = () => {
				ssht_ws_request({
					keyword: 'SendConnect',
					ws: ws,
					data: {
						token: me.token,
						host: host,
						user: user,
						password: password,
						port: port,
					},
				});
			};

			ws.onmessage = (evt) => {
				const message = GetMessage(evt);

				if (message.type === 'CONNECT') {
					ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
					const newData = {
						name: name,
						host: host,
						user: user,
						password: password,
						port: port,
					};
					if (type === 'add')
						dispatch({
							type: SAVE_SERVER,
							data: newData,
						});
					else if (type === 'edit')
						dispatch({
							type: EDIT_SERVER,
							data: {
								id: id,
								data: newData,
							},
						});
				} else if (message.type === 'DISCONNECT') {
					setOpen(false);
				} else console.log('V AddServerForm onmessage: ', message);
			};
		},
		[name, host, user, password, port, dispatch],
	);

	const onClickCloseForm = useCallback(() => {
		setOpen(false);
		if (type === 'add') {
			// setName('');
			// setProtocol('SSH2');
			// setHost('');
			// setPort('');
			// setUser('');
			// setAuthentication('Password');
			// setPassword('');
			// setNote('');
		} else {
			const data = server.find((v) => v.id === id);
			setName(data.name);
			setProtocol('SSH2');
			setHost(data.host);
			setPort(data.port);
			setUser(data.user);
			setAuthentication('Password');
			setPassword(data.password);
		}
	}, []);

	useEffect(() => {
		if (type === 'edit') {
			const data = server.find((v) => v.id === id);
			setName(data.name);
			// setProtocol('SSH2');
			setHost(data.host);
			setPort(data.port);
			setUser(data.user);
			// setAuthentication('Password');
			setPassword(data.password);
		}
	}, [type, id]);

	return (
		<>
			<AddServerModal
				show={open}
				onHide={onClickCloseForm}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header as='h5'>
					Add Server
					<IconButton className={'right'}>
						<FaTimes onClick={onClickCloseForm} />
					</IconButton>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={onSubmitForm}>
						<Form.Row className={'add-server-form-row'}>
							<Form.Label column sm={2}>
								Name
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									onChange={onChangeName}
									value={name}
									type='text'
									placeholder='Server Name'
									required
								/>
							</Col>
							<Col xs={1} />
							<Form.Label column sm={2}>
								Protocol
							</Form.Label>
							<Col sm={3}>
								<Form.Control
									as='select'
									value={protocol}
									onChange={onChangeProtocol}
									required
								>
									<option key='SSH2' value='SSH2'>
										SSH2
									</option>
									<option key='protocol2' value='protocol2'>
										protocol2
									</option>
								</Form.Control>
							</Col>
						</Form.Row>

						<Form.Row className={'add-server-form-row'}>
							<Form.Label column sm={2}>
								Address
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									onChange={onChangeHost}
									value={host}
									type='text'
									placeholder='Host Name or IP'
									required
								/>
							</Col>
							<Col xs={1} />
							<Form.Label column sm={2}>
								Port
							</Form.Label>
							<Col sm={3}>
								<Form.Control
									onChange={onChangePort}
									value={port}
									type='number'
									placeholder='Port'
									required
								/>
							</Col>
						</Form.Row>

						<Form.Row className={'add-server-form-row'}>
							<Form.Label column sm={2}>
								Username
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									onChange={onChangeUser}
									value={user}
									type='text'
									placeholder='Login Username'
									required
								/>
							</Col>
							<Col xs={1} />
							<Form.Label column sm={2}>
								Authentication
							</Form.Label>
							<Col sm={3}>
								<Form.Control
									as='select'
									value={authentication}
									onChange={onChangeAuthentication}
									required
								>
									<option value='Password'>Password</option>
									<option value='Key file'>Key file</option>
								</Form.Control>
							</Col>
						</Form.Row>

						{authentication === 'Password' ? (
							<Form.Group className={'add-server-form-row'}>
								<Form.Label>Password</Form.Label>
								<Form.Control
									value={password}
									onChange={onChangePassword}
									type='password'
									placeholder='password'
									required
								/>
							</Form.Group>
						) : (
							<div>
								<Form.Group className={'add-server-form-row'}>
									<Form.Label>Private Key File</Form.Label>
									<Form.File
										value={key}
										onChange={onChangeKey}
										label='Login Password'
										custom
									/>
								</Form.Group>

								<Form.Group className={'add-server-form-row'}>
									<Form.Label>Password</Form.Label>
									<Form.Control
										value={password}
										onChange={onChangePassword}
										type='password'
										placeholder='Key File Password'
										required
									/>
								</Form.Group>
							</div>
						)}

						<Form.Group className={'add-server-form-row'}>
							<Form.Label>Note</Form.Label>
							<Form.Control
								value={note}
								onChange={onChangeNote}
								type='text'
								placeholder='Note'
							/>
						</Form.Group>

						<AddServerButtonContainer>
							<PopupButton
								variant='default'
								onClick={onClickCloseForm}
								back={`${SUB_COLOR}`}
							>
								Cancel
							</PopupButton>
							<PopupButton
								variant='default'
								type='submit'
								back={`${MAIN_COLOR}`}
							>
								Save
							</PopupButton>
						</AddServerButtonContainer>
					</Form>
				</Modal.Body>
			</AddServerModal>
			<AlertPopup
				keyword='invalid_server'
				open={openAlert}
				setOpen={setOpenAlert}
			/>
		</>
	);
};

AddServerForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.number,
};

export default AddServerForm;
