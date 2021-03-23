import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {BiTransferAlt} from 'react-icons/bi';
import SFTP from '../../dist/sftp_pb';
import {OPEN_TAB} from '../../reducers/common';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {sendConnect} from './commands/sendConnect';
// import {sendConnect} from './commands';

const ConvertButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	line-height: 0;
`;

const ConvertIcon = styled(BiTransferAlt)`
	font-size: 21px;
`;

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	const connection = async () => {
		await sendConnect(data, dispatch);
	};

	return (
		<ConvertButton onClick={connection}>
			<ConvertIcon />
		</ConvertButton>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ConvertSFTP;
