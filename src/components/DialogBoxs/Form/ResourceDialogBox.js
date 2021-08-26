import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import ComboBox from '../../RecycleComponents/ComboBox';
import {closeIcon} from '../../../icons/icons';
import {
	NormalBorderButton,
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';
import {IconButton} from '../../../styles/components/icon';
import {
	DialogBox,
	DialogBoxFooter,
	DialogBoxHeader,
} from '../../../styles/components/disalogBox';

import {Form} from '../../../styles/components/form';
import {TextBox} from '../../../styles/components/textBox';
import TextBoxField from '../../RecycleComponents/TextBoxField';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';

const _PopupModal = styled(DialogBox)`
	z-index: 5;
	width: 598px;
`;

const _TextBox = styled(TextBox)`
	width: 178px;
`;

const _NormalBorderButton = styled(NormalBorderButton)`
	margin: 10px 8px 0px 8px;
`;

const _FileInput = styled.input`
	display: none;
	border: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
`;

const _TextBoxField = styled(TextBoxField)`
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

const ResourceDialogBox = () => {
	const {t} = useTranslation('resourceDialogBox');
	const dispatch = useDispatch();

	const {selectedResource, accounts, resources, computingSystemServicePorts} =
		useSelector(remoteResourceSelector.all);
	const {form} = useSelector(dialogBoxSelector.all);

	const [name, setName] = useState('');
	const [protocol, setProtocol] = useState('');
	const [host, setHost] = useState('');
	const [port, setPort] = useState('');
	const [id, setId] = useState('');
	const [authentication, setAuthentication] = useState('');
	const [keyFile, setKeyFile] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [note, setNote] = useState('');
	const [ids, setIds] = useState([]);

	const protocolOptions = [
		{value: 'SSH2', label: 'SSH2'},
		{value: 'SFTP', label: 'SFTP'},
	];
	const authenticationOptions = [
		{value: 'Password', label: t('password')},
		{value: 'KeyFile', label: t('keyFile')},
	];

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeForm());
	}, [dispatch]);

	const onSubmitAddServerForm = useCallback(
		(e) => {
			e.preventDefault();

			const defaultAccount = accounts.find(
				(v) => v.resourceId === selectedResource && v.isDefaultAccount,
			).id;
			const nextDefaultAccount = accounts.find(
				(v) => v.resourceId === selectedResource && v.name === id,
			).id;

			if (defaultAccount !== nextDefaultAccount) {
				dispatch(
					remoteResourceAction.setAccount({
						prev: defaultAccount,
						next: nextDefaultAccount,
					}),
				);
			}

			if (
				protocol !==
				computingSystemServicePorts.find(
					(v) => v.id === selectedResource,
				).protocol
			) {
				dispatch(
					remoteResourceAction.setProtocol({
						protocol: protocol,
						id: selectedResource,
					}),
				);
			}
			onClickCloseDialogBox();
		},
		[
			accounts,
			computingSystemServicePorts,
			dispatch,
			id,
			onClickCloseDialogBox,
			protocol,
			selectedResource,
		],
	);

	useEffect(() => {
		if (form.open && form.key === 'resource-properties') {
			const resource = resources.find((v) => v.id === selectedResource);
			const computingSystemServicePort = computingSystemServicePorts.find(
				(v) => v.id === selectedResource,
			);
			const account = accounts.find(
				(v) => v.resourceId === selectedResource && v.isDefaultAccount,
			);

			setName(resource.name);
			setProtocol(computingSystemServicePort.protocol);
			setHost(computingSystemServicePort.host);
			setPort(computingSystemServicePort.port);
			setId(account.name);
			setAuthentication(account.type);
			setPassword(account.password);
			setKeyFile('');
			setUsername(account.user);
			setNote('');
			setIds(
				accounts
					.filter((v) => v.resourceId === selectedResource)
					.map((v) => {
						return {
							value: v.name,
							info: v,
							label: v.name,
						};
					}),
			);
		}
	}, [
		accounts,
		computingSystemServicePorts,
		form,
		selectedResource,
		resources,
	]);

	return (
		<_PopupModal
			isOpen={form.open && form.key === 'resource-properties'}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('resouceProperties')}</div>
				<IconButton
					onClick={onClickCloseDialogBox}
					btype={'font'}
					size={'20px'}
					margin={'0px'}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<Form onSubmit={onSubmitAddServerForm}>
				<_ItemContainer>
					<_TextBoxField title={t('name')} flex={1}>
						<TextBox
							type='text'
							value={name}
							readOnly
							placeholder={t('placeholder.name')}
						/>
					</_TextBoxField>
					<_SecondItem>
						<ComboBox
							width={'178px'}
							title={t('protocol')}
							options={protocolOptions}
							value={protocol}
							setValue={setProtocol}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<_TextBoxField title={t('address')} flex={1}>
						<TextBox
							type='text'
							value={host}
							readOnly
							placeholder={t('placeholder.address')}
						/>
					</_TextBoxField>
					<_SecondItem>
						<TextBoxField title={t('port')}>
							<_TextBox
								width={'178px'}
								type='number'
								value={port}
								readOnly
								placeholder={t('placeholder.port')}
							/>
						</TextBoxField>
					</_SecondItem>
				</_ItemContainer>

				<_ItemContainer>
					<ComboBox
						title={t('identity')}
						flex={1}
						options={ids}
						value={id}
						setValue={setId}
					/>
					<_SecondItem>
						<ComboBox
							width={'178px'}
							title={t('auth')}
							options={authenticationOptions}
							value={authentication}
							setValue={setAuthentication}
							disabled={true}
						/>
					</_SecondItem>
				</_ItemContainer>
				<_ItemContainer>
					<TextBoxField title={t('userName')} flex={1}>
						<TextBox
							type='text'
							value={username}
							readOnly
							placeholder={t('placeholder.userName')}
						/>
					</TextBoxField>
				</_ItemContainer>
				{authentication === 'Password' ? (
					<_ItemContainer>
						<TextBoxField title={t('password')} flex={1}>
							<TextBox
								type='password'
								value={password}
								readOnly
								placeholder={t('placeholder.password')}
							/>
						</TextBoxField>
					</_ItemContainer>
				) : (
					<React.Fragment>
						<_ItemContainer>
							<TextBoxField title={t('private')} flex={1}>
								<_Label htmlFor={'add_server_form_type_file'}>
									{keyFile}
									<_FileInput
										type='file'
										id={'add_server_form_type_file'}
										value={keyFile}
										readOnly
										placeholder={t('keyFile')}
									/>
								</_Label>
							</TextBoxField>
							<_NormalBorderButton
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
							</_NormalBorderButton>
						</_ItemContainer>

						<_ItemContainer>
							<TextBoxField title={t('keyFilePassword')} flex={1}>
								<TextBox
									type='password'
									value={password}
									readOnly
									placeholder={t('placeholder.password')}
								/>
							</TextBoxField>
						</_ItemContainer>
					</React.Fragment>
				)}
				<_ItemContainer>
					<TextBoxField title={t('note')} flex={1}>
						<TextBox
							type='text'
							value={note}
							readOnly
							placeholder={t('placeholder.note')}
						/>
					</TextBoxField>
				</_ItemContainer>
			</Form>
			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={onSubmitAddServerForm}>
					{t('save')}
				</NormalButton>
			</DialogBoxFooter>
		</_PopupModal>
	);
};

export default ResourceDialogBox;
