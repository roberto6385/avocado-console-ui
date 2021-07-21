import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	CLOSE_ADD_FAVORITES_FORM_POPUP,
	CLOSE_SAVE_POPUP,
} from '../../reducers/popup';
import styled from 'styled-components';

import {alertFillIcon, closeIcon} from '../../icons/icons';
import {
	ModalFooter,
	ModalHeader,
	ModalMessage,
	PopupModal,
	PopupText,
} from '../../styles/default';

import {
	ClickableIconButton,
	IconBox,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';
import {
	ADD_HISTORY,
	CHANGE_MODE,
	CLOSE_EDITOR,
	createNewWebsocket,
	SAVE_TEXT,
} from '../../reducers/sftp';
import {
	LOCAL_SAVE_FAVORITES,
	SAVE_FAVORITES,
	UNDO_FAVORITES,
} from '../../reducers/common';

const _PopupModal = styled(PopupModal)`
	width: 290px;
`;

const SavePopup = () => {
	const {t} = useTranslation('savePopup');
	const dispatch = useDispatch();
	const save_popup = useSelector((state) => state.popup.save_popup);
	const {
		path: sftp_pathState,
		etc: sftp_etcState,
		edit: sftp_editState,
		upload: sftp_uploadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const {theme, tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const SaveMessage = {
		sftp_edit_save: t('editSave'),
		sftp_edit_close: t('editClose'),
		favorites_save: t('favoritesSave'),
	};

	const closeModal = useCallback(() => {
		switch (save_popup.key) {
			case 'sftp_edit_save': {
				dispatch({type: CLOSE_SAVE_POPUP});
				break;
			}
			case 'sftp_edit_close': {
				const uuid = save_popup.uuid;
				const {prevMode} = sftp_etcState.find((it) => it.uuid === uuid);
				dispatch({type: CLOSE_SAVE_POPUP});
				dispatch({
					type: CLOSE_EDITOR,
					payload: {uuid: save_popup.uuid},
				});
				dispatch({
					type: CHANGE_MODE,
					payload: {uuid: save_popup.uuid, mode: prevMode},
				});

				break;
			}
			case 'favorites_save': {
				dispatch({type: UNDO_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});
				dispatch({type: CLOSE_SAVE_POPUP});
				dispatch({type: CLOSE_ADD_FAVORITES_FORM_POPUP});

				// 초기화
				break;
			}
		}
	}, [dispatch, save_popup, sftp_etcState]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();
			if (save_popup.key === 'favorites_save') {
				dispatch({type: SAVE_FAVORITES});
				dispatch({type: LOCAL_SAVE_FAVORITES});

				closeModal();

				return;
			}

			const uuid = save_popup.uuid;
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

			switch (save_popup.key) {
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
						payload: {uuid: save_popup.uuid},
					});
					dispatch({
						type: CHANGE_MODE,
						payload: {uuid: save_popup.uuid, mode: prevMode},
					});
					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[
			save_popup,
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
		<_PopupModal
			isOpen={save_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('alert')}</div>
				<ClickableIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
					onClick={closeModal}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<ModalMessage theme_value={theme}>
				<IconBox margin_right='6px' color={'#178082'}>
					{alertFillIcon}
				</IconBox>
				<PopupText>{SaveMessage[save_popup.key]}</PopupText>
			</ModalMessage>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton
					theme_value={theme}
					onClick={submitFunction}
				>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default SavePopup;
