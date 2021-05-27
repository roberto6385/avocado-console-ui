import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {connectionAction} from '../../reducers/sftp';
import {IconButton} from '../../styles/global';
import {sftpIcon} from '../../icons/icons';

const SFTPConvertButton = ({server_id}) => {
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket);
	const {server} = useSelector((state) => state.common);

	const connection = useCallback(() => {
		const correspondedServer = server.find((x) => x.id === server_id);
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
	}, [server_id, userTicket, dispatch]);

	return <IconButton onClick={connection}>{sftpIcon}</IconButton>;
};

SFTPConvertButton.propTypes = {
	server_id: PropTypes.number.isRequired,
};

export default SFTPConvertButton;
