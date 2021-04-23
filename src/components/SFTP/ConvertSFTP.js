import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import {OPEN_TAB} from '../../reducers/common';
import newSftp_ws from '../../sagas/sftp/messageSender';
import {SFTP_SAVE_LIST_MODE} from '../../reducers/subSftp';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {connectionAction} from '../../reducers/sftp';

const ConvertSFTP = ({server_id}) => {
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket);
	const {server} = useSelector((state) => state.common);

	const connection = useCallback(() => {
		const data = server.find((x) => x.id === server_id);
		if (server.includes(data)) {
			dispatch(
				connectionAction({
					...data,
					token: userTicket,
				}),
			);
		} else {
			dispatch({type: OPEN_ALERT_POPUP, data: 'lost_server'});
		}
	}, [server_id, userTicket]);

	return (
		<IconButton onClick={connection}>
			<ConvertIcon />
		</IconButton>
	);
};

ConvertSFTP.propTypes = {
	server_id: PropTypes.number,
};

export default ConvertSFTP;
