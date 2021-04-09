import React from 'react';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import {OPEN_TAB} from '../../reducers/common';
import newSftp_ws from '../../ws/sftp_ws';
import {SFTP_SAVE_LIST_MODE} from '../../reducers/sftp';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';

const ConvertSFTP = ({data}) => {
	const dispatch = useDispatch();
	const {me} = useSelector((state) => state.user);
	const {server} = useSelector((state) => state.common);
	const connection = () => {
		if (server.includes(data)) {
			const ws = new WebSocket(`ws://${data.host}:8081/ws/sftp`);
			ws.onopen = async () => {
				const {uuid} = await newSftp_ws({
					keyword: 'Connection',
					ws,
					token: me.token,
					data,
				});
				dispatch({
					type: OPEN_TAB,
					data: {
						id: data.id,
						type: 'SFTP',
						ws: ws,
						uuid: uuid,
					},
				});
				dispatch({
					type: SFTP_SAVE_LIST_MODE,
					data: {
						uuid,
						mode: 'list',
					},
				});
			};
		} else {
			dispatch({type: OPEN_ALERT_POPUP, data: 'lost_server'});
		}
	};

	return (
		<IconButton onClick={connection}>
			<ConvertIcon />
		</IconButton>
	);
};

ConvertSFTP.propTypes = {
	data: PropTypes.object,
};

export default ConvertSFTP;
