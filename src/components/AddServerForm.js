import React, {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SAVE_SERVER} from '../reducers/common';
import useInput from '../hooks/useInput';
import {Close, Connect, GetMessage} from '../ws/ssh_ws';
import {AddServerModal, IconButton} from '../styles/common';
import AlertPopup from './AlertPopup';
import OneColForm from './AddServer/OneColForm';
import Button from './AddServer/Button';
import TwoColsOptionForm from './AddServer/TwoColsOptionForm';
import TwoColsForm from './AddServer/TwoColsForm';
import OneColButtonForm from './AddServer/OneColButtonForm';
import * as PropTypes from 'prop-types';

const AddServerForm = ({showForm, setShowForm}) => {
	const dispatch = useDispatch();
	const [name, onChangeName, setName] = useInput('');
	const [protocol, setProtocol] = useState('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput('');
	const [user, onChangeUser, setUser] = useInput('');
	const [authentication, setAuthentication] = useState('Password');
	const [key, onChangeKey] = useInput('');
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
		setShowForm(false);
		setName('');
		setProtocol('SSH2');
		setHost('');
		setPort('');
		setUser('');
		setAuthentication('Password');
		setPassword('');
		setNote('');
	}, []);

	return (
		<div>
			<AddServerModal
				show={showForm}
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
						<TwoColsOptionForm
							keyword='name_protocol'
							value1={name}
							onChange1={onChangeName}
							value2={protocol}
							setValue2={setProtocol}
						/>
						<TwoColsForm
							keyword='address_port'
							value1={host}
							onChange1={onChangeHost}
							value2={port}
							onChange2={onChangePort}
						/>
						<TwoColsOptionForm
							keyword='user_auth'
							value1={user}
							onChange1={onChangeUser}
							value2={authentication}
							setValue2={setAuthentication}
						/>
						{authentication === 'Password' ? (
							<OneColForm
								keyword='password'
								value={password}
								onChangeValue={onChangePassword}
							/>
						) : (
							<div>
								<OneColButtonForm
									onChangeValue={onChangeKey}
									keyword={'key'}
									value={key}
								/>
								<OneColForm
									keyword='key_password'
									value={password}
									onChangeValue={onChangePassword}
								/>
							</div>
						)}

						<OneColForm
							keyword='note'
							value={note}
							onChangeValue={onChangeNote}
						/>

						<Button onClickCloseForm={onClickCloseForm} />
					</Form>
				</Modal.Body>
			</AddServerModal>
			<AlertPopup
				keyword='invalid_server'
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
};

AddServerForm.propTypes = {
	showForm: PropTypes.bool.isRequired,
	setShowForm: PropTypes.func.isRequired,
};

export default AddServerForm;
