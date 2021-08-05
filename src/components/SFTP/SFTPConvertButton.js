import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {sftpIconConvert} from '../../icons/icons';
import {connectionAction} from '../../reducers/sftp';
import {HoverButton} from '../../styles/components/icon';

const SFTPConvertButton = ({data}) => {
	const dispatch = useDispatch();
	const userTicket = useSelector((state) => state.userTicket.userTicket);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const connection = useCallback(() => {
		const correspondedServer = server.find((x) => x.id === data.id);
		const correspondedIdentity = identity.find(
			(it) => it.key === data.key && it.checked === true,
		);
		if (server.includes(correspondedServer)) {
			dispatch(
				connectionAction({
					token: userTicket.access_token, // connection info
					host: correspondedServer.host,
					port: correspondedServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,

					name: correspondedServer.name, // create tab info
					key: correspondedServer.key,
					id: correspondedServer.id,
				}),
			);
		} else {
			dispatch({type: OPEN_ALERT_POPUP, data: 'lost_server'});
		}
	}, [server, data, identity, userTicket, dispatch]);

	return <HoverButton onClick={connection}>{sftpIconConvert}</HoverButton>;
};

SFTPConvertButton.propTypes = {
	data: PropTypes.object.isRequired,
};

export default SFTPConvertButton;
