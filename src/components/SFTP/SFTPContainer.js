import React, {useCallback, useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SFTP_Component from './SFTP';
import {ADD_ONE_HIGHLIGHT, commandPwdAction} from '../../reducers/sftp';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	// const {initialWork} = useSftpCommands({ws, uuid});
	const {server} = useSelector((state) => state.sftp);
	const currentServer = server.find((it) => it.uuid === uuid);

	// table body가 아닌 다른 영역을 클릭했을 때, 하이라이팅 제거
	const body = document.getElementById('root');
	const focusOut = useCallback(function (evt) {
		const root = evt.target;
		console.log(root);
		const tbody = Array.from(evt.currentTarget.querySelectorAll('tbody'));
		const th = Array.from(evt.currentTarget.querySelectorAll('th'));
		const ul = Array.from(
			evt.currentTarget.querySelectorAll('#fileList_ul'),
		);
		const li = Array.from(
			evt.currentTarget.querySelectorAll('.highlight_list'),
		);
		const context = Array.from(
			evt.currentTarget.querySelectorAll(
				'.react-contexify__item__content',
			),
		);
		if (
			!tbody.includes(root) &&
			!th.includes(root) &&
			!ul.includes(root) &&
			!li.includes(root) &&
			!context.includes(root)
		) {
			console.log('out of focus!');
			dispatch({
				type: ADD_ONE_HIGHLIGHT,
				payload: {uuid, item: null},
			});
		}
	}, []);
	body.addEventListener('click', focusOut);

	useEffect(() => {
		// initialWork();
		currentServer && dispatch(commandPwdAction(currentServer));
	}, []);

	return currentServer ? <SFTP_Component server={currentServer} /> : <></>;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
