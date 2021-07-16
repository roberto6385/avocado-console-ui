import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	commandReadAction,
	commandRmAction,
	commandWriteAction,
	DELETE_WORK_LIST,
	DELETE_WORK_TRANSPORTER,
	INITIAL_HISTORY_HI,
	INITIALIZING_HIGHLIGHT,
	READ_PASS,
	removeNewWebsocket,
	searchDeleteListAction,
	SHIFT_INCINERATOR_LIST,
	SHIFT_READ_LIST,
	WRITE_PASS,
} from '../../reducers/sftp';
import SFTP from './SFTP';
import {put} from 'redux-saga/effects';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const current_tab = useSelector((state) => state.common.current_tab);
	const {
		path: sftp_pathState,
		upload: sftp_uploadState,
		download: sftp_downloadState,
		delete: sftp_deleteState,
		file: sftp_fileState,
		socket: sftp_socketState,
		etc: sftp_etcState,
		history: sftp_historyState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const {path} = sftp_pathState.find((it) => it.uuid === uuid);

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
	const {incinerator, removeSockets, initList, initPath} =
		sftp_deleteState.find((it) => it.uuid === uuid);

	const {highlight} = sftp_fileState.find((it) => it.uuid === uuid);
	const {socket} = sftp_socketState.find((it) => it.uuid === uuid);
	const {mode} = sftp_etcState.find((it) => it.uuid === uuid);
	const {history_highlight} = sftp_historyState.find(
		(it) => it.uuid === uuid,
	);

	const body = document.getElementById('root');
	const focusOut = useCallback(
		function (evt) {
			if (!uuid || current_tab !== uuid) return;
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
		[current_tab, dispatch, highlight, history_highlight, uuid],
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
			dispatch(
				commandReadAction({
					socket: socket,
					read_socket: readSocket,
					uuid: uuid,
					read_path: value.path,
					file: value.file,
					mode: mode,
					todo: value.todo,
					offset: value?.offset,
				}),
			);
			dispatch({type: READ_PASS, payload: {uuid}});
		}
		if (readList.length === 0 && readSocket !== null) {
			dispatch(
				removeNewWebsocket({
					socket: readSocket,
					todo: 'read',
					uuid: uuid,
				}),
			);
		}
	}, [downPass, dispatch, mode, readList, readSocket, socket, uuid]);

	useEffect(() => {
		if (writeList.length !== 0 && writeSocket !== null) {
			if (!upPass) return;
			const value = writeList.slice().shift();
			console.log(value);
			dispatch(
				commandWriteAction({
					socket: socket,
					write_socket: writeSocket,
					uuid: uuid,
					write_path: value.path,
					file: value.file,
					todo: value.todo,
					dispatch: dispatch,
					offset: value?.offset,
				}),
			);
			dispatch({type: WRITE_PASS, payload: {uuid}});
		}
		if (writeList.length === 0 && writeSocket !== null) {
			dispatch(
				removeNewWebsocket({
					socket: writeSocket,
					todo: 'write',
					uuid: uuid,
				}),
			);
		}
	}, [upPass, writeList, writeSocket, socket, uuid, dispatch]);

	useEffect(() => {
		if (incinerator.length !== 0) {
			const value = incinerator.slice().shift();
			const remove_socket = removeSockets.slice().shift();
			if (value.file.name !== '..' || value.file.name !== '.') {
				dispatch(
					commandRmAction({
						socket: socket,
						remove_socket: remove_socket,
						uuid: uuid,
						file: value.file,
						rm_path: value.path,
						path: path,
						keyword:
							value.file.type === 'file'
								? 'CommandByRm'
								: 'CommandByRmdir',
						dispatch: dispatch,
					}),
				);
			}
			if (value.file.path) {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.file.name,
						size: value.file.size,
						todo: 'rm',
						progress: 100,
					},
				});
			}
			dispatch({type: SHIFT_INCINERATOR_LIST, payload: {uuid}});
		}
	}, [incinerator, removeSockets, socket, path, uuid, dispatch]);

	useEffect(() => {
		if (removeSockets.length !== 0 && initList.length !== 0) {
			const remove_socket = removeSockets.slice().shift();

			const array = [];
			for (let value of initList) {
				if (value.name !== '.' && value.name !== '..') {
					array.push({file: value, path: initPath});
				}
			}
			dispatch({
				type: DELETE_WORK_LIST,
				payload: {
					uuid: uuid,
					array,
				},
			});

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
						const delete_path =
							initPath === '/'
								? `${initPath}${item.file.name}`
								: `${initPath}/${item.file.name}`;
						dispatch(
							searchDeleteListAction({
								socket: remove_socket,
								uuid: uuid,
								delete_path: delete_path,
							}),
						);
					}
				}
			}
		}
	}, [initList, initPath, dispatch, uuid, removeSockets]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
