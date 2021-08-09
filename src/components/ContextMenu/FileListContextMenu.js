import React, {useCallback, useMemo} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {ADD_HISTORY, createNewWebsocket} from '../../reducers/sftp';
import {ContextMenu} from '../../styles/components/contextMenu';
import {
	OPEN_INPUT_DIALOG_BOX,
	OPEN_FILE_STATUS_DIALOG_BOX,
	OPEN_DELETE_DIALOG_BOX,
} from '../../reducers/dialogBoxs';

const FileListContextMenu = ({uuid}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('contextMenu');

	const {
		path: sftp_pathState,
		high: sftp_highState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {server, tab, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

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
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
	);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab.server.key, server],
	);

	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);

	const contextDownload = useCallback(async () => {
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
			dispatch(
				createNewWebsocket({
					token: userTicket.access_token, // connection info
					host: corServer.host,
					port: corServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,
					todo: 'read',
					uuid: uuid,
				}),
			);
		}
	}, [
		readList,
		readSocket,
		dispatch,
		uuid,
		highlight,
		path,
		userTicket,
		corServer,
		correspondedIdentity,
	]);

	const contextEdit = useCallback(() => {
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
			dispatch(
				createNewWebsocket({
					token: userTicket.access_token, // connection info
					host: corServer.host,
					port: corServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,
					todo: 'read',
					uuid: uuid,
				}),
			);
		}
	}, [
		readList,
		readSocket,
		highlight,
		dispatch,
		uuid,
		path,
		userTicket,
		corServer,
		correspondedIdentity,
	]);

	const handleItemClick = useCallback(
		async ({event}) => {
			switch (event.currentTarget.id) {
				case 'download':
					await contextDownload();
					break;
				case 'edit':
					contextEdit(event);
					break;
				case 'new_folder':
					dispatch({
						type: OPEN_INPUT_DIALOG_BOX,
						payload: {key: 'sftp_new_folder', uuid: uuid},
					});
					break;
				case 'rename_work':
					dispatch({
						type: OPEN_INPUT_DIALOG_BOX,
						payload: {key: 'sftp_rename_file_folder', uuid: uuid},
					});
					break;
				case 'delete_work':
					dispatch({
						type: OPEN_DELETE_DIALOG_BOX,
						payload: {key: 'sftp_delete_file_folder', uuid: uuid},
					});
					break;

				case 'attr_work':
					dispatch({
						type: OPEN_FILE_STATUS_DIALOG_BOX,
						payload: {key: 'sftp_stat', uuid: uuid},
					});
					break;

				case 'chgrp_work':
					dispatch({
						type: OPEN_INPUT_DIALOG_BOX,
						payload: {key: 'sftp_chgrp', uuid: uuid},
					});
					break;

				case 'chown_work':
					dispatch({
						type: OPEN_INPUT_DIALOG_BOX,
						payload: {key: 'sftp_chown', uuid: uuid},
					});
					break;
				default:
					return;
			}
		},
		[contextDownload, contextEdit, dispatch, uuid],
	);
	return (
		<ContextMenu id={uuid + 'fileList'} animation={animation.slide}>
			<Item
				disabled={highlight.length === 0}
				id='download'
				onClick={handleItemClick}
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
				onClick={handleItemClick}
			>
				{t('edit')}
			</Item>
			<Separator />

			<Item id='new_folder' onClick={handleItemClick}>
				{t('newFolder')}
			</Item>
			<Item
				disabled={highlight.length === 0 || highlight.length !== 1}
				id='rename_work'
				onClick={handleItemClick}
			>
				{t('rename')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length === 0}
				id='delete_work'
				onClick={handleItemClick}
			>
				{t('delete')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length !== 1}
				id='attr_work'
				onClick={handleItemClick}
			>
				{t('attr')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				id='chgrp_work'
				onClick={handleItemClick}
			>
				{t('chgrp')}
			</Item>

			<Item
				disabled={highlight.length !== 1}
				id='chown_work'
				onClick={handleItemClick}
			>
				{t('chown')}
			</Item>
		</ContextMenu>
	);
};

FileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContextMenu;
