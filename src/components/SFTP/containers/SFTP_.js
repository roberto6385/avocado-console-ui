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

const SFTP_ = ({uuid}) => {
	const dispatch = useDispatch();
	const {selectedTab} = useSelector(tabBarSelector.all);
	const {
		upload: sftp_uploadState,
		download: sftp_downloadState,
		delete: sftp_deleteState,
		high: sftp_highState,
		socket: sftp_socketState,
		etc: sftp_etcState,
		history: sftp_historyState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const {
		writeList,
		writeSocket,
		pass: upPass,
	} = sftp_uploadState.find((it) => it.uuid === uuid);
	const {
		readList,
		readSocket,
		pass: downPass,
	} = sftp_downloadState.find((it) => it.uuid === uuid);
	const {
		incinerator,
		removeSocket,
		initList,
		initPath,
		total,
		pass: deletePass,
	} = sftp_deleteState.find((it) => it.uuid === uuid);

	const {highlight} = sftp_highState.find((it) => it.uuid === uuid);
	const {socket} = sftp_socketState.find((it) => it.uuid === uuid);
	const {mode} = sftp_etcState.find((it) => it.uuid === uuid);
	const {history_highlight, history} = sftp_historyState.find(
		(it) => it.uuid === uuid,
	);

	const body = document.getElementById('root');
	const focusOut = useCallback(
		function (evt) {
			if (!uuid || selectedTab !== uuid) return;
			if (highlight.length === 0 && history_highlight.length === 0) {
				return;
			}
			const root = evt.target;

			// if (highlight.length !== 0 || history_highlight.length !== 0) {
			const th = Array.from(evt.currentTarget.querySelectorAll('th'));
			const path = Array.from(evt.currentTarget.querySelectorAll('path'));
			const filelist_contents = Array.from(
				evt.currentTarget.querySelectorAll('.filelist_contents'),
			);

			const history_contents = Array.from(
				evt.currentTarget.querySelectorAll('.history_contents'),
			);
			const context = Array.from(
				evt.currentTarget.querySelectorAll(
					'.react-contexify__item__content',
				),
			);
			if (
				!th.includes(root) &&
				!path.includes(root) &&
				!filelist_contents.includes(root) &&
				!history_contents.includes(root) &&
				!context.includes(root)
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
		body.addEventListener('click', focusOut);

		return function cleanUp() {
			body.removeEventListener('click', focusOut);
		};
	}, [body, focusOut]);

	useEffect(() => {
		if (readList.length !== 0 && readSocket !== null) {
			if (!downPass) return;
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
	}, [downPass, dispatch, mode, readList, readSocket, socket, uuid]);

	useEffect(() => {
		if (writeList.length !== 0 && writeSocket !== null) {
			if (!upPass) return;
			const value = writeList.slice().shift();
			console.log(value);
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
	}, [upPass, writeList, writeSocket, socket, uuid, dispatch]);

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
			const key = keyValue ? keyValue : value.file.name;
			console.log(key);
			const totalLength = total.slice().shift().length;
			console.log(totalLength);
			const Remaining = incinerator.filter(
				(v) =>
					v.path.replace(deleteHistory.path, '').split('/')[1] ===
					deleteHistory.name,
			);

			const percent =
				((totalLength - Remaining.length) / totalLength) * 100;
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
						percent: percent,
						key: key,
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
					const key =
						item.path === '/'
							? item.path + item.file.name
							: item.path + '/' + item.file.name;
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
							key,
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
						console.log(item);
						const key =
							item.path === '/'
								? item.path + item.file.name
								: item.path + '/' + item.file.name;
						const delete_path =
							initPath === '/'
								? `${initPath}${item.file.name}`
								: `${initPath}/${item.file.name}`;
						dispatch({
							type: LS_REQUEST_DELETE,
							payload: {
								socket: removeSocket,
								uuid: uuid,
								delete_path: delete_path,
								key,
							},
						});
					}
				}
			}
		}
	}, [initList, initPath, dispatch, uuid, removeSocket]);

	return <SFTP uuid={uuid} mode={mode} />;
};

SFTP_.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTP_;
