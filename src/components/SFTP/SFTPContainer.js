import React, {useEffect} from 'react';
import SFTP_COMPONENT from './SFTP';
import * as PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import usePostMessage from './hooks/usePostMessage';
import {listConversion} from './commands';
import {
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
} from '../../reducers/sftp';

const SFTPContainer = ({index, socket, data}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;

	useEffect(() => {
		usePostMessage({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then((response) => {
			dispatch({
				type: SFTP_SAVE_CURRENT_PATH,
				data: {uuid, path: response.result},
			});
			usePostMessage({
				keyword: 'CommandByLs',
				ws,
				uuid,
				path: response.result,
			})
				.then((response) => listConversion(response.result))
				.then((response) =>
					dispatch({
						type: SFTP_SAVE_CURRENT_LIST,
						data: {uuid, list: response},
					}),
				);
		});
	}, [ws, uuid, dispatch]);
	return <SFTP_COMPONENT index={index} socket={socket} />;
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default SFTPContainer;
