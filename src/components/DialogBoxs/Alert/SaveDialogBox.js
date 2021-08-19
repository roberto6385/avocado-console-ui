import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

import {alertFillIcon, closeIcon} from '../../../icons/icons';
import {
	TransparentButton,
	WarningButton,
} from '../../../styles/components/button';

import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	CREATE_NEW_WEBSOCKET_REQUEST,
	SAVE_TEXT,
} from '../../../reducers/sftp';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	AlertDialogBox,
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
	DialogBoxMessage,
} from '../../../styles/components/disalogBox';

import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const SaveDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('saveDialogBox');

	const {alert} = useSelector(dialogBoxSelector.all);
	const {
		path: sftpPath,
		etc: sftpEtc,
		edit: sftpEdit,
		upload: sftpUpload,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {userData} = useSelector(authSelector.all);
	const {resources, accounts} = useSelector(remoteResourceSelector.all);

	const {terminalTabs} = useSelector(tabBarSelector.all);

	const alertMessages = {
		'sftp-save-changes': t('sftpSaveChanges'),
		'sftp-cancel-changes': t('sftpCancelChanges'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		dispatch(dialogBoxAction.closeAlert());

		switch (alert.key) {
			case 'sftp-cancel-changes': {
				const uuid = alert.uuid;
				const {prevMode} = sftpEtc.find((it) => it.uuid === uuid);
				dispatch({
					type: CLOSE_EDITOR,
					payload: {uuid: alert.uuid},
				});
				dispatch({
					type: CHANGE_MODE,
					payload: {uuid: alert.uuid, mode: prevMode},
				});

				break;
			}

			default:
				break;
		}
	}, [alert, dispatch, sftpEtc]);

	const handleOnClickSFTPSaveEvents = useCallback(() => {
		const uuid = alert.uuid;
		const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
		const prevMode = sftpEtc.find((it) => it.uuid === uuid).prevMode;
		const path = path.find((it) => it.uuid === uuid).path;
		const {editText, editFile} = sftpEdit.find((it) => it.uuid === uuid);
		const {writeSocket, writeList} = sftpUpload.find(
			(it) => it.uuid === uuid,
		);

		const account = accounts.find(
			(it) => it.key === terminalTab.server.key && it.checked === true,
		);
		const resource = resources.find(
			(it) => it.key === terminalTab.server.key,
		);
		const changedFile = new File([editText], editFile.name, {
			type: 'text/plain',
		});

		switch (alert.key) {
			case 'sftp-save-changes': {
				dispatch({
					type: SAVE_TEXT,
					payload: {uuid, text: editText},
				});
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: changedFile.name,
						size: changedFile.size,
						todo: 'edit',
						progress: 0,
						path: path,
						file: changedFile,
						key: 'write',
					},
				});
				if (!writeSocket && writeList.length === 0) {
					dispatch({
						type: CREATE_NEW_WEBSOCKET_REQUEST,
						payload: {
							token: userData.access_token, // connection info
							host: resource.host,
							port: resource.port,
							user: account.user,
							password: account.password,
							todo: 'write',
							uuid: uuid,
						},
					});
				}

				break;
			}
			case 'sftp-cancel-changes': {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: changedFile.name,
						size: changedFile.size,
						todo: 'edit',
						progress: 0,
						path: path,
						file: changedFile,
						key: 'write',
					},
				});
				if (!writeSocket && writeList.length === 0) {
					dispatch({
						type: CREATE_NEW_WEBSOCKET_REQUEST,
						payload: {
							token: userData.access_token, // connection info
							host: resource.host,
							port: resource.port,
							user: account.user,
							password: account.password,
							todo: 'write',
							uuid: uuid,
						},
					});
				}
				dispatch({
					type: SAVE_TEXT,
					payload: {uuid, text: editText},
				});
				dispatch({
					type: CLOSE_EDITOR,
					payload: {uuid: alert.uuid},
				});
				dispatch({
					type: CHANGE_MODE,
					payload: {uuid: alert.uuid, mode: prevMode},
				});
				break;
			}
			default:
				break;
		}
	}, [
		alert,
		dispatch,
		accounts,
		resources,
		sftpEdit,
		sftpEtc,
		sftpPath,
		sftpUpload,
		terminalTabs,
		userData,
	]);

	const handleOnClickSaveEvents = useCallback(
		(e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp-save-changes':
				case 'sftp-cancel-changes':
					handleOnClickSFTPSaveEvents();
					break;

				default:
					break;
			}
			onClickCloseDialogBox();
		},
		[alert.key, onClickCloseDialogBox, handleOnClickSFTPSaveEvents],
	);

	return (
		<AlertDialogBox
			isOpen={
				alert.open &&
				Object.prototype.hasOwnProperty.call(alertMessages, alert.key)
			}
			onRequestClose={onClickCloseDialogBox}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<DialogBoxHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<DialogBoxMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{alertFillIcon}
				</Icon>
				<AlertDialogBoxText>
					{alertMessages[alert.key]}
				</AlertDialogBoxText>
			</DialogBoxMessage>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={handleOnClickSaveEvents}>
					{t('save')}
				</WarningButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default SaveDialogBox;
