import React, {useCallback, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	commandPwdAction,
	commandReadAction,
	commandWriteAction,
	INITIAL_HISTORY_HI,
	INITIALIZING_HIGHLIGHT,
	SHIFT_READ_LIST,
	SHIFT_WRITE_LIST,
} from '../../reducers/sftp';
import SFTP from './SFTP';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {current_tab} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {readList, writeList} = corServer;
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
			dispatch(
				commandReadAction({
					...corServer,
					file: value.file,
					readPath: value.path,
					keyword: 'read',
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.file.name,
					size: value.file.size,
					todo: 'read',
					progress: 0,
				},
			});
			dispatch({type: SHIFT_READ_LIST, payload: {uuid}});
		}
	}, [readList]);

	useEffect(() => {
		if (writeList.length !== 0) {
			const value = writeList.slice().shift();

			dispatch(
				commandWriteAction({
					...corServer,
					writePath: value.path,
					file: value.file,
					keyword: 'write',
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.file.name,
					size: value.file.size,
					todo: 'write',
					progress: 0,
				},
			});
			dispatch({type: SHIFT_WRITE_LIST, payload: {uuid}});
		} else {
			console.log(corServer);
			// dispatch(commandPwdAction(corServer));
		}
	}, [writeList]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
