import React, {useCallback, useEffect, useMemo, useState} from 'react';
import FileList from '../File/FileList';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import {CD_REQUEST, INITIALIZING_HIGHLIGHT} from '../../../reducers/sftp';
import {authSelector} from '../../../reducers/api/auth';
import {settingSelector} from '../../../reducers/setting';
import {tabBarSelector} from '../../../reducers/tabBar';

import {remoteResourceSelector} from '../../../reducers/remoteResource';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import {sortList} from '../../../utils/sftp';

const FileListContianer = ({uuid}) => {
	const dispatch = useDispatch();
	const {resources, accounts} = useSelector(remoteResourceSelector.all);

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {language} = useSelector(settingSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const {userData} = useSelector(authSelector.all);

	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);
	const resource = useMemo(
		() => resources.find((it) => it.key === terminalTab.server.key),
		[terminalTab.server.key, resources],
	);
	const account = useMemo(
		() =>
			accounts.find(
				(it) =>
					it.key === terminalTab.server.key && it.checked === true,
			),
		[accounts, terminalTab],
	);

	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);
	const {show} = useContextMenu({
		id: uuid + '-file-list-context-menu',
	});

	const [sortedFiles, setSortedFiles] = useState([]);
	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sftp.sort.type);

	const onClickChangePath = useCallback(
		(item) => () => {
			if (item.type === 'directory') {
				// 디렉토리 클릭시 해당 디렉토리로 이동
				// const path =
				// 	sftp.path === '/'
				// 		? sftp.path + item.name
				// 		: sftp.path + '/' + item.name;
				// dispatch({
				// 	type: CD_REQUEST,
				// 	payload: {
				// 		socket: sftp.socket,
				// 		uuid: uuid,
				// 		path: sftp.path,
				// 		cd_path: path,
				// 	},
				// });
				// dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});
			}
		},
		[],
	);

	const onClickDownloadFile = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				// dispatch({
				// 	type: ADD_HISTORY,
				// 	payload: {
				// 		uuid: uuid,
				// 		name: item.name,
				// 		size: item.size,
				// 		todo: 'read',
				// 		progress: 0,
				// 		path: path,
				// 		file: item,
				// 	},
				// });
				// if (!readSocket && readList.length === 0) {
				// 	dispatch({
				// 		type: CREATE_NEW_WEBSOCKET_REQUEST,
				// 		paylaod: {
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
		(item = '') =>
			(e) => {
				e.preventDefault();
				if (item.name === '..' || item.name === '') return;
				show(e);
				// !highlight
				// 	.slice()
				// 	.find(
				// 		(v) =>
				// 			JSON.stringify(v) ===
				// 			JSON.stringify({...item, path}),
				// 	) &&
				// 	item !== '' &&
				// 	dispatch({
				// 		type: ADD_ONE_HIGHLIGHT,
				// 		payload: {uuid, item: {...item, path}},
				// 	});
			},
		[show],
	);

	const compareFiles = useCallback((total, select, criterion) => {
		console.log(select);
		console.log(criterion);
		let selectedIndex = total.findIndex((v) => v.name === select.name);
		let lastIndex = total.findIndex((v) => v.name === criterion.name);
		const array = [];
		if (selectedIndex === lastIndex) return;
		while (lastIndex !== selectedIndex) {
			array.push(total[lastIndex]);
			selectedIndex > lastIndex ? lastIndex++ : lastIndex--;
		}
		array.push(select);
		console.log(array);
		return array;
	}, []);

	console.log(sftp.selected.files.slice());
	const onClickSelectFile = useCallback(
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
					result = compareFiles(sortedFiles, item, result[0]);
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
		[compareFiles, dispatch, sftp.selected.files, sortedFiles, uuid],
	);

	useEffect(() => {
		if (sftp.files[sftp.path]) {
			const files = sortList({
				fileList: sftp.files[sftp.path],
				keyword: sftp.sort.type,
				toggle: sftp.sort.asc,
			});
			console.log(files);
			setSortedFiles(files);
		}
	}, [sftp.files, sftp.path, sftp.sort.asc, sftp.sort.type]);

	return (
		<FileList
			uuid={uuid}
			highlight={sftp.selected.files}
			path={sftp.path}
			lang={language}
			list={sortedFiles}
			onContextMenu={openFileListContextMenu}
			onClick={onClickSelectFile}
			onDownload={onClickDownloadFile}
			onEdit={onClickEditFile}
			onDoubleClick={onClickChangePath}
		/>
	);
};

FileListContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContianer;
