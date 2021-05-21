import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	commandPwdAction,
	INITIAL_HISTORY_HI,
	INITIALIZING_HIGHLIGHT,
} from '../../reducers/sftp';
import SFTP from './SFTP';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const currentServer = sftp.find((it) => it.uuid === uuid);
	const {highlight, history_highlight} = currentServer;
	// table body가 아닌 다른 영역을 클릭했을 때, 하이라이팅 제거
	const body = document.getElementById('root');
	const focusOut = useCallback(
		function (evt) {
			if (highlight.length === 0 && history_highlight.length === 0) {
				return;
			}
			const root = evt.target;

			if (highlight.length !== 0 || history_highlight.length !== 0) {
				const th = Array.from(evt.currentTarget.querySelectorAll('th'));
				const path = Array.from(
					evt.currentTarget.querySelectorAll('path'),
				);
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
					highlight.length !== 0 &&
					!th.includes(root) &&
					!path.includes(root) &&
					!filelist_contents.includes(root) &&
					!context.includes(root)
				) {
					dispatch({
						type: INITIALIZING_HIGHLIGHT,
						payload: {uuid},
					});
				} else if (
					history_highlight.length !== 0 &&
					!th.includes(root) &&
					!path.includes(root) &&
					!history_contents.includes(root) &&
					!context.includes(root)
				) {
					dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});
				}
			}
		},
		[highlight, history_highlight],
	);

	useEffect(() => {
		body.addEventListener('click', focusOut);

		return function cleanUp() {
			body.removeEventListener('click', focusOut);
		};
	}, [currentServer]);

	useEffect(() => {
		dispatch(commandPwdAction(currentServer));
	}, [uuid, dispatch]);

	return currentServer ? <SFTP uuid={uuid} /> : <div>서버 없음.</div>;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
