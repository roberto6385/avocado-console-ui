import React, {useCallback, useMemo, useState} from 'react';
import History from '../History/History';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	ADD_HISTORY_HI,
	CREATE_NEW_WEBSOCKET_REQUEST,
	INITIAL_HISTORY_HI,
	PUSH_PAUSE_READ_LIST,
	PUSH_PAUSE_WRITE_LIST,
	REMOVE_HISTORY,
	REMOVE_READ_WRITE_LIST,
} from '../../../reducers/sftp';
import * as PropTypes from 'prop-types';
import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';
import {remoteResourceSelector} from '../../../reducers/remoteResource';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';

const HistoryContianer = ({uuid}) => {
	const dispatch = useDispatch();
	const [prevOffset, setPrevOffset] = useState(null);
	const {userData} = useSelector(authSelector.all);
	const {resources, accounts} = useSelector(remoteResourceSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	const {terminalTabs} = useSelector(tabBarSelector.all);
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

	const onClickUploadHistory = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: 'upload',
						value: {path: sftp.path, file: v},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: 'upload',
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, sftp, terminalTabs, uuid]);

	const onDropUploadHistory = useCallback(
		async (files) => {
			console.log(files);
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: 'upload',
						value: {path: sftp.path, file: v},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: 'upload',
					}),
				);
			}
		},
		[dispatch, sftp, terminalTabs, uuid],
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
			// const prevHistoryHighlight = history_highlight.slice();
			if (e.metaKey) {
				// if (prevHistoryHighlight.find((item) => item === selectValue)) {
				// 	dispatch({
				// 		type: ADD_HISTORY_HI,
				// 		payload: {
				// 			uuid,
				// 			history: prevHistoryHighlight.filter(
				// 				(item) => item !== selectValue,
				// 			),
				// 		},
				// 	});
				// } else {
				// 	prevHistoryHighlight.push(selectValue);
				// 	dispatch({
				// 		type: ADD_HISTORY_HI,
				// 		payload: {uuid, history: prevHistoryHighlight},
				// 	});
				// }
			} else if (e.shiftKey) {
				// if (prevHistoryHighlight.length === 0) {
				// 	dispatch({
				// 		type: ADD_HISTORY_HI,
				// 		payload: {
				// 			uuid,
				// 			history: [selectValue],
				// 		},
				// 	});
				// } else {
				// 	compareHistories(
				// 		prevHistory.findIndex(
				// 			(item) => item === prevHistoryHighlight[0],
				// 		),
				// 		index,
				// 	);
				// }
			} else {
				// dispatch({
				// 	type: ADD_HISTORY_HI,
				// 	payload: {
				// 		uuid,
				// 		history: [selectValue],
				// 	},
				// });
			}
		},
		[compareHistories, dispatch, history, uuid],
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
				// if (
				// 	(history.todo === 'read' && readSocket) ||
				// 	(history.todo === 'write' && writeSocket) ||
				// 	(history.todo === 'edit' && (writeSocket || readSocket))
				// ) {
				// 	if (history.todo === 'write') {
				// 		if (history.path === path) {
				// 			dispatch({
				// 				type: PWD_REQUEST,
				// 				payload: {
				// 					socket: sftp_socket,
				// 					uuid: uuid,
				// 					pwd_path: path,
				// 				},
				// 			});
				// 		}
				// 	}
				// 	dispatch({
				// 		type: REMOVE_NEW_WEBSOCKET_REQUEST,
				// 		payload: {
				// 			socket:
				// 				history.todo === 'write'
				// 					? writeSocket
				// 					: readSocket,
				// 			uuid: uuid,
				// 			todo: history.todo,
				// 			key: history.key,
				// 			path: history.path,
				// 			file: history.file,
				// 		},
				// 	});
			} else {
				// let item = pause
				// 	.slice()
				// 	.find(
				// 		(v) =>
				// 			v.file === history.file &&
				// 			v.path === history.path &&
				// 			v.todo === history.todo,
				// 	);

				// if (!item || item.offset === prevOffset) return;
				// setPrevOffset(item.offset);

				dispatch({
					type:
						(history.todo === 'write' && PUSH_PAUSE_WRITE_LIST) ||
						(history.todo === 'read' && PUSH_PAUSE_READ_LIST) ||
						(history.todo === 'edit' &&
							history.key === 'write' &&
							PUSH_PAUSE_WRITE_LIST) ||
						(history.todo === 'edit' &&
							history.key === 'read' &&
							PUSH_PAUSE_READ_LIST),
					payload: {
						uuid,
						// array: {...item},
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
			// }
		},
		[
			// readSocket,
			// writeSocket,
			dispatch,
			uuid,

			// sftp_socket,
			// pause,
			prevOffset,
			userData,
			resource,
			account,
		],
	);

	return (
		<History
			// history={history}
			// highlight={history_highlight}
			// writeSocket={writeSocket}
			// readSocket={readSocket}
			onDropUpload={onDropUploadHistory}
			onClickUpload={onClickUploadHistory}
			// onSelect={onClickSelectHistory}
			// onChangeProgress={onClickChangeProgress}
			// onRemove={onClickDeleteHistory}
		/>
	);
};

HistoryContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContianer;
