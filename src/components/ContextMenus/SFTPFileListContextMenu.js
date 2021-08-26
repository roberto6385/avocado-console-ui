import React, {useCallback, useMemo} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';
import {ContextMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {authSelector} from '../../reducers/api/auth';
import {tabBarSelector} from '../../reducers/tabBar';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {sftpAction, sftpSelector, types} from '../../reducers/renewal';

const SFTPFileListContextMenu = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('sftpFileListContextMenu');
	const {resources, accounts} = useSelector(remoteResourceSelector.all);
	const {data} = useSelector(sftpSelector.all);

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);

	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);

	const onClickDownloadData = useCallback(async () => {
		console.log(sftp.selected.files);
		for await (let v of sftp.selected.files) {
			dispatch(
				sftpAction.addList({
					uuid: uuid,
					type: 'download',
					value: {path: sftp.path, file: v},
				}),
			);

			dispatch(
				sftpAction.addHistory({
					uuid: uuid,
					history: {
						name: v.name,
						size: v.size,
						type: types.download,
					},
				}),
			);
		}
		if (!sftp.download.on) {
			dispatch(
				sftpAction.createSocket({
					uuid: uuid,
					key: terminalTab.server.key,
					type: 'download',
				}),
			);
		}
		// initialize => select files
		dispatch(sftpAction.setSelectedFile({uuid: uuid, result: []}));
	}, [dispatch, sftp, terminalTab, uuid]);

	const onClickEditData = useCallback(() => {
		// for (let value of highlight) {
		// 	dispatch({
		// 		type: ADD_HISTORY,
		// 		payload: {
		// 			uuid: uuid,
		// 			name: value.name,
		// 			size: value.size,
		// 			todo: 'edit',
		// 			progress: 0,
		// 			path: path,
		// 			file: value,
		// 			key: 'read',
		// 		},
		// 	});
		// }
		// if (!readSocket && readList.length === 0) {
		// 	dispatch({
		// 		type: CREATE_NEW_WEBSOCKET_REQUEST,
		// 		payload: {
		// 			token: userData.access_token, // connection info
		// 			host: resource.host,
		// 			port: resource.port,
		// 			user: account.user,
		// 			password: account.password,
		// 			todo: 'read',
		// 			uuid: uuid,
		// 		},
		// 	});
		// }
	}, []);

	const handleOnClickEvents = useCallback(
		(v) => async () => {
			switch (v) {
				case 'download-resourceGroupId':
					await onClickDownloadData();
					break;

				case 'edit-resourceGroupId':
					onClickEditData();
					break;

				case 'add-folder':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp-new-folder',
							uuid: uuid,
						}),
					);
					break;

				case 'rename-resourceGroupId':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp-rename-file-folder',
							uuid: uuid,
						}),
					);
					break;

				case 'delete-resourceGroupId':
					dispatch(
						dialogBoxAction.openAlert({
							key: 'sftp-delete-file',
							uuid: uuid,
						}),
					);
					break;

				case 'get-attributes':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_stat',
							uuid: uuid,
						}),
					);
					break;

				case 'change-group':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp-change-group',
							uuid: uuid,
						}),
					);
					break;

				case 'change-ownership':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp-chnage-owner',
							uuid: uuid,
						}),
					);
					break;

				default:
					return;
			}
		},
		[onClickDownloadData, onClickEditData, dispatch, uuid],
	);

	return (
		<ContextMenu
			id={uuid + '-file-list-context-menu'}
			animation={animation.slide}
		>
			<Item
				disabled={sftp.selected.files.length === 0}
				onClick={handleOnClickEvents('download-resourceGroupId')}
			>
				{t('download')}
			</Item>
			<Item
				disabled={
					sftp.selected.files.length !== 1 ||
					sftp.selected.files[0].type !== 'file'
				}
				onClick={handleOnClickEvents('edit-resourceGroupId')}
			>
				{t('edit')}
			</Item>
			<Separator />

			<Item onClick={handleOnClickEvents('add-folder')}>
				{t('addFolder')}
			</Item>
			<Item
				disabled={sftp.selected.files.length !== 1}
				onClick={handleOnClickEvents('rename-resourceGroupId')}
			>
				{t('rename')}
			</Item>
			<Separator />
			<Item
				disabled={sftp.selected.files.length === 0}
				onClick={handleOnClickEvents('delete-resourceGroupId')}
			>
				{t('delete')}
			</Item>
			<Separator />
			<Item
				disabled={sftp.selected.files.length !== 1}
				onClick={handleOnClickEvents('get-attributes')}
			>
				{t('attributes')}
			</Item>

			<Item
				disabled={sftp.selected.files.length !== 1}
				onClick={handleOnClickEvents('change-group')}
			>
				{t('changeGroup')}
			</Item>

			<Item
				disabled={sftp.selected.files.length !== 1}
				onClick={handleOnClickEvents('change-ownership')}
			>
				{t('changeOwner')}
			</Item>
		</ContextMenu>
	);
};

SFTPFileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPFileListContextMenu;
