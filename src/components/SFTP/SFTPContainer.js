import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SFTP_Component from './SFTP';
import {commandPwdAction, INITIALIZING_HIGHLIGHT} from '../../reducers/sftp';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const currentServer = sftp.find((it) => it.uuid === uuid);
	// table body가 아닌 다른 영역을 클릭했을 때, 하이라이팅 제거

	const body = document.getElementById('root');
	const focusOut = useCallback(
		function (evt) {
			if (currentServer?.highlight.length === 0) {
				return;
			}
			const root = evt.target;
			const th = Array.from(evt.currentTarget.querySelectorAll('th'));
			// const li = Array.from(
			// 	evt.currentTarget.querySelectorAll('.highlight_list'),
			// );
			const p = Array.from(
				evt.currentTarget.querySelectorAll('.filelist_p'),
			);
			const hiP = Array.from(
				evt.currentTarget.querySelectorAll('.highlight_list_p'),
			);
			const context = Array.from(
				evt.currentTarget.querySelectorAll(
					'.react-contexify__item__content',
				),
			);
			if (
				!th.includes(root) &&
				!hiP.includes(root) &&
				!p.includes(root) &&
				!context.includes(root)
			) {
				dispatch({type: INITIALIZING_HIGHLIGHT, payload: {uuid}});
			}
		},
		[currentServer?.highlight],
	);

	useEffect(() => {
		body.addEventListener('click', focusOut);

		return function cleanUp() {
			body.removeEventListener('click', focusOut);
		};
	}, [currentServer]);

	useEffect(() => {
		console.log('rendering...');
		dispatch(commandPwdAction(currentServer));
	}, [uuid, dispatch]);

	return currentServer ? (
		<SFTP_Component uuid={uuid} />
	) : (
		<div>서버 없음.</div>
	);
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
