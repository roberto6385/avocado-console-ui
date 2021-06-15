import React, {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Modal from 'react-modal';
import {useTranslation} from 'react-i18next';
import {CLOSE_WARNING_ALERT_POPUP} from '../../reducers/popup';
import {
	ACCOUT_CONTROL_ID,
	DELETE_ACCOUT,
	DELETE_SERVER_FOLDER,
} from '../../reducers/common';
import {
	commandRmAction,
	INIT_DELETE_WORK_LIST,
	INITIAL_HISTORY_HI,
	REMOVE_HISTORY,
} from '../../reducers/sftp';
import {
	FOLDER_HEIGHT,
	IconButton,
	LIGHT_MODE_BORDER_COLOR,
	MAIN_HEIGHT,
} from '../../styles/global';

import {cancelFillIcon, closeIconMedium} from '../../icons/icons';
import {FONT_14} from '../../styles/length';
import {PrimaryGreyButton, PrimaryRedButton} from '../../styles/default';

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
	font-size: ${FONT_14};
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
	font-size: ${FONT_14};
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

const WarningAlertPopup = () => {
	const {t} = useTranslation('warningAlertPopup');
	const dispatch = useDispatch();
	const {theme} = useSelector((state) => state.common);
	const {warning_alert_popup} = useSelector((state) => state.popup);
	const {
		clicked_server,
		accountListControlId,
		accountCheckList,
		nav,
	} = useSelector((state) => state.common);
	const {sftp} = useSelector((state) => state.sftp);

	const {current: AlertMessage} = useRef({
		sftp_delete_file_folder: t('deleteFileFolder'),
		sftp_delete_history: t('deleteHistory'),
		delete_server_folder: t('deleteServerFolder'),
		delete_account: t('deleteAccount'),
	});

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_WARNING_ALERT_POPUP});
	}, []);

	const cancelFunction = useCallback(() => {
		warning_alert_popup.key === 'sftp_delete_file_folder' &&
			dispatch({
				type: INIT_DELETE_WORK_LIST,
				payload: {uuid: warning_alert_popup.uuid},
			});
		closeModal();
	}, [warning_alert_popup]);

	const submitFunction = useCallback(
		(e) => {
			e.preventDefault();

			switch (warning_alert_popup.key) {
				case 'sftp_delete_file_folder': {
					const uuid = warning_alert_popup.uuid;
					const corServer = sftp.find((it) => it.uuid === uuid);

					for (let value of corServer.deleteWorks) {
						console.log(value);
						for (let item of value.list) {
							if (item.name !== '..' || item.name !== '.') {
								dispatch(
									commandRmAction({
										...corServer,
										file: item,
										newPath: value.path,
										keyword:
											item.type === 'file'
												? 'rm'
												: 'rmdir',
									}),
								);
							}
						}
					}
					dispatch(commandRmAction({...corServer, keyword: 'pwd'}));
					break;
				}

				case 'sftp_delete_history': {
					const corServer = sftp.find(
						(it) => it.uuid === warning_alert_popup.uuid,
					);
					const {history_highlight} = corServer;
					history_highlight.forEach((item) => {
						console.log(item);
						dispatch({
							type: REMOVE_HISTORY,
							payload: {
								uuid: warning_alert_popup.uuid,
								history: item,
							},
						});
					});
					dispatch({
						type: INITIAL_HISTORY_HI,
						payload: {uuid: warning_alert_popup.uuid},
					});
					break;
				}

				case 'delete_server_folder':
					console.log(clicked_server);
					clicked_server && dispatch({type: DELETE_SERVER_FOLDER});
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
		[clicked_server, accountListControlId, warning_alert_popup, sftp, nav],
	);

	return (
		<_Modal
			isOpen={warning_alert_popup.open}
			onRequestClose={cancelFunction}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_HeaderText>{t('alert')}</_HeaderText>
				<IconButton onClick={cancelFunction}>
					{closeIconMedium}
				</IconButton>
			</_Header>

			<_Message>
				<div>{cancelFillIcon}</div>
				<_Text>{AlertMessage[warning_alert_popup.key]}</_Text>
			</_Message>

			<_Footer>
				<PrimaryGreyButton themeValue={theme} onClick={cancelFunction}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryRedButton themeValue={theme} onClick={submitFunction}>
					{t('delete')}
				</PrimaryRedButton>
			</_Footer>
		</_Modal>
	);
};

export default WarningAlertPopup;
