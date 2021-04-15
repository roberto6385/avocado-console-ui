import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {CLOSE_TAB} from '../../reducers/common';
import useSftpCommands from '../../hooks/useSftpCommands';
import newSftp_ws from '../../ws/sftp_ws';
import SFTP_Component from './SFTP';
import {commandPwdAction} from '../../reducers/sftp/index';

const SFTPContainer = ({index, socket, data, channel}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;
	const {initialWork} = useSftpCommands({ws, uuid});

	// useEffect(() => {
	// 	// initialWork();
	// 	dispatch(commandPwdAction({socket: ws, channel}));
	// }, [dispatch, ws]);

	// return <SFTP_Component index={index} socket={socket} />;
	return (
		<div>
			<button
				onClick={() =>
					dispatch(commandPwdAction({socket: ws, channel}))
				}
			>
				pwd
			</button>
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
