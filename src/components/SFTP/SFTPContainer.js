import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	commandReadAction,
	commandRmAction,
	commandWriteAction,
	createNewWebsocket,
	INITIAL_HISTORY_HI,
	INITIALIZING_HIGHLIGHT,
	SHIFT_INCINERATOR_LIST,
	SHIFT_READ_LIST,
	SHIFT_SOCKETS,
	SHIFT_WRITE_LIST,
} from '../../reducers/sftp';
import SFTP from './SFTP';
import {createWebsocket} from '../../sagas/sftp/socket';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp, sockets} = useSelector((state) => state.sftp);
	const {current_tab} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {readList, writeList, incinerator} = corServer;
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
	}, [corServer]);

	useEffect(() => {
		if (readList.length !== 0) {
			const value = readList.slice().shift();
			console.log(value);
			dispatch(
				commandReadAction({
					socket: corServer.socket,
					uuid: corServer.uuid,
					read_path: value.path,
					file: value.file,
					mode: corServer.mode,
					todo: value.todo,
				}),
			);

			if (value.todo === 'read') {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: corServer.uuid,
						name: value.file.name,
						size: value.file.size,
						todo: value.todo,
						progress: 0,
					},
				});
			}

			dispatch({type: SHIFT_READ_LIST, payload: {uuid}});
		}
	}, [readList]);

	useEffect(async () => {
		if (
			writeList.length !== 0 &&
			sockets.length !== 0 &&
			writeList.length === sockets.length
		) {
			const value = writeList.slice().shift();
			const socketObj = sockets.slice().shift();
			console.log(socketObj);
			dispatch(
				commandWriteAction({
					socket: corServer.socket,
					write_socket: socketObj.socket,
					uuid: corServer.uuid,
					write_path: value.path,
					file: value.file,
					path: corServer.path,
					writeList: writeList,
					todo: value.todo,
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: corServer.uuid,
					name: value.file.name,
					size: value.file.size,
					todo: value.todo,
					progress: 0,
				},
			});

			dispatch({type: SHIFT_WRITE_LIST, payload: {uuid}});
			dispatch({type: SHIFT_SOCKETS});
		}
	}, [writeList, sockets]);

	useEffect(() => {
		console.log(incinerator);
		if (incinerator.length !== 0) {
			const value = incinerator.slice().shift();
			if (value.file.name !== '..' || value.file.name !== '.') {
				dispatch(
					commandRmAction({
						socket: corServer.socket,
						uuid: uuid,
						file: value.file,
						rm_path: value.path,
						path: corServer.path,
						keyword:
							value.file.type === 'file'
								? 'CommandByRm'
								: 'CommandByRmdir',
					}),
				);
			}
			if (corServer.path === value.path) {
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: corServer.uuid,
						name: value.file.name,
						size: value.file.size,
						todo: 'rm',
						progress: 100,
					},
				});
			}
			dispatch({type: SHIFT_INCINERATOR_LIST, payload: {uuid}});
		}
	}, [incinerator]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
