import React, {useCallback} from 'react';
import {BsFillQuestionCircleFill, IoCloseOutline} from 'react-icons/all';

import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_SAVE_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import Modal from 'react-modal';
import {IconContext} from 'react-icons';
import {
	AVOCADO_FONTSIZE,
	BorderButton,
	LIGHT_MODE_BORDER_COLOR,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PrimaryButton,
} from '../../styles/global';
import {
	CHANGE_MODE,
	CLOSE_EDITOR,
	commandPutAction,
	SAVE_TEXT,
} from '../../reducers/sftp';

const _Modal = styled(Modal)`
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	position: absolute;
	z-index: 10;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	background: white;
	border-radius: 4px;
	width: 290px;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _Text = styled.div`
	font-size: 14px;
	font-family: Roboto;
	width: 226px;
`;

const _HeaderText = styled(_Text)`
	font-weight: 500;
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _Message = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px 16px;
`;

const SavePopup = () => {
	const dispatch = useDispatch();
	const {save_popup} = useSelector((state) => state.popup);
	const {sftp} = useSelector((state) => state.sftp);

	const SaveMessage = {
		sftp_edit_save: 'save?',
		sftp_edit_close: 'Do you want to save changes?',
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
	}, [save_popup, dispatch]);

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
		<_Modal
			isOpen={save_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_HeaderText>Alert</_HeaderText>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>

			<_Message>
				<IconContext.Provider
					value={{
						size: '20px',
						color: '#178082',
					}}
				>
					<div>
						<BsFillQuestionCircleFill />
					</div>
				</IconContext.Provider>
				<_Text>{SaveMessage[save_popup.key]}</_Text>
			</_Message>

			<_Footer>
				<BorderButton onClick={closeModal}>Cancle</BorderButton>
				<PrimaryButton onClick={submitFunction}>Save</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default SavePopup;
