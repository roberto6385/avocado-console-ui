import React, {useEffect} from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {sendConnect} from './commands/sendConnect';
import {ConvertButton, ConvertIcon} from '../../styles/sftp';

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
