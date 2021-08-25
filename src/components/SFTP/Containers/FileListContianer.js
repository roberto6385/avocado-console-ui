import React, {useCallback, useEffect, useMemo, useState} from 'react';
import FileList from '../File/FileList';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import {settingSelector} from '../../../reducers/setting';
import {tabBarSelector} from '../../../reducers/tabBar';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import {compareFiles, compareTypes, sortingUtil} from '../../../utils/sftp';

const FileListContianer = ({uuid}) => {
	const dispatch = useDispatch();

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {language} = useSelector(settingSelector.all);
	const {data} = useSelector(sftpSelector.all);

	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);

	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);
	const {show} = useContextMenu({
		id: uuid + '-file-list-context-menu',
	});

	const [sortedFiles, setSortedFiles] = useState([]);

	const handleChangePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				const path =
					sftp.path === '/'
						? sftp.path + item.name
						: sftp.path + '/' + item.name;
				dispatch(
					sftpAction.commandCd({
						socket: sftp.socket,
						uuid: uuid,
						path: path,
					}),
				);
			}
		},
		[dispatch, sftp.path, sftp.socket, uuid],
	);

	const onClickDownloadFile = useCallback(
		(item) => () => {
			if (item.type === 'directory') return;

			dispatch(
				sftpAction.addList({
					uuid: uuid,
					type: types.download,
					value: {path: sftp.path, file: item},
				}),
			);

			dispatch(
				sftpAction.addHistory({
					uuid: uuid,
					history: {
						name: item.name,
						size: item.size,
						type: types.download,
					},
				}),
			);

			if (!sftp.download.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: types.download,
					}),
				);
			}
		},
		[dispatch, sftp, terminalTab, uuid],
	);

	const onClickEditFile = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			console.log(item);
			if (item.name !== '..' && item.type !== 'directory') {
				// dispatch({
				// 	type: ADD_HISTORY,
				// 	payload: {
				// 		uuid: uuid,
				// 		name: item.name,
				// 		size: item.size,
				// 		todo: 'edit',
				// 		progress: 0,
				// 		path: path,
				// 		file: item,
				// 		key: 'read',
				// 	},
				// });
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
			}
		},
		[],
	);

	const openFileListContextMenu = useCallback(
		(item = null) =>
			(e) => {
				e.preventDefault();
				if (item) {
					if (item.name === '..') return;
					let result = sftp.selected.files.slice();
					if (result.length === 0 || result.length === 1) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: [item],
							}),
						);
					}
				}
				show(e);
			},
		[dispatch, sftp.selected.files, show, uuid],
	);

	const handleSelectFile = useCallback(
		(item) => (e) => {
			if (item.name === '..') return;

			let result = sftp.selected.files.slice();
			if (e.metaKey) {
				if (result.find((v) => v.name === item.name)) {
					result = result.filter((v) => v.name !== item.name);
				} else {
					result.push(item);
				}
			} else if (e.shiftKey) {
				if (result.length === 0) {
					const files = sortedFiles.filter(
						(v) => v.name !== '..' && v.name !== '.',
					);
					console.log(files);
					const index = files.findIndex((v) => v.name === item.name);
					result = files.slice(0, index + 1);
				} else {
					result = compareFiles(
						sortedFiles,
						item,
						result[0],
						compareTypes.name,
					);
				}
			} else {
				result = [item];
			}
			dispatch(
				sftpAction.setSelectedFile({
					uuid: uuid,
					result: result,
				}),
			);
		},
		[dispatch, sftp.selected.files, sortedFiles, uuid],
	);

	useEffect(() => {
		if (sftp.files[sftp.path]) {
			setSortedFiles(
				sortingUtil({
					array: sftp.files[sftp.path],
					type: sftp.sort.type,
					asc: sftp.sort.asc,
				}),
			);
		}
	}, [sftp.files, sftp.path, sftp.sort.asc, sftp.sort.type]);

	return (
		<FileList
			uuid={uuid}
			highlight={sftp.selected.files}
			path={sftp.path}
			language={language}
			list={sortedFiles}
			onContextMenu={openFileListContextMenu}
			onSelectFile={handleSelectFile}
			onDownload={onClickDownloadFile}
			onEdit={onClickEditFile}
			onChangePath={handleChangePath}
		/>
	);
};

FileListContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContianer;
