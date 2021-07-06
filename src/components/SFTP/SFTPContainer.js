import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	commandReadAction,
	commandRmAction,
	commandWriteAction,
	INITIALIZING_HIGHLIGHT,
} from '../../reducers/sftp/sftp';
import SFTP from './SFTP';
import {
	DELETE_WORK_LIST,
	DELETE_WORK_TRANSPORTER,
	searchDeleteListAction,
	SHIFT_INCINERATOR_LIST,
	SHIFT_READ_LIST,
	SHIFT_SOCKETS,
	SHIFT_WRITE_LIST,
} from '../../reducers/sftp/crud';
import {ADD_HISTORY, INITIAL_HISTORY_HI} from '../../reducers/sftp/history';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const sftp = useSelector((state) => state.sftp.sftp);
	const crudState = useSelector((state) => state.crud.crudState);
	const current_tab = useSelector((state) => state.common.current_tab);
	const corSftpInfo = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const listState = useSelector((state) => state.list.listState);
	const corListInfo = useMemo(
		() => listState.find((it) => it.uuid === uuid),
		[listState, uuid],
	);

	const corCrudInfo = useMemo(
		() => crudState.find((it) => it.uuid === uuid),
		[crudState, uuid],
	);
	const {
		readList,
		writeList,
		incinerator,
		writeSockets,
		removeSockets,
		readSockets,
	} = corCrudInfo;

	const {path} = corListInfo;
	const {highlight, mode, socket} = corSftpInfo;

	const body = document.getElementById('root');
	const focusOut = useCallback(
		function (evt) {
			if (!uuid || current_tab !== uuid) return;
			// if (highlight.length === 0 && history_highlight.length === 0) {
			// 	return;
			// }
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
		[uuid],
	);

	useEffect(() => {
		body.addEventListener('click', focusOut);

		return function cleanUp() {
			body.removeEventListener('click', focusOut);
		};
	}, [corSftpInfo]);

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
	}, [readList, readSockets, socket, uuid]);

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
	}, [writeList, writeSockets, socket, path, uuid]);

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
	}, [incinerator, removeSockets, socket, path, uuid]);

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
	}, [removeSockets, highlight, path]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
