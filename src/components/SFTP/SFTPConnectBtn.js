import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {sftpIconConvert} from '../../icons/icons';
import {HoverButton} from '../../styles/components/icon';
import {authSelector} from '../../reducers/api/auth';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {sftpAction} from '../../reducers/renewal';

const SFTPConnectBtn = ({data}) => {
	const dispatch = useDispatch();
	const {userData} = useSelector(authSelector.all);
	const {resources, accounts} = useSelector(remoteResourceSelector.all);

	const onClickConnectSftp = useCallback(() => {
		const resource = resources.find((x) => x.id === data.id);
		const account = accounts.find(
			(it) => it.key === data.key && it.checked === true,
		);

		if (resources.includes(resource)) {
			dispatch(
				sftpAction.connect({
					token: userData.access_token, // connection info
					host: resource.host,
					port: resource.port,
					user: account.user,
					password: account.password,

					name: resource.name, // create tab info
					key: resource.key,
				}),
			);
		} else {
			dispatch(dialogBoxAction.openAlert({key: 'lost-server'}));
		}
	}, [resources, data, accounts, userData, dispatch]);

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
