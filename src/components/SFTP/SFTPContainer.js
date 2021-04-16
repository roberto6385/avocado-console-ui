import React, {useEffect} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SFTP_Component from './SFTP';
import {commandPwdAction} from '../../reducers/sftp';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	// const {initialWork} = useSftpCommands({ws, uuid});
	const {server} = useSelector((state) => state.sftp);
	const currentServer = server.find((it) => it.uuid === uuid);

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
