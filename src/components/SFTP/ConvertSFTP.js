import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ConvertIcon} from '../../styles/sftp';
import {IconButton} from '../../styles/common';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {connectionAction} from '../../reducers/sftp';

const ConvertSFTP = ({server_key}) => {
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket);
	const {server} = useSelector((state) => state.common);

	const connection = useCallback(() => {
		const correspondedServer = server.find((x) => x.key === server_key);
		if (server.includes(correspondedServer)) {
			dispatch(
				connectionAction({
					...correspondedServer,
					token: userTicket,
				}),
			);
		} else {
			dispatch({type: OPEN_ALERT_POPUP, data: 'lost_server'});
		}
	}, [server_key, userTicket]);

	return (
		<IconButton onClick={connection}>
			<ConvertIcon />
		</IconButton>
	);
};

ConvertSFTP.propTypes = {
	server_key: PropTypes.string.isRequired,
};

export default ConvertSFTP;
