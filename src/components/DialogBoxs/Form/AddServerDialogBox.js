import React, {useCallback, useEffect, useMemo} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {
	CHANGE_IDENTITY_CHECKED,
	CHANGE_PROTOCOL,
} from '../../../reducers/common';
import useInput from '../../../hooks/useInput';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import ComboBox_ from '../../RecycleComponents/ComboBox_';
import {closeIcon} from '../../../icons/icons';
import {
	NormalBorderButton,
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {IconButton} from '../../../styles/components/icon';
import {
	DialogBox,
	ModalFooter,
	ModalHeader,
} from '../../../styles/components/disalogBox';
import {Input} from '../../../styles/components/input';
import {Form} from '../../../styles/components/form';

const _PopupModal = styled(DialogBox)`
	z-index: 5;
	width: 598px;
`;

const _Input = styled(Input)`
	width: 178px;
`;

const _SecondaryGreenButton = styled(NormalBorderButton)`
	margin: 10px 8px 0px 8px;
`;

const _FileInput = styled.input`
	display: none;
	border: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
`;

const _InputFiled = styled(TextBoxField_)`
	margin-right: 16px;
`;

const _Label = styled.label`
	width: 100%;
	height: '34px'
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid 	${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	margin: 0;
	cursor: pointer;
`;

const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const _SecondItem = styled.div`
	margin-left: 16px;
`;

const AddServerDialogBox = () => {
	const {t} = useTranslation('addServerForm');
	const dispatch = useDispatch();
	const {server, clicked_server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {form} = useSelector(dialogBoxSelector.all);
	// username, password는 이곳에서 가져와야 함.
	const correspondedIdentity = useMemo(
		() => identity.find((v) => v.key === clicked_server && v.checked),
		[identity, clicked_server],
	);

	const [name, onChangeName, setName] = useInput('');
	const [protocol, onChangeProtocol, setProtocol] = useInput('SSH2');
	const [host, onChangeHost, setHost] = useInput('');
	const [port, onChangePort, setPort] = useInput(22);
	const [account, onChangeIdentity, setAccount] = useInput('');
	const [authentication, onChangeAuthentication, setAuthentication] =
		useInput('Password');
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

	const onClickCloseDialog = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			const correspondedIdentityList = identity.filter(
				(v) => v.key === clicked_server,
			);
			const selectedIdentity = correspondedIdentityList.find(
				(v) => v.identity_name === account,
			);

			if (correspondedIdentity !== selectedIdentity && account !== '') {
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

			onClickCloseDialog();
		},
		[
			protocol,
			dispatch,
			identity,
			correspondedIdentity,
			account,
			clicked_server,
			onClickCloseDialog,
		],
	);

	useEffect(() => {
		if (form.open && form.key === 'server') {
			//add new server
			console.log(server);
			const data = server.find((v) => v.id === form.id);
			console.log(data);

			setName(data.name);
			setProtocol(data.protocol);
			setHost(data.host);
			setPort(data.port);
			setAccount(correspondedIdentity.identity_name);
			setAuthentication(correspondedIdentity.type);
			setPassword(correspondedIdentity.password);
			// setIdentityList(
			// 	identity.slice().filter((v) => v.key === clicked_server),
			// );
			setKeyFile('');
			setUsername(correspondedIdentity.user);
			setNote('');
		}
	}, [
		server,
		correspondedIdentity,
		setAccount,
		setAuthentication,
		setHost,
		setIdentityList,
		setKeyFile,
		setName,
		setNote,
		setPassword,
		setPort,
		setProtocol,
		setUsername,
		form,
	]);

	useEffect(() => {
		const correspondedIdentityList = identity.filter(
			(v) => v.key === clicked_server,
		);
		const newArray = correspondedIdentityList.map((item) => {
			return {
				value: item.identity_name,
				info: item,
				label: item.identity_name,
			};
		});
		setIdentityList(newArray);
	}, [clicked_server, server, identity, setIdentityList]);

	useEffect(() => {
		const correspondedIdentityList = identity.filter(
			(v) => v.key === clicked_server,
		);
		const selectedIdentity = correspondedIdentityList.find(
			(v) => v.identity_name === account,
		);

		if (selectedIdentity) {
			setUsername(selectedIdentity.user);
			setPassword(selectedIdentity.password);
			setAuthentication(selectedIdentity.type);
		}
	}, [
		account,
		identity,
		clicked_server,
		setUsername,
		setPassword,
		setAuthentication,
	]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'server'}
			onRequestClose={onClickCloseDialog}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			className={'hello'}
		>
			<ModalHeader>
				<div>{t('addServer')}</div>
				<IconButton
					onClick={onClickCloseDialog}
					btype={'font'}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<Form onSubmit={onSubmitForm}>
				<_ItemContainer>
					<_InputFiled title={t('name')} flex={1}>
						<Input
							type='text'
							value={name}
							// onChange={onChangeName}
							readOnly
							placeholder={t('place.name')}
						/>
					</_InputFiled>
					<_SecondItem>
						<ComboBox_
							width={'178px'}
							title={t('protocol')}
							options={protocol_options}
							value={protocol}
							setValue={setProtocol}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<_InputFiled title={t('address')} flex={1}>
						<Input
							type='text'
							value={host}
							// onChange={onChangeHost}
							readOnly
							placeholder={t('place.address')}
						/>
					</_InputFiled>
					<_SecondItem>
						<TextBoxField_ title={t('port')}>
							<_Input
								width={'178px'}
								type='number'
								value={port}
								// onChange={onChangePort}
								readOnly
								placeholder={t('place.port')}
							/>
						</TextBoxField_>
					</_SecondItem>
				</_ItemContainer>

				<_ItemContainer>
					<ComboBox_
						title={t('identity')}
						flex={1}
						options={identityList}
						value={account}
						setValue={setAccount}
					/>
					<_SecondItem>
						<ComboBox_
							width={'178px'}
							title={t('auth')}
							options={authentication_options}
							value={authentication}
							setValue={setAuthentication}
							disabled={true}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<TextBoxField_ title={t('userName')} flex={1}>
						<Input
							type='text'
							value={username}
							// onChange={onChangeUsername}
							readOnly
							placeholder={t('place.userName')}
						/>
					</TextBoxField_>
				</_ItemContainer>
				{authentication === 'Password' ? (
					<_ItemContainer>
						<TextBoxField_ title={t('password')} flex={1}>
							<Input
								type='password'
								value={password}
								// onChange={onChangePassword}
								readOnly
								placeholder={t('place.password')}
							/>
						</TextBoxField_>
					</_ItemContainer>
				) : (
					<React.Fragment>
						<_ItemContainer>
							<TextBoxField_ title={t('private')} flex={1}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<_FileInput
										type='file'
										id={'add_server_form_type_file'}
										value={keyFile}
										// onChange={onChangeKeyFile}
										readOnly
										placeholder={t('keyFile')}
									/>
								</_Label>
							</TextBoxField_>
							<_SecondaryGreenButton
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
						</_ItemContainer>

						<_ItemContainer>
							<TextBoxField_
								title={t('keyFilePassword')}
								flex={1}
							>
								<Input
									type='password'
									value={password}
									// onChange={onChangePassword}
									readOnly
									placeholder={t('place.password')}
								/>
							</TextBoxField_>
						</_ItemContainer>
					</React.Fragment>
				)}
				<_ItemContainer>
					<TextBoxField_ title={t('note')} flex={1}>
						<Input
							type='text'
							value={note}
							// onChange={onChangeNote}
							readOnly
							placeholder={t('place.note')}
						/>
					</TextBoxField_>
				</_ItemContainer>
			</Form>
			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialog}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitForm}>{t('save')}</NormalButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default AddServerDialogBox;
