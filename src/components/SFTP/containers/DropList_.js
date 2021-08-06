import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import DropList from '../File/DropList';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import {
	ADD_HIGHLIGHT,
	ADD_HISTORY,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	createNewWebsocket,
	INITIALIZING_HIGHLIGHT,
	REMOVE_HIGHLIGHT,
	REMOVE_TEMP_HIGHLIGHT,
	TEMP_HIGHLIGHT,
} from '../../../reducers/sftp';
import {sortFunction} from '../functions';

const DropList_ = ({uuid}) => {
	const dispatch = useDispatch();

	const {tab, server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
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

	const {
		path: sftp_pathState,
		file: sftp_fileState,
		high: sftp_highState,
		socket: sftp_socketState,
		etc: sftp_etcState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {path, pathList} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {readSocket, readList} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);
	const {fileList, tempFile} = useMemo(
		() => sftp_fileState.find((it) => it.uuid === uuid),
		[sftp_fileState, uuid],
	);
	const {highlight} = useMemo(
		() => sftp_highState.find((it) => it.uuid === uuid),
		[sftp_highState, uuid],
	);
	const {socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);
	const {sortKeyword, toggle} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);

	const correspondedIdentity = useMemo(
		() =>
			identity.find(
				(it) => it.key === corTab.server.key && it.checked === true,
			),
		[identity, corTab],
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
						dispatch(
							commandCdAction({
								socket: socket,
								path: path,
								uuid: uuid,
								cd_path: pathList[listindex],
							}),
						);
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
							dispatch(
								commandCdAction({
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: pathList[listindex],
								}),
							);
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
							dispatch(
								commandCdAction({
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: pathList[listindex],
								}),
							);
							dispatch({
								type: ADD_ONE_HIGHLIGHT,
								payload: {uuid, item: {...item, path}},
							});
						} else {
							dispatch(
								commandCdAction({
									socket: socket,
									path: path,
									uuid: uuid,
									cd_path: `${pathList[listindex]}/${item.name}`,
								}),
							);
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
						dispatch(
							commandCdAction({
								socket: socket,
								path: path,
								uuid: uuid,
								cd_path: finalPath,
							}),
						);
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
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer.host,
			corServer.port,
			correspondedIdentity.user,
			correspondedIdentity.password,
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
			}
		},
		[
			readList,
			readSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer.host,
			corServer.port,
			correspondedIdentity.user,
			correspondedIdentity.password,
		],
	);

	const handleContextMenu = useCallback(
		({item, clickedPath}) =>
			(e) => {
				e.preventDefault();
				e.stopPropagation();

				if (path !== clickedPath) {
					dispatch(
						commandCdAction({
							socket: socket,
							path: path,
							uuid: uuid,
							cd_path: clickedPath,
						}),
					);
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
