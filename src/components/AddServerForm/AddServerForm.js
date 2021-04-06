import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SAVE_SERVER} from '../../reducers/common';
import useInput from '../../hooks/useInput';
import {GetMessage} from '../../ws/ssht_ws_logic';
import {AddServerModal, IconButton} from '../../styles/common';
import AlertPopup from '../AlertPopup';
import OneColForm from './OneColForm';
import Button from './Button';
import TwoColsOptionForm from './TwoColsOptionForm';
import TwoColsForm from './TwoColsForm';
import OneColButtonForm from './OneColButtonForm';
import * as PropTypes from 'prop-types';
import {ssht_ws_request} from '../../ws/ssht_ws_request';

const AddServerForm = ({showForm, setShowForm}) => {
	const dispatch = useDispatch();
	const {me} = useSelector((state) => state.common);

	const [name, onChangeName, setName] = useInput('Test');
	const [protocol, setProtocol] = useState('SSH2');
	const [host, onChangeHost, setHost] = useInput('211.253.10.9');
	const [port, onChangePort, setPort] = useInput(10021);
	const [user, onChangeUser, setUser] = useInput('root');
	const [authentication, setAuthentication] = useState('Password');
	const [key, onChangeKey] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('Netand141)');
	const [note, onChangeNote, setNote] = useInput('');
	const [open, setOpen] = useState(false);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const ws = new WebSocket('ws://' + host + ':8081/ws/ssh');

			ws.binaryType = 'arraybuffer';

			ws.onerror = () => {
				setOpen(true);
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
				console.log(message);

				if (message.type === 'CONNECT') {
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
					ssht_ws_request({keyword: 'SendDisconnect', ws: ws});
				} else if (message.type === 'DISCONNECT') {
					setShowForm(false);
				} else console.log('V AddServerForm onmessage: ', message);
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
