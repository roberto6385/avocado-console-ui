import React, {useCallback, useEffect, useState} from 'react';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileList from './FileList';
import History from './History';
import SFTP from '../../dist/sftp_pb';
import {sendCommandByPwd} from './commands/sendCommandPwd';
import {useDispatch, useSelector} from 'react-redux';

const SftpContainer = styled.div`
	display: flex;
	height: 100%;
	// width: 100%;
	overflow: scroll;
`;

const SFTPContainer = ({index, socket}) => {
	const {ws, uuid} = socket;
	const dispatch = useDispatch();

	useEffect(() => {
		sendCommandByPwd(ws, uuid, dispatch);
	}, [dispatch]);

	return (
		<SftpContainer>
			<FileList index={index} socket={socket} />
			<History index={index} socket={socket} />
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
