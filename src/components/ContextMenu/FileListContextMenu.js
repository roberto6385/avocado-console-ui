import React, {useCallback, useMemo} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';
import {OPEN_INPUT_POPUP, OPEN_WARNING_ALERT_POPUP} from '../../reducers/popup';
import {createNewWebsocket, PUSH_READ_LIST} from '../../reducers/sftp/crud';
import {ContextMenu} from '../../styles/default';

const FileListContextMenu = ({uuid}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme, server, tab, identity} = useSelector((state) => state.common);

	const corSftpInfo = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const corTab = useMemo(() => tab.find((it) => it.uuid === uuid), [
		tab,
		uuid,
	]);
	const {userTicket} = useSelector((state) => state.userTicket);
	const corServer = useMemo(
		() => server.find((it) => it.key === corTab.server.key),
		[corTab],
	);

	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
	);
	const {highlight, path} = corSftpInfo;

	const contextDownload = useCallback(async () => {
		const array = [];
		for await (let value of highlight) {
			array.push({path, file: value, todo: 'read'});
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
		dispatch({
			type: PUSH_READ_LIST,
			payload: {uuid, array},
		});
	}, [uuid, corSftpInfo, corServer, correspondedIdentity, userTicket]);

	const contextEdit = useCallback(() => {
		for (let value of highlight) {
			dispatch({
				type: PUSH_READ_LIST,
				payload: {uuid, array: [{path, file: value, todo: 'edit'}]},
			});
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
	}, [corSftpInfo, corServer, correspondedIdentity, userTicket, uuid]);

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
						type: OPEN_INPUT_POPUP,
						data: {key: 'sftp_new_folder', uuid: uuid},
					});
					break;
				case 'rename_work':
					dispatch({
						type: OPEN_INPUT_POPUP,
						data: {
							key: 'sftp_rename_file_folder',
							uuid: uuid,
						},
					});
					break;
				case 'delete_work':
					dispatch({
						type: OPEN_WARNING_ALERT_POPUP,
						data: {
							key: 'sftp_delete_file_folder',
							uuid: uuid,
						},
					});
					break;
				default:
					return;
			}
		},
		[uuid],
	);
	return (
		<ContextMenu
			id={uuid + 'fileList'}
			animation={animation.slide}
			theme_value={theme}
		>
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
		</ContextMenu>
	);
};

FileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContextMenu;
