import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_TAB} from '../../reducers/common';
import useSftpCommands from '../../hooks/useSftpCommands';
import newSftp_ws from '../../ws/sftp_ws';
import SFTP_Component from './SFTP';
import {commandLsAction, commandPwdAction} from '../../reducers/sftp/index';

const SFTPContainer = ({index, socket, data, channel}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;
	const {initialWork} = useSftpCommands({ws, uuid});
	const {server} = useSelector((state) => state.sftp);
	const currentServer = server.find((it) => it.uuid === uuid);

	// useEffect(() => {
	// 	// initialWork();
	// 	dispatch(commandPwdAction({socket: ws, channel}));
	// }, [dispatch, ws]);

	// return <SFTP_Component index={index} socket={socket} />;
	const handleClick = () => {
		dispatch(commandPwdAction(currentServer));
		// dispatch(commandLsAction(currentServer));
	};
	return (
		<div>
			<button onClick={handleClick}>pwd</button>
		</div>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	channel: PropTypes.object.isRequired,
};

export default SFTPContainer;
