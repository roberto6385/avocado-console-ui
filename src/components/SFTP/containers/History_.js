import React, {useCallback, useMemo, useState} from 'react';
import History from '../History/History';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	ADD_HISTORY_HI,
	commandPwdAction,
	createNewWebsocket,
	INITIAL_HISTORY_HI,
	PUSH_PAUSE_READ_LIST,
	PUSH_PAUSE_WRITE_LIST,
	REMOVE_HISTORY,
	REMOVE_READ_WRITE_LIST,
	removeNewWebsocket,
} from '../../../reducers/sftp';
import * as PropTypes from 'prop-types';

const History_ = ({uuid}) => {
	const dispatch = useDispatch();
	const [prevOffset, setPrevOffset] = useState(null);
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const {
		path: sftp_pathState,
		history: sftp_historyState,
		socket: sftp_socketState,
		upload: sftp_uploadState,
		download: sftp_downloadState,
	} = useSelector((state) => state.sftp, shallowEqual);
	const {server, tab, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const corTab = useMemo(
		() => tab.find((it) => it.uuid === uuid),
		[tab, uuid],
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
	const {writeSocket, writeList} = useMemo(
		() => sftp_uploadState.find((it) => it.uuid === uuid),
		[sftp_uploadState, uuid],
	);
	const {readSocket} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);

	const handleUploadWithClick = useCallback(async () => {
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
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'write',
						uuid: uuid,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [
		dispatch,
		uuid,
		writeSocket,
		writeList,
		path,
		userTicket,
		corServer,
		correspondedIdentity,
	]);
	const handleUploadWithDrop = useCallback(
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
				dispatch(
					createNewWebsocket({
						token: userTicket.access_token, // connection info
						host: corServer.host,
						port: corServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
						todo: 'write',
						uuid: uuid,
					}),
				);
			}
		},
		[
			writeList,
			writeSocket,
			dispatch,
			uuid,
			path,
			userTicket,
			corServer,
			correspondedIdentity,
		],
	);
	const compareItem = useCallback(
		(first, second) => {
			console.log(first, second);
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

	const selectItem = useCallback(
		(selectValue, index) => (e) => {
			e.stopPropagation();
			const prev_history = history.slice();
			const prev_history_hi = history_highlight.slice();
			if (e.metaKey) {
				if (prev_history_hi.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: prev_history_hi.filter(
								(item) => item !== selectValue,
							),
						},
					});
				} else {
					prev_history_hi.push(selectValue);
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {uuid, history: prev_history_hi},
					});
				}
			} else if (e.shiftKey) {
				if (prev_history_hi.length === 0) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				} else {
					compareItem(
						prev_history.findIndex(
							(item) => item === prev_history_hi[0],
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
		[compareItem, dispatch, history, history_highlight, uuid],
	);

	//TODO progress가 0인 히스토리 삭제 시 작업삭제
	const handleRemoveHistory = useCallback(
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

	const handlePauseAndStart = useCallback(
		(history) => () => {
			console.log(history);
			if (history.progress !== 100 && history.progress !== 0) {
				if (
					(history.todo === 'read' && readSocket) ||
					(history.todo === 'write' && writeSocket) ||
					(history.todo === 'edit' && (writeSocket || readSocket))
				) {
					if (history.todo === 'write') {
						if (history.path === path) {
							dispatch(
								commandPwdAction({
									socket: sftp_socket,
									uuid: uuid,
									pwd_path: path,
								}),
							);
						}
					}
					dispatch(
						removeNewWebsocket({
							socket:
								history.todo === 'write'
									? writeSocket
									: readSocket,
							uuid: uuid,
							todo: history.todo,
							key: history.key,
							path: history.path,
							file: history.file,
						}),
					);
				} else {
					let item = pause
						.slice()
						.find(
							(v) =>
								v.file === history.file &&
								v.path === history.path &&
								v.todo === history.todo,
						);

					console.log(item);
					console.log(prevOffset);

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

					dispatch(
						createNewWebsocket({
							token: userTicket.access_token, // connection info
							host: corServer.host,
							port: corServer.port,
							user: correspondedIdentity.user,
							password: correspondedIdentity.password,
							todo: history.todo,
							uuid: uuid,
							key: history.key,
						}),
					);
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
			userTicket,
			corServer,
			correspondedIdentity,
		],
	);

	return (
		<History
			onUploadWithDrop={handleUploadWithDrop}
			onUploadWithClick={handleUploadWithClick}
			onSelect={selectItem}
			highlight={history_highlight}
			onPauseAndStart={handlePauseAndStart}
			onRemove={handleRemoveHistory}
			writeSocket={writeSocket}
			readSocket={readSocket}
			history={history}
		/>
	);
};

History_.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History_;
