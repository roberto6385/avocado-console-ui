import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {OPEN_WARNING_DIALOG_BOX} from '../../reducers/dialogBoxs';
import {sftpIconConvert} from '../../icons/icons';
import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {HoverButton} from '../../styles/components/icon';
import {AUTH} from '../../reducers/api/auth';

const SFTPConnectBtn = ({data}) => {
	const dispatch = useDispatch();
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const connectSftp = useCallback(() => {
		const correspondedServer = server.find((x) => x.id === data.id);
		const correspondedIdentity = identity.find(
			(it) => it.key === data.key && it.checked === true,
		);
		if (server.includes(correspondedServer)) {
			dispatch({
				type: CONNECTION_REQUEST,
				payload: {
					token: userData.access_token, // connection info
					host: correspondedServer.host,
					port: correspondedServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,

					name: correspondedServer.name, // create tab info
					key: correspondedServer.key,
					id: correspondedServer.id,
				},
			});
		} else {
			dispatch({type: OPEN_WARNING_DIALOG_BOX, payload: 'lost_server'});
		}
	}, [server, data, identity, userData, dispatch]);

	return <HoverButton onClick={connectSftp}>{sftpIconConvert}</HoverButton>;
};

SFTPConnectBtn.propTypes = {
	data: PropTypes.object.isRequired,
};

export default SFTPConnectBtn;
