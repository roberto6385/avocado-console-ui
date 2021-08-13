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
	AlertText,
	ModalFooter,
	ModalHeader,
	ModalMessage,
} from '../../../styles/components/disalogBox';

import {authSelector} from '../../../reducers/api/auth';

import {
	SAVE_CHANGES_ON_FAVORITES,
	SET_TEMP_FAVORITES,
} from '../../../reducers/common';
import {tabBarSelector} from '../../../reducers/tabBar';

const SaveDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('savePopup');

	const {alert} = useSelector(dialogBoxSelector.all);
	const {
		path: sftp_pathState,
		etc: sftp_etcState,
		edit: sftp_editState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {userData} = useSelector(authSelector.all);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {tabs} = useSelector(tabBarSelector.all);

	const alertMessages = {
		sftp_edit_save: t('editSave'),
		sftp_edit_close: t('editClose'),
		save_favorites: t('favoritesSave'),
	};

	const onClickCloseDialogBox = useCallback(async () => {
		dispatch(dialogBoxAction.closeAlert());

		switch (alert.key) {
			case 'sftp_edit_save': {
				break;
			}
			case 'sftp_edit_close': {
				const uuid = alert.uuid;
				const {prevMode} = sftp_etcState.find((it) => it.uuid === uuid);
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
			case 'save_favorites': {
				await dispatch(dialogBoxAction.closeForm());
				await dispatch({type: SET_TEMP_FAVORITES});
				break;
			}
			default:
				break;
		}
	}, [dispatch, sftp_etcState]);

	const handleOnClickSFTPSaveEvents = useCallback(() => {
		const uuid = alert.uuid;
		const searchedTerminalTab = tabs.find((it) => it.uuid === uuid);
		const {prevMode} = sftp_etcState.find((it) => it.uuid === uuid);
		const {path} = sftp_pathState.find((it) => it.uuid === uuid);
		const {editText, editFile} = sftp_editState.find(
			(it) => it.uuid === uuid,
		);
		const {writeSocket, writeList} = sftp_uploadState.find(
			(it) => it.uuid === uuid,
		);

		const searchedIdentity = identity.find(
			(it) =>
				it.key === searchedTerminalTab.server.key &&
				it.checked === true,
		);

		const searchedServer = server.find(
			(it) => it.key === searchedTerminalTab.server.key,
		);
		const changedFile = new File([editText], editFile.name, {
			type: 'text/plain',
		});

		switch (alert.key) {
			case 'sftp_edit_save': {
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
							host: searchedServer.host,
							port: searchedServer.port,
							user: searchedIdentity.user,
							password: searchedIdentity.password,
							todo: 'write',
							uuid: uuid,
						},
					});
				}

				break;
			}
			case 'sftp_edit_close': {
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
							host: searchedServer.host,
							port: searchedServer.port,
							user: searchedIdentity.user,
							password: searchedIdentity.password,
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
	}, []);

	const handleOnClickSaveEvents = useCallback(
		(e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp_edit_save':
				case 'sftp_edit_close':
					handleOnClickSFTPSaveEvents();
					break;
				case 'save_favorites':
					dispatch({type: SAVE_CHANGES_ON_FAVORITES});
					break;
				default:
					break;
			}
			onClickCloseDialogBox();
		},
		[
			alert,
			tabs,
			sftp_etcState,
			sftp_pathState,
			sftp_editState,
			sftp_uploadState,
			identity,
			server,
			onClickCloseDialogBox,
			dispatch,
			userData,
		],
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
			<ModalHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{alertFillIcon}
				</Icon>
				<AlertText>{alertMessages[alert.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={handleOnClickSaveEvents}>
					{t('save')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default SaveDialogBox;
