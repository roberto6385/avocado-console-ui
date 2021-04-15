import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {CLOSE_TAB} from '../../reducers/common';
import useSftpCommands from '../../hooks/useSftpCommands';
import newSftp_ws from '../../ws/sftp_ws';
import SFTP_Component from './SFTP';

const SFTPContainer = ({index, socket, data}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;
	const {initialWork} = useSftpCommands({ws, uuid});

	useEffect(() => {
		initialWork();
	}, [ws]);

	useEffect(() => {
		ws.onerror = () => {
			console.log('socket error!');
		};
		ws.onclose = () => {
			newSftp_ws({
				keyword: 'Disconnection',
				ws,
			}).then(() => dispatch({type: CLOSE_TAB, data: data.id}));
		};
	}, []);

	return <SFTP_Component index={index} socket={socket} />;
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default SFTPContainer;
