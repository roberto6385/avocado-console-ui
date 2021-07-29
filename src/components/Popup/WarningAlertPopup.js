import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {CLOSE_WARNING_ALERT_POPUP} from '../../reducers/popup';
import {
	ACCOUT_CONTROL_ID,
	DELETE_ACCOUT,
	DELETE_SERVER_FOLDER,
	LOCAL_SAVE_FAVORITES,
} from '../../reducers/common';

import {cancelFillIcon, closeIcon} from '../../icons/icons';

import {PrimaryGreyButton, PrimaryRedButton} from '../../styles/components/button';
import {fontColor} from '../../styles/color';
import {
	createNewWebsocket,
	INIT_DELETE_WORK_LIST,
	INITIAL_HISTORY_HI,
	PUSH_INIT_DELETE_WORK_LIST,
	REMOVE_HISTORY,
} from '../../reducers/sftp';
import {DefaultIconButton} from '../../styles/icon';
import {AlertText, ModalFooter, ModalHeader, ModalMessage, PopupModal} from "../../styles/components/modal";

const _PopupModal = styled(PopupModal)`
	width: 290px;
`;

const WarningAlertPopup = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('warningAlertPopup');

	const {
		theme,
		server,
		tab,
		identity,
		clicked_server,
		accountListControlId,
		accountCheckList,
	} = useSelector((state) => state.common, shallowEqual);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const {warning_alert_popup} = useSelector(
		(state) => state.popup,
		shallowEqual,
	);
	const {
		history: sftp_historyState,
		delete: sftp_deleteState,
		high: sftp_highState,
		path: sftp_pathState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const AlertMessage = {
		sftp_delete_file_folder: t('deleteFileFolder'),
		sftp_delete_history: t('deleteHistory'),
		delete_server_folder: t('deleteServerFolder'),
		delete_account: t('deleteAccount'),
	};

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_WARNING_ALERT_POPUP});
	}, [dispatch]);

	const cancelFunction = useCallback(() => {
		warning_alert_popup.key === 'sftp_delete_file_folder' &&
			dispatch({
				type: INIT_DELETE_WORK_LIST,
				payload: {uuid: warning_alert_popup.uuid},
			});
		closeModal();
	}, [closeModal, dispatch, warning_alert_popup]);

	const submitFunction = useCallback(
		async (e) => {
			e.preventDefault();

			switch (warning_alert_popup.key) {
				case 'sftp_delete_file_folder': {
					const uuid = warning_alert_popup.uuid;
					const {removeSocket, incinerator} = sftp_deleteState.find(
						(it) => it.uuid === warning_alert_popup.uuid,
					);
					const {highlight} = sftp_highState.find(
						(it) => it.uuid === warning_alert_popup.uuid,
					);
					const {path} = sftp_pathState.find(
						(it) => it.uuid === warning_alert_popup.uuid,
					);

					dispatch({
						type: PUSH_INIT_DELETE_WORK_LIST,
						payload: {uuid, list: highlight, path},
					});

					const corTab = tab.find((it) => it.uuid === uuid);
					const corServer = server.find(
						(it) => it.key === corTab.server.key,
					);
					const correspondedIdentity = identity.find(
						(it) =>
							it.key === corTab.server.key && it.checked === true,
					);

					if (!removeSocket && incinerator.length === 0) {
						dispatch(
							createNewWebsocket({
								token: userTicket.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
								todo: 'remove',
								uuid: uuid,
							}),
						);
					}

					break;
				}

				case 'sftp_delete_history': {
					const {history_highlight} = sftp_historyState.find(
						(it) => it.uuid === warning_alert_popup.uuid,
					);
					history_highlight.forEach((item) => {
						console.log(item);
						if (
							item.progress === 0 ||
							item.progress === 100 ||
							isNaN(item.progress)
						) {
							dispatch({
								type: REMOVE_HISTORY,
								payload: {
									uuid: warning_alert_popup.uuid,
									history: item,
								},
							});
						}
					});
					dispatch({
						type: INITIAL_HISTORY_HI,
						payload: {uuid: warning_alert_popup.uuid},
					});
					break;
				}

				case 'delete_server_folder':
					console.log(clicked_server);
					if (clicked_server) {
						dispatch({type: DELETE_SERVER_FOLDER});
						dispatch({type: LOCAL_SAVE_FAVORITES});
					}
					break;

				case 'delete_account': {
					if (accountListControlId && accountCheckList.length === 0) {
						dispatch({
							type: DELETE_ACCOUT,
							payload: {id: accountListControlId},
						});

						dispatch({
							type: ACCOUT_CONTROL_ID,
							payload: {id: null},
						});
					} else {
						accountCheckList.forEach((id) => {
							dispatch({
								type: DELETE_ACCOUT,
								payload: {id},
							});
						});
					}

					break;
				}

				default:
					break;
			}
			closeModal();
		},
		[
			warning_alert_popup.uuid,
			warning_alert_popup.key,
			closeModal,
			clicked_server,
			dispatch,
			tab,
			server,
			identity,
			userTicket,
			sftp_historyState,
			accountListControlId,
			accountCheckList,
		],
	);

	return (
		<_PopupModal
			isOpen={warning_alert_popup.open}
			onRequestClose={cancelFunction}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('alert')}</div>
				<DefaultIconButton
					theme_value={theme}
					size={'sm'}
					margin={'0px'}
					onClick={cancelFunction}
				>
					{closeIcon}
				</DefaultIconButton>
			</ModalHeader>

			<ModalMessage theme_value={theme}>
				<DefaultIconButton
					theme_value={theme}
					margin_right='6px'
					color={'#D55959'}
				>
					{cancelFillIcon}
				</DefaultIconButton>
				<AlertText>{AlertMessage[warning_alert_popup.key]}</AlertText>
			</ModalMessage>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={cancelFunction}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryRedButton theme_value={theme} onClick={submitFunction}>
					{t('delete')}
				</PrimaryRedButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default WarningAlertPopup;
