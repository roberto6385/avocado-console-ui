import React, {useCallback, useMemo} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ADD_HISTORY, CREATE_NEW_WEBSOCKET_REQUEST} from '../../reducers/sftp';
import {ContextMenu} from '../../styles/components/contextMenu';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {authSelector} from '../../reducers/api/auth';
import {tabBarSelector} from '../../reducers/tabBar';

const SFTPFileListContextMenu = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');
	const {
		path: sftpPath,
		high: sftpHigh,
		download: sftpDowload,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {userData} = useSelector(authSelector.all);

	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);
	const resource = useMemo(
		() => server.find((it) => it.key === terminalTab.server.key),
		[terminalTab.server.key, server],
	);
	const account = useMemo(
		() =>
			identity.find(
				(it) =>
					it.key === terminalTab.server.key && it.checked === true,
			),
		[identity, terminalTab],
	);
	const {readSocket, readList} = useMemo(
		() => sftpDowload.find((it) => it.uuid === uuid),
		[sftpDowload, uuid],
	);
	const {highlight} = useMemo(
		() => sftpHigh.find((it) => it.uuid === uuid),
		[sftpHigh, uuid],
	);
	const {path} = useMemo(
		() => sftpPath.find((it) => it.uuid === uuid),
		[path, uuid],
	);

	const onClickDownloadData = useCallback(async () => {
		for await (let value of highlight) {
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.name,
					size: value.size,
					todo: 'read',
					progress: 0,
					path: path,
					file: value,
				},
			});
		}
		if (!readSocket && readList.length === 0) {
			dispatch({
				type: CREATE_NEW_WEBSOCKET_REQUEST,
				payload: {
					token: userData.access_token, // connection info
					host: resource.host,
					port: resource.port,
					user: account.user,
					password: account.password,
					todo: 'read',
					uuid: uuid,
				},
			});
		}
	}, [
		readList,
		readSocket,
		dispatch,
		uuid,
		highlight,
		path,
		userData,
		resource,
		account,
	]);

	const onClickEditData = useCallback(() => {
		for (let value of highlight) {
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.name,
					size: value.size,
					todo: 'edit',
					progress: 0,
					path: path,
					file: value,
					key: 'read',
				},
			});
		}
		if (!readSocket && readList.length === 0) {
			dispatch({
				type: CREATE_NEW_WEBSOCKET_REQUEST,
				payload: {
					token: userData.access_token, // connection info
					host: resource.host,
					port: resource.port,
					user: account.user,
					password: account.password,
					todo: 'read',
					uuid: uuid,
				},
			});
		}
	}, [
		readList,
		readSocket,
		highlight,
		dispatch,
		uuid,
		path,
		userData,
		resource,
		account,
	]);

	const handleOnClickEvents = useCallback(
		(v) => async () => {
			switch (v) {
				case 'download-data':
					await onClickDownloadData();
					break;

				case 'edit-data':
					onClickEditData();
					break;

				case 'add-folder':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_new_folder',
							uuid: uuid,
						}),
					);
					break;

				case 'rename-data':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_rename_file_folder',
							uuid: uuid,
						}),
					);
					break;

				case 'delete-data':
					dispatch(
						dialogBoxAction.openAlert({
							key: 'sftp-delete-data',
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
							key: 'sftp_chgrp',
							uuid: uuid,
						}),
					);
					break;

				case 'change-ownership':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_chown',
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
		<ContextMenu id={uuid + 'fileList'} animation={animation.slide}>
			<Item
				disabled={highlight.length === 0}
				onClick={handleOnClickEvents('download-data')}
			>
				{t('download')}
			</Item>
			<Item
				disabled={
					highlight.length === 0 ||
					highlight.length !== 1 ||
					highlight.slice().find((item) => item.type === 'directory')
				}
				onClick={handleOnClickEvents('edit-data')}
			>
				{t('edit')}
			</Item>
			<Separator />

			<Item onClick={handleOnClickEvents('add-folder')}>
				{t('newFolder')}
			</Item>
			<Item
				disabled={highlight.length === 0 || highlight.length !== 1}
				onClick={handleOnClickEvents('rename-data')}
			>
				{t('rename')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length === 0}
				onClick={handleOnClickEvents('delete-data')}
			>
				{t('delete')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length !== 1}
				onClick={handleOnClickEvents('get-attributes')}
			>
				{t('attr')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				onClick={handleOnClickEvents('change-group')}
			>
				{t('chgrp')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				onClick={handleOnClickEvents('change-ownership')}
			>
				{t('chown')}
			</Item>
		</ContextMenu>
	);
};

SFTPFileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPFileListContextMenu;
