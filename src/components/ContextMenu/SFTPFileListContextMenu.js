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
	//TODO : sftp_pathState 언더바, 케멀 통일
	const {
		path: sftp_pathState,
		high: sftp_highState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {terminalTabs} = useSelector(tabBarSelector.all);

	const {highlight} = useMemo(
		() => sftp_highState.find((it) => it.uuid === uuid),
		[sftp_highState, uuid],
	);
	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {readSocket, readList} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);
	const searchedTerminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);
	const {userData} = useSelector(authSelector.all);
	const searchedServer = useMemo(
		() => server.find((it) => it.key === searchedTerminalTab.server.key),
		[searchedTerminalTab.server.key, server],
	);

	const searchedIdentity = useMemo(
		() =>
			identity.find(
				(it) =>
					it.key === searchedTerminalTab.server.key &&
					it.checked === true,
			),
		[identity, searchedTerminalTab],
	);

	const onClickDownloadContext = useCallback(async () => {
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
					host: searchedServer.host,
					port: searchedServer.port,
					user: searchedIdentity.user,
					password: searchedIdentity.password,
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
		searchedServer,
		searchedIdentity,
	]);

	const onClickEditContext = useCallback(() => {
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
					host: searchedServer.host,
					port: searchedServer.port,
					user: searchedIdentity.user,
					password: searchedIdentity.password,
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
		searchedServer,
		searchedIdentity,
	]);

	const handleOnClickEvents = useCallback(
		async ({event}) => {
			switch (event.currentTarget.id) {
				case 'download':
					await onClickDownloadContext();
					break;
				case 'edit':
					onClickEditContext(event);
					break;
				case 'new_folder':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_new_folder',
							uuid: uuid,
						}),
					);
					break;
				case 'rename_work':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_rename_file_folder',
							uuid: uuid,
						}),
					);
					break;
				case 'delete_work':
					dispatch(
						dialogBoxAction.openAlert({
							key: 'sftp_delete_file_folder',
							uuid: uuid,
						}),
					);
					break;

				case 'attr_work':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_stat',
							uuid: uuid,
						}),
					);
					break;

				case 'chgrp_work':
					dispatch(
						dialogBoxAction.openForm({
							key: 'sftp_chgrp',
							uuid: uuid,
						}),
					);
					break;

				case 'chown_work':
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
		[onClickDownloadContext, onClickEditContext, dispatch, uuid],
	);
	return (
		<ContextMenu id={uuid + 'fileList'} animation={animation.slide}>
			<Item
				disabled={highlight.length === 0}
				id='download'
				onClick={handleOnClickEvents}
			>
				{t('download')}
			</Item>
			<Item
				disabled={
					highlight.length === 0 ||
					highlight.length !== 1 ||
					highlight.slice().find((item) => item.type === 'directory')
				}
				id='edit'
				onClick={handleOnClickEvents}
			>
				{t('edit')}
			</Item>
			<Separator />

			<Item id='new_folder' onClick={handleOnClickEvents}>
				{t('newFolder')}
			</Item>
			<Item
				disabled={highlight.length === 0 || highlight.length !== 1}
				id='rename_work'
				onClick={handleOnClickEvents}
			>
				{t('rename')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length === 0}
				id='delete_work'
				onClick={handleOnClickEvents}
			>
				{t('delete')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length !== 1}
				id='attr_work'
				onClick={handleOnClickEvents}
			>
				{t('attr')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				id='chgrp_work'
				onClick={handleOnClickEvents}
			>
				{t('chgrp')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				id='chown_work'
				onClick={handleOnClickEvents}
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
