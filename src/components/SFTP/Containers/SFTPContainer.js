import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	DELETE_PASS,
	DELETE_WORK_LIST,
	DELETE_WORK_TRANSPORTER,
	INITIAL_HISTORY_HI,
	INITIALIZING_HIGHLIGHT,
	LS_REQUEST_DELETE,
	READ_PASS,
	READ_REQUEST,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	RM_REQUEST,
	WRITE_PASS,
	WRITE_REQUEST,
} from '../../../reducers/sftp';
import SFTP from '../SFTP';
import {tabBarSelector} from '../../../reducers/tabBar';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {selectedTab} = useSelector(tabBarSelector.all);
	const {
		upload: sftpUpload,
		download: sftpDownload,
		delete: sftpDelete,
		high: sftpHigh,
		socket: sftpSocket,
		etc: sftpEtc,
		history: sftpHistory,
	} = useSelector((state) => state.sftp, shallowEqual);

	const {
		writeList,
		writeSocket,
		pass: uploadPass,
	} = sftpUpload.find((it) => it.uuid === uuid);
	const {
		readList,
		readSocket,
		pass: downloadPass,
	} = sftpDownload.find((it) => it.uuid === uuid);
	const {
		incinerator,
		removeSocket,
		initList,
		initPath,
		total,
		pass: deletePass,
	} = sftpDelete.find((it) => it.uuid === uuid);

	const {highlight} = sftpHigh.find((it) => it.uuid === uuid);
	const {socket} = sftpSocket.find((it) => it.uuid === uuid);
	const {mode} = sftpEtc.find((it) => it.uuid === uuid);
	const {history_highlight, history} = sftpHistory.find(
		(it) => it.uuid === uuid,
	);

	const onClickFocusOut = useCallback(
		(e) => {
			if (!uuid || selectedTab !== uuid) return;
			if (highlight.length === 0 && history_highlight.length === 0) {
				return;
			}
			const root = e.target;
			const th = Array.from(e.currentTarget.querySelectorAll('th'));
			const path = Array.from(e.currentTarget.querySelectorAll('path'));
			const filelistContent = Array.from(
				e.currentTarget.querySelectorAll('.filelist-content'),
			);

			const historyContent = Array.from(
				e.currentTarget.querySelectorAll('.history-content'),
			);
			const content = Array.from(
				e.currentTarget.querySelectorAll(
					'.react-contexify__item__content',
				),
			);

			if (
				!th.includes(root) &&
				!path.includes(root) &&
				!filelistContent.includes(root) &&
				!historyContent.includes(root) &&
				!content.includes(root)
			) {
				dispatch({
					type: INITIALIZING_HIGHLIGHT,
					payload: {uuid},
				});
				dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});
			}
		},
		[selectedTab, dispatch, highlight, history_highlight, uuid],
	);

	useEffect(() => {
		document
			.getElementById('root')
			.addEventListener('click', onClickFocusOut);

		return function cleanUp() {
			document
				.getElementById('root')
				.removeEventListener('click', onClickFocusOut);
		};
	}, [onClickFocusOut]);

	useEffect(() => {
		if (readList.length !== 0 && readSocket !== null) {
			if (!downloadPass) return;
			const value = readList.slice().shift();
			dispatch({
				type: READ_REQUEST,
				payload: {
					socket: socket,
					read_socket: readSocket,
					uuid: uuid,
					read_path: value.path,
					file: value.file,
					mode: mode,
					todo: value.todo,
					offset: value?.offset,
				},
			});
			dispatch({type: READ_PASS, payload: {uuid}});
		}
		if (readList.length === 0 && readSocket !== null) {
			dispatch({
				type: REMOVE_NEW_WEBSOCKET_REQUEST,
				payload: {
					socket: readSocket,
					todo: 'read',
					uuid: uuid,
				},
			});
		}
	}, [downloadPass, dispatch, mode, readList, readSocket, socket, uuid]);

	useEffect(() => {
		if (writeList.length !== 0 && writeSocket !== null) {
			if (!uploadPass) return;
			const value = writeList.slice().shift();
			dispatch({
				type: WRITE_REQUEST,
				payload: {
					socket: socket,
					write_socket: writeSocket,
					uuid: uuid,
					write_path: value.path,
					file: value.file,
					todo: value.todo,
					offset: value?.offset,
				},
			});
			dispatch({type: WRITE_PASS, payload: {uuid}});
		}
		if (writeList.length === 0 && writeSocket !== null) {
			dispatch({
				type: REMOVE_NEW_WEBSOCKET_REQUEST,
				payload: {
					socket: writeSocket,
					todo: 'write',
					uuid: uuid,
				},
			});
		}
	}, [uploadPass, writeList, writeSocket, socket, uuid, dispatch]);

	useEffect(() => {
		if (incinerator.length !== 0 && removeSocket !== null) {
			if (!deletePass) return;
			const deleteHistory = history
				.slice()
				.reverse()
				.find((v) => v.todo === 'rm' && v.progress !== 100);
			const value = incinerator.slice().shift();
			const keyValue = value.path
				.replace(deleteHistory.path, '')
				.split('/')[1];
			const totalLength = total.slice().shift().length;
			const remaining = incinerator.filter(
				(v) =>
					v.path.replace(deleteHistory.path, '').split('/')[1] ===
					deleteHistory.name,
			);

			if (value.file.name !== '..' || value.file.name !== '.') {
				dispatch({
					type: RM_REQUEST,
					payload: {
						socket: socket,
						remove_socket: removeSocket,
						uuid: uuid,
						file: value.file,
						rm_path: value.path,
						todo: 'rm',
						percent:
							((totalLength - remaining.length) / totalLength) *
							100,
						key: keyValue ? keyValue : value.file.name,
						keyword:
							value.file.type === 'file'
								? 'CommandByRm'
								: 'CommandByRmdir',
					},
				});
				dispatch({type: DELETE_PASS, payload: {uuid}});
			}
		}
	}, [
		deletePass,
		incinerator,
		removeSocket,
		socket,
		uuid,
		dispatch,
		history,
		total,
	]);

	useEffect(() => {
		if (removeSocket !== null && initList.length !== 0) {
			const array = [];
			for (let value of initList) {
				if (value.name !== '.' && value.name !== '..') {
					array.push({file: value, path: initPath});
					const item = {file: value, path: initPath};
					dispatch({
						type: ADD_HISTORY,
						payload: {
							uuid: uuid,
							name: value.name,
							size: value.size,
							todo: 'rm',
							progress: 0,
							path: initPath,
							file: value,
						},
					});
					dispatch({
						type: DELETE_WORK_LIST,
						payload: {
							uuid: uuid,
							item,
							key:
								item.path === '/'
									? item.path + item.file.name
									: item.path + '/' + item.file.name,
						},
					});
				}
			}

			if (
				array.slice().filter((v) => v.file.type === 'directory')
					.length === 0
			) {
				dispatch({
					type: DELETE_WORK_TRANSPORTER,
					payload: {
						uuid: uuid,
					},
				});
			} else {
				for (let item of array.slice()) {
					if (item.file.type === 'directory') {
						dispatch({
							type: LS_REQUEST_DELETE,
							payload: {
								socket: removeSocket,
								uuid: uuid,
								delete_path:
									initPath === '/'
										? `${initPath}${item.file.name}`
										: `${initPath}/${item.file.name}`,
								key:
									item.path === '/'
										? item.path + item.file.name
										: item.path + '/' + item.file.name,
							},
						});
					}
				}
			}
		}
	}, [initList, initPath, dispatch, uuid, removeSocket]);

	return <SFTP uuid={uuid} mode={mode} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
