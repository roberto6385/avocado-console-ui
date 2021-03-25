import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {sendConnect} from './commands/sendConnect';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();

	const connection = async () => {
		await sendConnect(data, dispatch);
	};

	return (
		<IconButton onClick={connection}>
			<ConvertIcon />
		</IconButton>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object.isRequired,
};

export default ConvertSFTP;
