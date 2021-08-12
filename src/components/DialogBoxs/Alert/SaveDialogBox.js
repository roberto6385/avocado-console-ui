import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {DIALOG_BOX, dialogBoxAction} from '../../../reducers/dialogBoxs';

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

import {AUTH} from '../../../reducers/api/auth';

import {
	SAVE_CHANGES_ON_FAVORITES,
	SET_TEMP_FAVORITES,
} from '../../../reducers/common';

const SaveDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('savePopup');

	const {alert} = useSelector((state) => state[DIALOG_BOX], shallowEqual);
	const {
		path: sftp_pathState,
		etc: sftp_etcState,
		edit: sftp_editState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const {tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const SaveMessage = {
		sftp_edit_save: t('editSave'),
		sftp_edit_close: t('editClose'),
		save_favorites: t('favoritesSave'),
	};

	const closeModal = useCallback(async () => {
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

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			if (alert.key === 'save_favorites') {
				dispatch({type: SAVE_CHANGES_ON_FAVORITES});
				closeModal();
				return;
			}

			const uuid = alert.uuid;
			const corTab = tab.find((it) => it.uuid === uuid);
			const {prevMode} = sftp_etcState.find((it) => it.uuid === uuid);
			const {path} = sftp_pathState.find((it) => it.uuid === uuid);
			const {editText, editFile} = sftp_editState.find(
				(it) => it.uuid === uuid,
			);
			const {writeSocket, writeList} = sftp_uploadState.find(
				(it) => it.uuid === uuid,
			);

			const correspondedIdentity = identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			);

			const corServer = server.find((it) => it.key === corTab.server.key);
			const uploadFile = new File([editText], editFile.name, {
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
							name: uploadFile.name,
							size: uploadFile.size,
							todo: 'edit',
							progress: 0,
							path: path,
							file: uploadFile,
							key: 'write',
						},
					});
					if (!writeSocket && writeList.length === 0) {
						dispatch({
							type: CREATE_NEW_WEBSOCKET_REQUEST,
							payload: {
								token: userData.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
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
							name: uploadFile.name,
							size: uploadFile.size,
							todo: 'edit',
							progress: 0,
							path: path,
							file: uploadFile,
							key: 'write',
						},
					});
					if (!writeSocket && writeList.length === 0) {
						dispatch({
							type: CREATE_NEW_WEBSOCKET_REQUEST,
							payload: {
								token: userData.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
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
			closeModal();
		},
		[
			alert,
			tab,
			sftp_etcState,
			sftp_pathState,
			sftp_editState,
			sftp_uploadState,
			identity,
			server,
			closeModal,
			dispatch,
			userData,
		],
	);

	const keyArray = ['sftp_edit_save', 'sftp_edit_close', 'save_favorites'];

	return (
		<AlertDialogBox
			isOpen={alert.open && keyArray.includes(alert.key)}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{alertFillIcon}
				</Icon>
				<AlertText>{SaveMessage[alert.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={closeModal}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={submitFunction}>
					{t('save')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default SaveDialogBox;
