import React, {useEffect, useState} from 'react';
import SFTP_COMPONENT from './SFTP';
import SFTP from '../../dist/sftp_pb';
import * as PropTypes from 'prop-types';
import {Close} from '../../dist/ssht_ws';
import usePostMessage from './hooks/usePostMessage';
import useGetMessage from './hooks/useGetMessage';
import {OPEN_TAB} from '../../reducers/common';
import {useDispatch} from 'react-redux';

const SFTPContainer = ({index, socket, data}) => {
	console.log(data);
	const dispatch = useDispatch();
	const {ws, uuid} = socket;

	// const state = useGetMessage(ws);

	// console.log(state);

	return <SFTP_COMPONENT index={index} socket={socket} />;
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default SFTPContainer;
