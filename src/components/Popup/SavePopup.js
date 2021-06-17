import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_SAVE_POPUP} from '../../reducers/popup';
import styled from 'styled-components';

import {
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandPutAction,
	SAVE_TEXT,
} from '../../reducers/sftp';
import {alertFillIcon, closeIconMedium} from '../../icons/icons';
import {
	ModalFooter,
	ModalHeader,
	ModalHeaderIconButton,
	ModalMessage,
	PopupModal,
	PopupText,
	PrimaryGreenButton,
	PrimaryGreyButton,
} from '../../styles/default';

const _PopupModal = styled(PopupModal)`
	width: 290px;
`;

const SavePopup = () => {
	const {t} = useTranslation('savePopup');
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);
	const {save_popup} = useSelector((state) => state.popup);
	const {sftp} = useSelector((state) => state.sftp);
	const SaveMessage = {
		sftp_edit_save: t('editSave'),
		sftp_edit_close: t('editClose'),
	};

	const closeModal = useCallback(() => {
		switch (save_popup.key) {
			case 'sftp_edit_save': {
				dispatch({type: CLOSE_SAVE_POPUP});
				break;
			}
			case 'sftp_edit_close': {
				const uuid = save_popup.uuid;
				const corServer = sftp.find((it) => it.uuid === uuid);
				const {prevMode} = corServer;
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
		}
	}, [save_popup]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			const uuid = save_popup.uuid;
			const corServer = sftp.find((it) => it.uuid === uuid);
			const {editText, editFile, prevMode} = corServer;
			const uploadFile = new File([editText], editFile.name, {
				type: 'text/plain',
			});

			switch (save_popup.key) {
				case 'sftp_edit_save': {
					dispatch(
						commandPutAction({
							...corServer,
							file: uploadFile,
							keyword: 'edit',
						}),
					);
					dispatch({
						type: SAVE_TEXT,
						payload: {uuid, text: editText},
					});

					break;
				}
				case 'sftp_edit_close': {
					dispatch(
						commandPutAction({
							...corServer,
							file: uploadFile,
							keyword: 'edit',
						}),
					);
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
		[save_popup, sftp],
	);

	return (
		<_PopupModal
			isOpen={save_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			themeValue={theme}
		>
			<ModalHeader themeValue={theme}>
				<div>{t('alert')}</div>
				<ModalHeaderIconButton themeValue={theme} onClick={closeModal}>
					{closeIconMedium}
				</ModalHeaderIconButton>
			</ModalHeader>

			<ModalMessage themeValue={theme}>
				<div>{alertFillIcon}</div>
				<PopupText>{SaveMessage[save_popup.key]}</PopupText>
			</ModalMessage>

			<ModalFooter themeValue={theme}>
				<PrimaryGreyButton themeValue={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton themeValue={theme} onClick={submitFunction}>
					{t('save')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default SavePopup;
