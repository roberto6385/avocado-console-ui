import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';
import * as PropTypes from 'prop-types';

import {EDIT_SERVER, SAVE_SERVER} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {AddServerModal, IconButton} from '../../styles/common';
import AlertPopup from '../AlertPopup';
import OneColForm from './OneColForm';
import Button from './Button';
import TwoColsOptionForm from './TwoColsOptionForm';
import TwoColsForm from './TwoColsForm';
import OneColButtonForm from './OneColButtonForm';
import {ssht_ws_request} from '../../ws/ssht_ws_request';

const AddServerForm = ({open, setOpen, type, id}) => {
	const dispatch = useDispatch();
	const {me, server} = useSelector((state) => state.common);
	const data = server.find((v) => v.id === id);

	const [name, onChangeName, setName] = useInput(
		type === 'edit' ? data.name : 'Test',
	);
	const [protocol, setProtocol] = useState(
		type === 'edit' ? data.name : 'SSH2',
	);
	const [host, onChangeHost, setHost] = useInput(
		type === 'edit' ? data.host : '211.253.10.9',
	);
	const [port, onChangePort, setPort] = useInput(
		type === 'edit' ? data.port : 10021,
	);
	const [user, onChangeUser, setUser] = useInput(
		type === 'edit' ? data.user : 'root',
	);
	const [authentication, setAuthentication] = useState('Password');
	const [key, onChangeKey] = useInput('');
	const [password, onChangePassword, setPassword] = useInput(
		type === 'edit' ? data.password : 'Netand141)',
	);
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
					if (type === 'add')
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
					else if (type === 'edit') {
						dispatch({
							type: EDIT_SERVER,
							data: {
								id: id,
								data: {
									name: name,
									host: host,
									user: user,
									password: password,
									port: port,
								},
							},
						});
					}
				} else if (message.type === 'DISCONNECT') {
					setOpen(false);
				} else console.log('V AddServerForm onmessage: ', message);
			};
		},
		[name, host, user, password, port, dispatch],
	);

	const onClickCloseForm = useCallback(() => {
		setOpen(false);
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
				open={openAlert}
				setOpen={setOpenAlert}
			/>
		</div>
	);
};

AddServerForm.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.number,
};

export default AddServerForm;
