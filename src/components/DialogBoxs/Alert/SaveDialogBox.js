import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	CLOSE_ADD_FAVORITES_DIALOG_BOX,
	CLOSE_SAVE_DIALOG_BOX,
} from '../../../reducers/dialogBoxs';
import styled from 'styled-components';

import {alertFillIcon, closeIcon} from '../../../icons/icons';
import {
	NormalButton,
	TransparentButton,
} from '../../../styles/components/button';

import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	createNewWebsocket,
	SAVE_TEXT,
} from '../../../reducers/sftp';
import {
	LOCAL_SAVE_FAVORITES,
	SAVE_FAVORITES,
	UNDO_FAVORITES,
} from '../../../reducers/common';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	AlertModal,
	AlertText,
	ModalFooter,
	ModalHeader,
	ModalMessage,
} from '../../../styles/components/disalogBox';

const SaveDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('savePopup');

	const {save_dialog_box} = useSelector(
		(state) => state.dialogBoxs,
		shallowEqual,
	);
	const {
		path: sftp_pathState,
		etc: sftp_etcState,
		edit: sftp_editState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const {tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const SaveMessage = {
		sftp_edit_save: t('editSave'),
		sftp_edit_close: t('editClose'),
		favorites_save: t('favoritesSave'),
	};

	const closeModal = useCallback(() => {
		switch (save_dialog_box.key) {
			case 'sftp_edit_save': {
				dispatch({type: CLOSE_SAVE_DIALOG_BOX});
				break;
			}
			case 'sftp_edit_close': {
				const uuid = save_dialog_box.uuid;
				const {prevMode} = sftp_etcState.find((it) => it.uuid === uuid);
				dispatch({type: CLOSE_SAVE_DIALOG_BOX});
				dispatch({
					type: CLOSE_EDITOR,
					payload: {uuid: save_dialog_box.uuid},
				});
				dispatch({
					type: CHANGE_MODE,
					payload: {uuid: save_dialog_box.uuid, mode: prevMode},
				});

				break;
			}
			case 'favorites_save': {
				dispatch({type: UNDO_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});
				dispatch({type: CLOSE_SAVE_DIALOG_BOX});
				dispatch({type: CLOSE_ADD_FAVORITES_DIALOG_BOX});

				// 초기화
				break;
			}
		}
	}, [dispatch, save_dialog_box, sftp_etcState]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			if (save_dialog_box.key === 'favorites_save') {
				dispatch({type: SAVE_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});

				closeModal();

				return;
			}

			const uuid = save_dialog_box.uuid;
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

			switch (save_dialog_box.key) {
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
						dispatch(
							createNewWebsocket({
								token: userTicket.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
								todo: 'write',
								uuid: uuid,
							}),
						);
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
						dispatch(
							createNewWebsocket({
								token: userTicket.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
								todo: 'write',
								uuid: uuid,
							}),
						);
					}
					dispatch({
						type: SAVE_TEXT,
						payload: {uuid, text: editText},
					});
					dispatch({
						type: CLOSE_EDITOR,
						payload: {uuid: save_dialog_box.uuid},
					});
					dispatch({
						type: CHANGE_MODE,
						payload: {uuid: save_dialog_box.uuid, mode: prevMode},
					});
					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[
			save_dialog_box,
			tab,
			sftp_etcState,
			sftp_pathState,
			sftp_editState,
			sftp_uploadState,
			identity,
			server,
			closeModal,
			dispatch,
			userTicket,
		],
	);

	return (
		<AlertModal
			isOpen={save_dialog_box.open}
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
				<AlertText>{SaveMessage[save_dialog_box.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={closeModal}>
					{t('cancel')}
				</TransparentButton>
				<NormalButton onClick={submitFunction}>
					{t('save')}
				</NormalButton>
			</ModalFooter>
		</AlertModal>
	);
};

export default SaveDialogBox;
