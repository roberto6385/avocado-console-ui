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
	AlertDialogBoxText,
	DialogBoxFooter,
	DialogBoxHeader,
	DialogBoxMessage,
} from '../../../styles/components/disalogBox';
import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';
import {favoritesAction} from '../../../reducers/favorites';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const DeleteDialogBox = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('deletePopup');

	const {selectedResource, resources, accounts} = useSelector(
		remoteResourceSelector.all,
	);
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {userData} = useSelector(authSelector.all);
	const {alert} = useSelector(dialogBoxSelector.all);
	const {
		history: sftpHistory,
		delete: sftpDelete,
		high: sftpHigh,
		path: sftpPath,
	} = useSelector((state) => state.sftp, shallowEqual);

	const alertMessages = {
		'sftp-delete-data': t('deleteFileFolder'),
		'sftp-delete-history': t('deleteHistory'),
		'delete-favorite-group': t('deleteFavoriteGroup'),
	};

	const onClickCloseDialogBox = useCallback(() => {
		switch (alert.key) {
			case 'sftp-delete-data': {
				dispatch({
					type: INIT_DELETE_WORK_LIST,
					payload: {uuid: alert.uuid},
				});
				break;
			}
			default:
				break;
		}

		dispatch(dialogBoxAction.closeAlert());
	}, [dispatch, alert]);

	const handleOnClickDeleteEvents = useCallback(
		async (e) => {
			e.preventDefault();

			switch (alert.key) {
				case 'sftp-delete-data': {
					const uuid = alert.uuid;
					const {removeSocket, incinerator} = sftpDelete.find(
						(it) => it.uuid === uuid,
					);
					const {highlight} = sftpHigh.find((it) => it.uuid === uuid);
					const {path} = sftpPath.find((it) => it.uuid === uuid);

					dispatch({
						type: PUSH_INIT_DELETE_WORK_LIST,
						payload: {uuid, list: highlight, path},
					});

					const terminalTab = terminalTabs.find(
						(it) => it.uuid === uuid,
					);
					const resource = resources.find(
						(it) => it.key === terminalTab.server.key,
					);
					const account = accounts.find(
						(it) =>
							it.key === terminalTab.server.key &&
							it.checked === true,
					);

					if (!removeSocket && incinerator.length === 0) {
						dispatch({
							type: CREATE_NEW_WEBSOCKET_REQUEST,
							payload: {
								token: userData.access_token, // connection info
								host: resource.host,
								port: resource.port,
								user: account.user,
								password: account.password,
								todo: 'remove',
								uuid: uuid,
							},
						});
					}

					break;
				}

				case 'sftp-delete-history': {
					const {history_highlight} = sftpHistory.find(
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
				case 'delete-favorite-group': {
					// todo : alert.id값으로 넘어온 데이터는 forder의 key값입니다
					// todo : FolderOnFavoritesContextMenu에서 prop전달
					dispatch(favoritesAction.deleteFavoriteGroup(alert.id));

					break;
				}

				default:
					break;
			}
			dispatch(dialogBoxAction.closeAlert());
		},
		[
			alert,
			selectedResource,
			sftpDelete,
			sftpHigh,
			sftpPath,
			dispatch,
			terminalTabs,
			resources,
			accounts,
			userData,
			sftpHistory,
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
			<DialogBoxHeader>
				<div>{t('alert')}</div>
				<IconButton
					itype={'font'}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseDialogBox}
				>
					{closeIcon}
				</IconButton>
			</DialogBoxHeader>

			<DialogBoxMessage>
				<Icon margin_right='6px' itype={'warning'}>
					{cancelFillIcon}
				</Icon>
				<AlertDialogBoxText>
					{alertMessages[alert.key]}
				</AlertDialogBoxText>
			</DialogBoxMessage>

			<DialogBoxFooter>
				<TransparentButton onClick={onClickCloseDialogBox}>
					{t('cancel')}
				</TransparentButton>
				<WarningButton onClick={handleOnClickDeleteEvents}>
					{t('delete')}
				</WarningButton>
			</DialogBoxFooter>
		</AlertDialogBox>
	);
};

export default DeleteDialogBox;
