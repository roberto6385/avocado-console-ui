import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SAVE_SERVER} from '../reducers/common';
import useInput from '../hooks/useInput';
import {Close, Connect, GetMessage} from '../dist/ssht_ws';
import {AddServerCard} from '../styles/common';
import AlertPopup from './AlertPopup';
import OneColForm from './AddServer/OneColForm';
import Button from './AddServer/Button';
import TwoColsOptionForm from './AddServer/TwoColsOptionForm';
import TwoColsForm from './AddServer/TwoColsForm';

const AddServerForm = () => {
	const dispatch = useDispatch();
	const [name, onChangeName, setName] = useInput('');
	const [protocol, onChangeProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput('');
	const [user, onChangeUser, setUser] = useInput('');
	const [authentication, onChangeAuthentication] = useInput('Password');
	const [password, onChangePassword, setPassword] = useInput('');
	const [note, onChangeNote, setNote] = useInput('');
	const [open, setOpen] = useState(false);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const ws = new WebSocket('ws://' + host + ':8080/ws/ssh/protobuf');
			ws.binaryType = 'arraybuffer';

			ws.onopen = () => {
				ws.send(Connect(host, user, password, port));
			};

			ws.onerror = () => {
				setOpen(true);
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
		setNote('');
	}, []);

	return (
		<div>
			<AddServerCard id='add-server-form'>
				<Card.Header as='h5'>
					Add Server
					<span className={'right'}>
						<FaTimes onClick={onClickCloseForm} />
					</span>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={onSubmitForm}>
						<TwoColsOptionForm
							label1='Name'
							placeholder1='Server Name'
							type1='text'
							value1={name}
							onChange1={onChangeName}
							required1={true}
							label2='Protocol'
							value2={protocol}
							onChange2={onChangeProtocol}
							options={['SSH2', 'protocol2']}
							required2={true}
						/>

						<TwoColsForm
							label1='Address'
							placeholder1='Host Name or IP'
							type1='text'
							value1={host}
							onChange1={onChangeHost}
							required1={true}
							label2='Port'
							placeholder2='Port'
							type2='number'
							value2={port}
							onChange2={onChangePort}
							required2={true}
						/>

						<TwoColsOptionForm
							label1='Username'
							placeholder1='Login Username'
							type1='text'
							value1={user}
							onChange1={onChangeUser}
							required1={true}
							label2='Authentication'
							value2={authentication}
							onChange2={onChangeAuthentication}
							options={['Password', 'Key file']}
							required2={true}
						/>

						<OneColForm
							label='Password'
							placeholder='Login Password'
							type='password'
							value={password}
							onChangeValue={onChangePassword}
							required={true}
						/>

						<OneColForm
							label='Note'
							placeholder='Note'
							type='text'
							value={note}
							onChangeValue={onChangeNote}
						/>
						<Button onClickCloseForm={onClickCloseForm} />
					</Form>
				</Card.Body>
			</AddServerCard>
			<AlertPopup
				keyword='Invalid Server'
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
};

export default AddServerForm;
