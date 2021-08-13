import React, {useCallback} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {dialogBoxAction, dialogBoxSelector} from '../../../reducers/dialogBoxs';

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
import {tabBarSelector} from '../../../reducers/tabBar';

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('warningAlertPopup');

	const {server, identity, clicked_server} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {userData} = useSelector(authSelector.all);
	const {alert} = useSelector(dialogBoxSelector.all);
	const {
		history: sftp_historyState,
		delete: sftp_deleteState,
		high: sftp_highState,
		path: sftp_pathState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const alertMessages = {
		sftp_delete_file_folder: t('deleteFileFolder'),
		sftp_delete_history: t('deleteHistory'),
		delete_server_folder: t('deleteServerFolder'),
		delete_account: t('deleteAccount'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		alert.key === 'sftp_delete_file_folder' &&
			dispatch({
				type: INIT_DELETE_WORK_LIST,
				payload: {uuid: alert.uuid},
			});
		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch, alert]);

	const handleOnClickDeleteEvents = useCallback(
		async (e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp_delete_file_folder': {
					const uuid = alert.uuid;
					const {removeSocket, incinerator} = sftp_deleteState.find(
						(it) => it.uuid === uuid,
					);
					const {highlight} = sftp_highState.find(
						(it) => it.uuid === uuid,
					);
					const {path} = sftp_pathState.find(
						(it) => it.uuid === uuid,
					);

					dispatch({
						type: PUSH_INIT_DELETE_WORK_LIST,
						payload: {uuid, list: highlight, path},
					});

					const searchedTerminalTab = terminalTabs.find(
						(it) => it.uuid === uuid,
					);
					const searchedServer = server.find(
						(it) => it.key === searchedTerminalTab.server.key,
					);
					const searchedIdentity = identity.find(
						(it) =>
							it.key === searchedTerminalTab.server.key &&
							it.checked === true,
					);

					if (!removeSocket && incinerator.length === 0) {
						dispatch({
							type: CREATE_NEW_WEBSOCKET_REQUEST,
							payload: {
								token: userData.access_token, // connection info
								host: searchedServer.host,
								port: searchedServer.port,
								user: searchedIdentity.user,
								password: searchedIdentity.password,
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
					break;
				case 'delete_account': {
					break;
				}

				default:
					break;
			}
			dispatch(dialogBoxAction.closeAlert());
		},
		[
			alert,
			clicked_server,
			sftp_deleteState,
			sftp_highState,
			sftp_pathState,
			dispatch,
			terminalTabs,
			server,
			identity,
			userData,
			sftp_historyState,
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
					{cancelFillIcon}
				</Icon>
				<AlertText>{alertMessages[alert.key]}</AlertText>
			</ModalMessage>

			<ModalFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={handleOnClickDeleteEvents}>
					{t('delete')}
				</WarningButton>
			</ModalFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
