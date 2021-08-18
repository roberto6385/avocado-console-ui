import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DropList from '../File/DropList';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import {
	ADD_HIGHLIGHT,
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	CD_REQUEST,
	CREATE_NEW_WEBSOCKET_REQUEST,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
	REMOVE_TEMP_HIGHLIGHT,
	TEMP_HIGHLIGHT,
} from '../../../reducers/sftp';
import {sortFunction} from '../functions';
import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';

const DropList_ = ({uuid}) => {
	const dispatch = useDispatch();

	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {userData} = useSelector(authSelector.all);
	const {
		path: sftpPath,
		file: sftpFile,
		high: sftpHigh,
		socket: sftpSocket,
		etc: sftpEtc,
		download: sftpDownload,
	} = useSelector((state) => state.sftp, shallowEqual);

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
	const {path, pathList} = useMemo(
		() => sftpPath.find((it) => it.uuid === uuid),
		[sftpPath, uuid],
	);
	const {readSocket, readList} = useMemo(
		() => sftpDownload.find((it) => it.uuid === uuid),
		[sftpDownload, uuid],
	);
	const {fileList, tempFile} = useMemo(
		() => sftpFile.find((it) => it.uuid === uuid),
		[sftpFile, uuid],
	);
	const {highlight} = useMemo(
		() => sftpHigh.find((it) => it.uuid === uuid),
		[sftpHigh, uuid],
	);
	const {socket} = useMemo(
		() => sftpSocket.find((it) => it.uuid === uuid),
		[sftpSocket, uuid],
	);
	const {sortKeyword, toggle} = useMemo(
		() => sftpEtc.find((it) => it.uuid === uuid),
		[sftpEtc, uuid],
	);

	const [currentFileList, setCurrentFileList] = useState([]);
	const [currentKey, setCurrentKey] = useState(sortKeyword);
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});

	const compareItem = useCallback(
		(list, first, second) => {
			if (first === -1) {
				dispatch({
					type: ADD_HIGHLIGHT,
					payload: {uuid, item: {...list[second], path}},
				});
				return;
			}

			if (first !== -1 && first <= second) {
				dispatch({
					type: INITIALIZING_HIGHLIGHT,
					payload: {uuid},
				});
				for (let i = first; i <= second; i++) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item: {...list[i], path}},
					});
				}
			} else {
				dispatch({
					type: INITIALIZING_HIGHLIGHT,
					payload: {uuid},
				});
				for (let i = first; i >= second; i--) {
					dispatch({
						type: ADD_HIGHLIGHT,
						payload: {uuid, item: {...list[i], path}},
					});
				}
			}
		},
		[dispatch, path, uuid],
	);

	const selectFile = useCallback(
		({item, listindex, itemIndex}) =>
			(e) => {
				console.log(item, listindex, itemIndex);
				if (e.shiftKey) {
					if (path !== pathList[listindex]) {
						dispatch({
							type: CD_REQUEST,
							payload: {
								socket: socket,
								path: path,
								uuid: uuid,
								cd_path: pathList[listindex],
							},
						});
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
					} else {
						if (highlight.length === 0) {
							dispatch({
								type: ADD_ONE_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
							});
						} else {
							if (highlight[0].name === path.split('/').pop()) {
								dispatch({
									type: INITIALIZING_HIGHLIGHT,
									payload: {uuid},
								});
							}
							const corList = currentFileList[listindex];
							const firstIndex = corList.findIndex(
								(it) => it?.name === highlight[0].name,
							);
							compareItem(corList, firstIndex, itemIndex);
						}
					}
				} else if (e.metaKey) {
					if (path !== pathList[listindex]) {
						if (
							tempFile !== null &&
							tempFile.path === pathList[listindex]
						) {
							dispatch({
								type: CD_REQUEST,
								payload: {
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: pathList[listindex],
								},
							});
							dispatch({
								type: ADD_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
							});
							dispatch({
								type: ADD_HIGHLIGHT,
								payload: {uuid, item: {...tempFile.item, path}},
							});
							dispatch({
								type: REMOVE_TEMP_HIGHLIGHT,
								payload: {uuid},
							});
							return;
						}

						if (item.type === 'file') {
							dispatch({
								type: CD_REQUEST,
								payload: {
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: pathList[listindex],
								},
							});
							dispatch({
								type: ADD_ONE_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
							});
						} else {
							dispatch({
								type: CD_REQUEST,
								payload: {
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: `${pathList[listindex]}/${item.name}`,
								},
							});
							dispatch({
								type: TEMP_HIGHLIGHT,
								payload: {
									uuid,
									item,
									path: pathList[listindex],
								},
							});
						}
					} else {
						highlight.find((it) => it.name === item.name) ===
						undefined
							? dispatch({
									type: ADD_HIGHLIGHT,
									payload: {uuid, item: {...item, path}},
							  })
							: dispatch({
									type: REMOVE_HIGHLIGHT,
									payload: {uuid, item: {...item, path}},
							  });
					}
				} else {
					if (pathList.length !== fileList.length) return;
					const finalPath =
						item.type === 'directory'
							? pathList[listindex] === '/'
								? `${pathList[listindex]}${item.name}`
								: `${pathList[listindex]}/${item.name}`
							: pathList[listindex];
					if (path !== finalPath) {
						dispatch({
							type: CD_REQUEST,
							payload: {
								socket: socket,
								path: path,
								uuid: uuid,
								cd_path: finalPath,
							},
						});
					}
					item.type === 'file' &&
						dispatch({
							type: ADD_ONE_HIGHLIGHT,
							payload: {uuid, item: {...item, path}},
						});
				}
			},
		[
			path,
			fileList,
			pathList,
			dispatch,
			socket,
			uuid,
			highlight,
			currentFileList,
			compareItem,
			tempFile,
		],
	);

	const handleEdit = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: item.name,
						size: item.size,
						todo: 'edit',
						progress: 0,
						path: path,
						file: item,
						key: 'read',
					},
				});
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
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userData,
			resource.host,
			resource.port,
			account.user,
			account.password,
		],
	);

	const handleDownload = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			if (item.name !== '..' && item.type !== 'directory') {
				// 현재는 디렉토리 다운로드 막아두었음.
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: item.name,
						size: item.size,
						todo: 'read',
						progress: 0,
						path: path,
						file: item,
					},
				});
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
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userData,
			resource.host,
			resource.port,
			account.user,
			account.password,
		],
	);

	const handleContextMenu = useCallback(
		({item, clickedPath}) =>
			(e) => {
				e.preventDefault();
				e.stopPropagation();

				if (path !== clickedPath) {
					dispatch({
						type: CD_REQUEST,
						payload: {
							socket: socket,
							path: path,
							uuid: uuid,
							cd_path: clickedPath,
						},
					});
				}

				highlight.length < 2 &&
					item !== undefined &&
					clickedPath !== undefined &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item: {...item, path}},
					});
				show(e);
			},
		[path, highlight, dispatch, uuid, show, socket],
	);

	useEffect(() => {
		if (
			fileList.length === pathList.length &&
			pathList.length !== 0 &&
			fileList.length !== 0
		) {
			let nextList = [];
			fileList.forEach((v) => {
				nextList.push(
					sortFunction({
						fileList: v,
						keyword: sortKeyword,
						toggle: currentKey === sortKeyword ? toggle : true,
					}),
				);
			});
			setCurrentKey(sortKeyword);
			setCurrentFileList(nextList);
		}
	}, [fileList, sortKeyword, toggle, path, pathList, currentKey]);

	return (
		<DropList
			uuid={uuid}
			list={currentFileList}
			pathList={pathList}
			onContextMenu={handleContextMenu}
			highlight={highlight}
			path={path}
			onClick={selectFile}
			onDownload={handleDownload}
			onEdit={handleEdit}
		/>
	);
};

DropList_.propTypes = {
	uuid: PropTypes.string.isRequired,
};
export default DropList_;
