import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button, Col, Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {OPEN_TAB, SAVE_SERVER} from '../reducers/common';
import useInput from '../hooks/useInput';
import {MAIN_COLOR, SUB_COLOR} from '../styles/global';
import styled from 'styled-components';
import SSH from '../dist/ssh_pb';

const FormRow = styled(Form.Row)`
	margin-bottom: 16px;
`;

const FormGroup = styled(Form.Group)`
	margin-bottom: 16px;
`;

const AddServerForm = () => {
	const dispatch = useDispatch();

	const [name, onChangeName, setName] = useInput('');
	// const [protocol, onChangeProtocol] = useInput("SSH2");
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput('');
	const [user, onChangeUser, setUser] = useInput('');
	// const [authentication, onChangeAuthentication] = useInput("Password");
	const [password, onChangePassword, setPassword] = useInput('');
	// const [note, onChangeNote] = useInput("");s

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const ws = new WebSocket('ws://' + host + ':8080/ws/ssh/protobuf');

			ws.binaryType = 'arraybuffer';

			ws.onopen = () => {
				// on connecting, do nothing but log it to the console
				console.log('SSH connected');

				const msgObj = new SSH.Message();
				msgObj.setType(SSH.Message.Types.REQUEST);

				const reqObj = new SSH.Request();
				reqObj.setType(SSH.Request.Types.CONNECT);

				const conObj = new SSH.ConnectRequest();
				conObj.setHost(host);
				conObj.setUser(user);
				conObj.setPassword(password);
				conObj.setPort(port);

				reqObj.setBody(conObj.serializeBinary());
				msgObj.setBody(reqObj.serializeBinary());

				ws.send(msgObj.serializeBinary());
			};

			ws.onerror = () => {
				console.log('Connection Error');

			};

			ws.onmessage = (evt) => {
				const message = SSH.Message.deserializeBinary(evt.data);

				if (message.getType() === SSH.Message.Types.RESPONSE) {
					const response = SSH.Response.deserializeBinary(
						message.getBody(),
					);

					if (response.getType() === SSH.Response.Types.CONNECT) {
						const conObj = SSH.ConnectResponse.deserializeBinary(
							response.getBody(),
						);

						if (conObj.getStatus() === 'connected') {
							const data = {
								name: name,
								host: host,
								user: user,
								password: password,
								port: port,
							};

							dispatch({
								type: SAVE_SERVER,
								data: data,
							});

							const msgObj = new SSH.Message();
							msgObj.setType(SSH.Message.Types.REQUEST);

							const reqObj = new SSH.Request();
							reqObj.setType(SSH.Request.Types.DISCONNECT);

							const disObj = new SSH.DisconnectRequest();
							disObj.setUuid(conObj.getUuid());

							reqObj.setBody(disObj.serializeBinary());
							msgObj.setBody(reqObj.serializeBinary());

							ws.send(msgObj.serializeBinary());
						}
					}
					if (response.getType() === SSH.Response.Types.DISCONNECT) {
						console.log('DISCONNECTED');
					}
				}
			};

			// const data = {
			// 	name: name,
			// 	host: host,
			// 	user: user,
			// 	password: password,
			// 	port: port,
			// };
			//
			// dispatch({
			// 	type: SAVE_SERVER,
			// 	data: data,
			// });

			document.getElementById('add-server-form').style.display = 'none';
		},
		[name, host, user, password, port, dispatch],
	);

	const onClickCloseForm = useCallback(() => {
		document.getElementById('add-server-form').style.display = 'none';
		setName('');
		setHost('');
		setPort('');
		setUser('');
		setPassword('');
	}, []);

	return (
		<Card id='add-server-form'>
			<Card.Header as='h5'>
				Add Server
				<span className={'right'}>
					<FaTimes onClick={onClickCloseForm} />
				</span>
			</Card.Header>
			<Card.Body>
				<Form onSubmit={onSubmitForm}>
					<FormRow>
						<Form.Label column xs={2}>
							Name
						</Form.Label>
						<Col xs={4}>
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
								// onChange={onChangeProtocol}
								// value={protocol}
								defaultValue='SSH2'
							>
								<option value='SSH2'>SSH2</option>
								<option value='protocol2'>protocol2</option>
							</Form.Control>
						</Col>
					</FormRow>

					<FormRow>
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
								type='text'
								placeholder='Port'
								required
							/>
						</Col>
					</FormRow>

					<FormRow>
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
								// value={authentication}
								// onChange={onChangeAuthentication}
								defaultValue='Password'
							>
								<option>Password</option>
								<option>Key file</option>
							</Form.Control>
						</Col>
					</FormRow>
					<FormGroup>
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={onChangePassword}
							value={password}
							type='password'
							placeholder='Login Password'
							required
						/>
					</FormGroup>

					<FormGroup>
						<Form.Label>Note</Form.Label>
						<Form.Control
							// onChange={onChangeNote}
							// value={note}
							type='text'
							placeholder='Note'
						/>
					</FormGroup>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Button
							className={'add-server-button'}
							variant='primary'
							style={{
								width: '100px',
								marginRight: '20px',
								backgroundColor: SUB_COLOR,
								border: 'none',
							}}
							onClick={onClickCloseForm}
						>
							Cancel
						</Button>
						<Button
							className={'add-server-button'}
							variant='primary'
							type='submit'
							style={{
								width: '100px',
								backgroundColor: MAIN_COLOR,
								border: 'none',
							}}
						>
							Save
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AddServerForm;
