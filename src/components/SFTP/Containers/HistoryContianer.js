import React, {useCallback, useMemo, useState} from 'react';
import History from '../History/History';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	ADD_HISTORY_HI,
	CREATE_NEW_WEBSOCKET_REQUEST,
	INITIAL_HISTORY_HI,
	PUSH_PAUSE_READ_LIST,
	PUSH_PAUSE_WRITE_LIST,
	PWD_REQUEST,
	REMOVE_HISTORY,
	REMOVE_NEW_WEBSOCKET_REQUEST,
	REMOVE_READ_WRITE_LIST,
} from '../../../reducers/sftp';
import * as PropTypes from 'prop-types';
import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';
import {remoteResourceSelector} from '../../../reducers/remoteResource';

const HistoryContianer = ({uuid}) => {
	const dispatch = useDispatch();
	const [prevOffset, setPrevOffset] = useState(null);
	const {userData} = useSelector(authSelector.all);
	const {
		path: sftp_pathState,
		history: sftp_historyState,
		socket: sftp_socketState,
		upload: sftp_uploadState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {resources, accounts} = useSelector(remoteResourceSelector.all);

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);
	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {socket: sftp_socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);
	const {history, history_highlight, pause} = useMemo(
		() => sftp_historyState.find((it) => it.uuid === uuid),
		[sftp_historyState, uuid],
	);

	const resource = useMemo(
		() => resources.find((it) => it.key === terminalTab.server.key),
		[terminalTab.server.key, resources],
	);
	const account = useMemo(
		() =>
			accounts.find(
				(it) =>
					it.key === terminalTab.resourceId && it.checked === true,
			),
		[accounts, terminalTab],
	);
	const {writeSocket, writeList} = useMemo(
		() => sftp_uploadState.find((it) => it.uuid === uuid),
		[sftp_uploadState, uuid],
	);
	const {readSocket} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);

	const onClickUploadHistory = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			for await (let value of files) {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: path,
						file: value,
					},
				});
			}
			if (!writeSocket && writeList.length === 0) {
				dispatch({
					type: CREATE_NEW_WEBSOCKET_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: resource.host,
						port: resource.port,
						user: account.user,
						password: account.password,
						todo: 'write',
						uuid: uuid,
					},
				});
			}
		};
		document.body.removeChild(uploadInput);
	}, [
		dispatch,
		uuid,
		writeSocket,
		writeList,
		path,
		userData,
		resource,
		account,
	]);
	const onDropUploadHistory = useCallback(
		async (files) => {
			for await (let value of files) {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'write',
						progress: 0,
						path: path,
						file: value,
					},
				});
				console.log(value);
			}
			if (!writeSocket && writeList.length === 0) {
				dispatch({
					type: CREATE_NEW_WEBSOCKET_REQUEST,
					payload: {
						token: userData.access_token, // connection info
						host: resource.host,
						port: resource.port,
						user: account.user,
						password: account.password,
						todo: 'write',
						uuid: uuid,
					},
				});
			}
		},
		[
			writeList,
			writeSocket,
			dispatch,
			uuid,
			path,
			userData,
			resource,
			account,
		],
	);
	const compareHistories = useCallback(
		(first, second) => {
			dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});

			let list = [];
			if (first <= second) {
				for (let i = first; i <= second; i++) {
					list.push(history[i]);
				}
			} else {
				for (let i = first; i >= second; i--) {
					list.push(history[i]);
				}
			}
			dispatch({
				type: ADD_HISTORY_HI,
				payload: {
					uuid,
					history: list,
				},
			});
		},
		[dispatch, history, uuid],
	);

	const onClickSelectHistory = useCallback(
		(selectValue, index) => (e) => {
			e.stopPropagation();
			const prevHistory = history.slice();
			const prevHistoryHighlight = history_highlight.slice();
			if (e.metaKey) {
				if (prevHistoryHighlight.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: prevHistoryHighlight.filter(
								(item) => item !== selectValue,
							),
						},
					});
				} else {
					prevHistoryHighlight.push(selectValue);
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {uuid, history: prevHistoryHighlight},
					});
				}
			} else if (e.shiftKey) {
				if (prevHistoryHighlight.length === 0) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				} else {
					compareHistories(
						prevHistory.findIndex(
							(item) => item === prevHistoryHighlight[0],
						),
						index,
					);
				}
			} else {
				dispatch({
					type: ADD_HISTORY_HI,
					payload: {
						uuid,
						history: [selectValue],
					},
				});
			}
		},
		[compareHistories, dispatch, history, history_highlight, uuid],
	);

	//TODO progress가 0인 히스토리 삭제 시 작업삭제
	const onClickDeleteHistory = useCallback(
		(history) => () => {
			if (history.progress === 0) {
				console.log(history);
				dispatch({
					type: REMOVE_READ_WRITE_LIST,
					payload: {uuid, history},
				});
			}
			if (
				history.progress === 0 ||
				history.progress === 100 ||
				isNaN(history.progress)
			) {
				dispatch({type: REMOVE_HISTORY, payload: {uuid, history}});
			}
		},
		[dispatch, uuid],
	);

	const onClickChangeProgress = useCallback(
		(history) => () => {
			if (history.progress !== 100 && history.progress !== 0) {
				if (
					(history.todo === 'read' && readSocket) ||
					(history.todo === 'write' && writeSocket) ||
					(history.todo === 'edit' && (writeSocket || readSocket))
				) {
					if (history.todo === 'write') {
						if (history.path === path) {
							dispatch({
								type: PWD_REQUEST,
								payload: {
									socket: sftp_socket,
									uuid: uuid,
									pwd_path: path,
								},
							});
						}
					}
					dispatch({
						type: REMOVE_NEW_WEBSOCKET_REQUEST,
						payload: {
							socket:
								history.todo === 'write'
									? writeSocket
									: readSocket,
							uuid: uuid,
							todo: history.todo,
							key: history.key,
							path: history.path,
							file: history.file,
						},
					});
				} else {
					let item = pause
						.slice()
						.find(
							(v) =>
								v.file === history.file &&
								v.path === history.path &&
								v.todo === history.todo,
						);

					if (!item || item.offset === prevOffset) return;
					setPrevOffset(item.offset);

					dispatch({
						type:
							(history.todo === 'write' &&
								PUSH_PAUSE_WRITE_LIST) ||
							(history.todo === 'read' && PUSH_PAUSE_READ_LIST) ||
							(history.todo === 'edit' &&
								history.key === 'write' &&
								PUSH_PAUSE_WRITE_LIST) ||
							(history.todo === 'edit' &&
								history.key === 'read' &&
								PUSH_PAUSE_READ_LIST),
						payload: {
							uuid,
							array: {...item},
						},
					});

					dispatch({
						type: CREATE_NEW_WEBSOCKET_REQUEST,
						payload: {
							token: userData.access_token, // connection info
							host: resource.host,
							port: resource.port,
							user: account.user,
							password: account.password,
							todo: history.todo,
							uuid: uuid,
							key: history.key,
						},
					});
				}
			}
		},
		[
			readSocket,
			writeSocket,
			dispatch,
			uuid,
			path,
			sftp_socket,
			pause,
			prevOffset,
			userData,
			resource,
			account,
		],
	);

	return (
		<History
			history={history}
			highlight={history_highlight}
			writeSocket={writeSocket}
			readSocket={readSocket}
			onDropUpload={onDropUploadHistory}
			onClickUpload={onClickUploadHistory}
			onSelect={onClickSelectHistory}
			onChangeProgress={onClickChangeProgress}
			onRemove={onClickDeleteHistory}
		/>
	);
};

HistoryContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContianer;
