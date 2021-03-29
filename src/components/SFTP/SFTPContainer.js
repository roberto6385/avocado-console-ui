import React, {useEffect} from 'react';
import SFTP_COMPONENT from './SFTP';
import * as PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import sftp_ws from '../../ws/sftp_ws';
import {listConversion} from './commands';
import {
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
} from '../../reducers/sftp';
import {CLOSE_TAB} from '../../reducers/common';

const SFTPContainer = ({index, socket, data}) => {
	const dispatch = useDispatch();
	const {ws, uuid} = socket;

	useEffect(() => {
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then((response) => {
			dispatch({
				type: SFTP_SAVE_CURRENT_PATH,
				data: {uuid, path: response.result},
			});
			sftp_ws({
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

	useEffect(() => {
		ws.onerror = () => {
			console.log('socket error!');
		};
		ws.onclose = () => {
			sftp_ws({
				keyword: 'Disconnection',
				ws,
				uuid,
			}).then(() => dispatch({type: CLOSE_TAB, data: data.id}));
		};
	}, []);

	return <SFTP_COMPONENT index={index} socket={socket} serverId={data.id} />;
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
};

export default SFTPContainer;
