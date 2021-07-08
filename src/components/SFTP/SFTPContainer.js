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
	searchDeleteListAction,
	SHIFT_INCINERATOR_LIST,
	SHIFT_READ_LIST,
	SHIFT_SOCKETS,
	SHIFT_WRITE_LIST,
} from '../../reducers/sftp';
import SFTP from './SFTP';

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

	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {writeList, writeSockets} = useMemo(
		() => sftp_uploadState.find((it) => it.uuid === uuid),
		[sftp_uploadState, uuid],
	);
	const {readList, readSockets} = useMemo(
		() => sftp_downloadState.find((it) => it.uuid === uuid),
		[sftp_downloadState, uuid],
	);
	const {incinerator, removeSockets} = useMemo(
		() => sftp_deleteState.find((it) => it.uuid === uuid),
		[sftp_deleteState, uuid],
	);

	const {highlight} = useMemo(
		() => sftp_fileState.find((it) => it.uuid === uuid),
		[sftp_fileState, uuid],
	);
	const {socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);
	const {mode} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);
	const {history_highlight} = useMemo(
		() => sftp_historyState.find((it) => it.uuid === uuid),
		[sftp_historyState, uuid],
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
		[
			current_tab,
			dispatch,
			highlight.length,
			history_highlight.length,
			uuid,
		],
	);

	useEffect(() => {
		body.addEventListener('click', focusOut);

		return function cleanUp() {
			body.removeEventListener('click', focusOut);
		};
	}, [body, focusOut]);

	useEffect(() => {
		if (
			readList.length !== 0 &&
			readSockets.length !== 0 &&
			readList.length === readSockets.length
		) {
			const value = readList.slice().shift();
			const read_socket = readSockets.slice().shift();
			dispatch(
				commandReadAction({
					socket: socket,
					read_socket: read_socket,
					uuid: uuid,
					read_path: value.path,
					file: value.file,
					mode: mode,
					todo: value.todo,
				}),
			);

			if (value.todo === 'read') {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.file.name,
						size: value.file.size,
						todo: value.todo,
						progress: 0,
					},
				});
			}

			dispatch({type: SHIFT_READ_LIST, payload: {uuid}});
			dispatch({type: SHIFT_SOCKETS, payload: {uuid, todo: 'read'}});
		}
	}, [dispatch, mode, readList, readSockets, socket, uuid]);

	useEffect(() => {
		if (
			writeList.length !== 0 &&
			writeSockets.length !== 0 &&
			writeList.length === writeSockets.length
		) {
			const value = writeList.slice().shift();
			console.log(value);
			const write_socket = writeSockets.slice().shift();
			dispatch(
				commandWriteAction({
					socket: socket,
					write_socket: write_socket,
					uuid: uuid,
					write_path: value.path,
					file: value.file,
					path: path,
					todo: value.todo,
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.file.name,
					size: value.file.size,
					todo: value.todo,
					progress: 0,
				},
			});

			dispatch({type: SHIFT_WRITE_LIST, payload: {uuid}});
			dispatch({type: SHIFT_SOCKETS, payload: {uuid, todo: 'write'}});
		}
	}, [writeList, writeSockets, socket, path, uuid, dispatch]);

	useEffect(() => {
		if (incinerator.length !== 0) {
			const value = incinerator.slice().shift();
			console.log(value);
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
		if (removeSockets.length !== 0) {
			const remove_socket = removeSockets.slice().shift();

			const array = [];
			for (let value of highlight) {
				if (value.name !== '.' && value.name !== '..') {
					array.push({file: value, path});
				}
			}
			console.log(array);

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
							path === '/'
								? `${path}${item.file.name}`
								: `${path}/${item.file.name}`;
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
	}, [removeSockets, highlight, path, dispatch, uuid]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
