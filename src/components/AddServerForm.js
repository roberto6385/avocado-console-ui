import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Button, Col, Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SAVE_SERVER} from '../reducers/common';
import useInput from '../hooks/useInput';
import {MAIN_COLOR, SUB_COLOR} from '../styles/global';

import {Close, Connect, GetMessage} from '../dist/SSHTWs';
import styled from 'styled-components';

const SaveButton = styled(Button)`
	background-color: ${MAIN_COLOR};
	&:hover {
		filter: brightness(85%);
		background-color: ${MAIN_COLOR};
	}
`;

const CancelButton = styled(Button)`
	margin-right: 20px;
	background-color: ${SUB_COLOR};
	&:hover {
		filter: brightness(85%);
		background-color: ${SUB_COLOR};
	}
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
	// const [note, onChangeNote] = useInput("");

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const ws = new WebSocket('ws://' + host + ':8080/ws/ssh/protobuf');
			ws.binaryType = 'arraybuffer';

			ws.onopen = () => {
				ws.send(Connect(host, user, password, port));
			};

			ws.onerror = (e) => {
				alert('입력한 소켓 정보가 잘못되었습니다. ');
				document.getElementById('add-server-form').style.display =
					'block';
			};

			ws.onmessage = (e) => {
				const result = GetMessage(e);
				switch (result.type) {
					case 'connected':
						dispatch({
							type: SAVE_SERVER,
							data: {
								name: name,
								host: host,
								user: user,
								password: password,
								port: port,
							},
						});

						ws.send(Close(result.uuid));
						break;
					case 'disconnected':
						document.getElementById(
							'add-server-form',
						).style.display = 'none';
						break;
					default:
						console.log('무시합시다: AddServerForm');
						break;
				}
			};
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
					<Form.Row className={'add-server-form-row'}>
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
								type='text'
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
								// value={authentication}
								// onChange={onChangeAuthentication}
								defaultValue='Password'
							>
								<option>Password</option>
								<option>Key file</option>
							</Form.Control>
						</Col>
					</Form.Row>
					<Form.Group className={'add-server-form-row'}>
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={onChangePassword}
							value={password}
							type='password'
							placeholder='Login Password'
							required
						/>
					</Form.Group>

					<Form.Group className={'add-server-form-row'}>
						<Form.Label>Note</Form.Label>
						<Form.Control
							// onChange={onChangeNote}
							// value={note}
							type='text'
							placeholder='Note'
						/>
					</Form.Group>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<CancelButton
							className={'add-server-button'}
							onClick={onClickCloseForm}
						>
							Cancel
						</CancelButton>
						<SaveButton
							className={'add-server-button'}
							type='submit'
						>
							Save
						</SaveButton>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default AddServerForm;
