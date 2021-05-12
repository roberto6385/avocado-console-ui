import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Col, Form, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import useInput from '../../hooks/useInput';
import {MAIN_COLOR, SUB_COLOR} from '../../styles/global';
import {CLOSE_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {IconButton, PopupButton} from '../../styles/buttons';
import {FlexBox} from '../../styles/divs';
import {BaseModal} from '../../styles/modals';
import {MainHeader} from '../../styles/cards';
import {BaseSpan} from '../../styles/texts';

const AddAccountForm = () => {
	const dispatch = useDispatch();
	const {server} = useSelector((state) => state.common);
	const {account_form_popup} = useSelector((state) => state.popup);

	const [
		authentication,
		onChangeAuthentication,
		setAuthentication,
	] = useInput('Password');
	const [identity, onChangeIdentity, setIdentity] = useInput('');
	const [username, onChangeUsername, setUsername] = useInput('');
	const [key, onChangeKey] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [note, onChangeNote, setNote] = useInput('');

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			// ws.onerror = () => {
			// 	dispatch({type: OPEN_ALERT_POPUP, data: 'invalid_server'});
			// };
		},
		[identity, password, dispatch, account_form_popup],
	);

	const onClickCloseForm = useCallback(() => {
		dispatch({type: CLOSE_ADD_ACCOUT_FORM_POPUP});
	}, []);

	// useEffect(() => {
	// 	if (account_form_popup.open) {
	// 		if (account_form_popup.type === 'add') {
	// 			setIdentity('Test');
	// 			setAuthentication('Password');
	// 			setPassword('Netand141)');
	// 		} else {
	// 			const data = server.find((v) => v.id === account_form_popup.id);
	// 			setIdentity(data.name);
	// 			setAuthentication('Password');
	// 			setPassword(data.password);
	// 		}
	// 	}
	// }, [account_form_popup]);

	return (
		<BaseModal
			show={account_form_popup.open}
			onHide={onClickCloseForm}
			backdrop='static'
			width={'700px'}
		>
			<MainHeader justify={'space-between'}>
				<BaseSpan padding={'0px 8px'}>Add Account</BaseSpan>
				<IconButton className={'right'}>
					<FaTimes onClick={onClickCloseForm} />
				</IconButton>
			</MainHeader>
			<Modal.Body>
				<Form onSubmit={onSubmitForm}>
					<Form.Row>
						<Form.Label column sm={2}>
							Identity
						</Form.Label>
						<Col sm={4}>
							<Form.Control
								onChange={onChangeIdentity}
								value={identity}
								type='text'
								placeholder='temp Account'
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
						<>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control
									value={username}
									onChange={onChangeUsername}
									type='text'
									placeholder='Username'
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									value={password}
									onChange={onChangePassword}
									type='password'
									placeholder='Login Password'
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Note</Form.Label>
								<Form.Control
									value={note}
									onChange={onChangeNote}
									type='text'
									placeholder='Note'
								/>
							</Form.Group>
						</>
					) : (
						<>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control
									value={username}
									onChange={onChangeUsername}
									type='text'
									placeholder='Username'
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Private Key File</Form.Label>
								<Form.File
									value={key}
									onChange={onChangeKey}
									label='Private Key File'
									custom
								/>
							</Form.Group>

							<Form.Group>
								<Form.Label>Key File Password</Form.Label>
								<Form.Control
									value={password}
									onChange={onChangePassword}
									type='password'
									placeholder='Key File Password'
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Note</Form.Label>
								<Form.Control
									value={note}
									onChange={onChangeNote}
									type='text'
									placeholder='Note'
								/>
							</Form.Group>
						</>
					)}

					<FlexBox justify={'center'}>
						<PopupButton
							onClick={onClickCloseForm}
							back={SUB_COLOR}
						>
							Cancel
						</PopupButton>
						<PopupButton type='submit' back={MAIN_COLOR}>
							Save
						</PopupButton>
					</FlexBox>
				</Form>
			</Modal.Body>
		</BaseModal>
	);
};

export default AddAccountForm;
