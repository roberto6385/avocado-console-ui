import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileList from './FileList';
import History from './History';
import SFTP from '../../dist/sftp_pb';
import {sendCommandByPwd} from './commands/sendCommandPwd';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_MODE} from '../../reducers/sftp';
import Edit from './Edit';

const SftpContainer = styled.div`
	display: flex;
	height: 100%;
	// width: 100%;
	overflow: scroll;
`;

const SFTPContainer = ({index, socket}) => {
	const {ws, uuid} = socket;
	const dispatch = useDispatch();

	const {currentMode} = useSelector((state) => state.sftp);
	const modeItem = currentMode.find((item) => item.uuid === uuid);

	useEffect(() => {
		dispatch({type: SFTP_SAVE_CURRENT_MODE, data: {uuid, mode: 'normal'}});
		sendCommandByPwd(ws, uuid, dispatch);
	}, [dispatch]);

	return (
		<SftpContainer>
			{modeItem?.mode === 'edit' ? (
				<Edit index={index} socket={socket} />
			) : (
				<>
					<FileList index={index} socket={socket} />
					<History index={index} socket={socket} />
				</>
			)}
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
