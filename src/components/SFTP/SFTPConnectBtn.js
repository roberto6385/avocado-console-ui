import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {sftpIconConvert} from '../../icons/icons';
import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {HoverButton} from '../../styles/components/icon';
import {authSelector} from '../../reducers/api/auth';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

const SFTPConnectBtn = ({data}) => {
	const dispatch = useDispatch();
	const {userData} = useSelector(authSelector.all);
	const {server, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const onClickConnectSftp = useCallback(() => {
		const resource = server.find((x) => x.id === data.id);
		const account = identity.find(
			(it) => it.key === data.key && it.checked === true,
		);

		if (server.includes(resource)) {
			dispatch({
				type: CONNECTION_REQUEST,
				payload: {
					token: userData.access_token, // connection info
					host: resource.host,
					port: resource.port,
					user: account.user,
					password: account.password,

					name: resource.name, // create tab info
					key: resource.key,
					id: resource.id,
				},
			});
		} else {
			dispatch(dialogBoxAction.openAlert({key: 'lost-server'}));
		}
	}, [server, data, identity, userData, dispatch]);

	return (
		<HoverButton onClick={onClickConnectSftp}>
			{sftpIconConvert}
		</HoverButton>
	);
};

SFTPConnectBtn.propTypes = {
	data: PropTypes.object.isRequired,
};

export default SFTPConnectBtn;
