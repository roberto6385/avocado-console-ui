import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';
import {
	ACCOUT_CONTROL_ID,
	DELETE_ACCOUT,
	DELETE_SERVER_FOLDER,
} from '../../../reducers/common';

import {cancelFillIcon, closeIcon} from '../../../icons/icons';

import {
	TransparentButton,
	WarningButton,
} from '../../../styles/components/button';
import {
	CREATE_NEW_WEBSOCKET_REQUEST,
	INIT_DELETE_WORK_LIST,
	INITIAL_HISTORY_HI,
	PUSH_INIT_DELETE_WORK_LIST,
	REMOVE_HISTORY,
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

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('warningAlertPopup');

	const {
		server,
		tab,
		identity,
		clicked_server,
		accountListControlId,
		accountCheckList,
	} = useSelector((state) => state.common, shallowEqual);
	const {userData} = useSelector(authSelector.all);
	const {alert} = useSelector(dialogBoxSelector.all);
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

	const keyArray = [
		'sftp_delete_file_folder',
		'sftp_delete_history',
		'delete_server_folder',
		'delete_account',
	];

	const closeModal = useCallback(() => {
		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch]);

	const cancelFunction = useCallback(() => {
		alert.key === 'sftp_delete_file_folder' &&
			dispatch({
				type: INIT_DELETE_WORK_LIST,
				payload: {uuid: alert.uuid},
			});
		closeModal();
	}, [closeModal, dispatch, alert]);

	const submitFunction = useCallback(
		async (e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp_delete_file_folder': {
					const uuid = alert.uuid;
					const {removeSocket, incinerator} = sftp_deleteState.find(
						(it) => it.uuid === alert.uuid,
					);
					const {highlight} = sftp_highState.find(
						(it) => it.uuid === alert.uuid,
					);
					const {path} = sftp_pathState.find(
						(it) => it.uuid === alert.uuid,
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
						dispatch({
							type: CREATE_NEW_WEBSOCKET_REQUEST,
							payload: {
								token: userData.access_token, // connection info
								host: corServer.host,
								port: corServer.port,
								user: correspondedIdentity.user,
								password: correspondedIdentity.password,
								todo: 'remove',
								uuid: uuid,
							},
						});
					}

					break;
				}

				case 'sftp_delete_history': {
					const {history_highlight} = sftp_historyState.find(
						(it) => it.uuid === alert.uuid,
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
									uuid: alert.uuid,
									history: item,
								},
							});
						}
					});
					dispatch({
						type: INITIAL_HISTORY_HI,
						payload: {uuid: alert.uuid},
					});
					break;
				}

				case 'delete_server_folder':
					console.log(clicked_server);
					if (clicked_server) {
						dispatch({type: DELETE_SERVER_FOLDER});
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
			alert,
			closeModal,
			clicked_server,
			sftp_deleteState,
			sftp_highState,
			sftp_pathState,
			dispatch,
			tab,
			server,
			identity,
			userData,
			sftp_historyState,
			accountListControlId,
			accountCheckList,
		],
	);

	return (
		<AlertDialogBox
			isOpen={alert.open && keyArray.includes(alert.key)}
			onRequestClose={cancelFunction}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<ModalHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={cancelFunction}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{cancelFillIcon}
				</Icon>
				<AlertText>{AlertMessage[alert.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={cancelFunction}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={submitFunction}>
					{t('delete')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
