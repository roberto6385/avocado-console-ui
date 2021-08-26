import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {ContextMenu} from '../../styles/components/contextMenu';
import {authSelector} from '../../reducers/api/auth';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {sshAction} from '../../reducers/ssh';
import {sftpAction} from '../../reducers/renewal';

const ResourceContextMenu = ({resourceId}) => {
	const {t} = useTranslation('resourceContextMenu');
	const dispatch = useDispatch();
	const {computingSystemServicePorts, accounts} = useSelector(
		remoteResourceSelector.all,
	);
	const {userData} = useSelector(authSelector.all);

	const SSHContextMenuList = {
		'connect-ssh': t('connectSsh'),
		'connect-sftp': t('connectSftp'),
		'get-properties': t('getProperties'),
	};

	const SFTPContextMenuList = {
		'connect-sftp': t('connectSftp'),
		'get-properties': t('properties'),
	};

	const onClickOpenSFTP = useCallback(() => {
		dispatch(
			sftpAction.connect({
				resourceId,
			}),
		);
	}, [dispatch, resourceId]);

	const onClickOpenSSH = useCallback(() => {
		const computingSystemPort = computingSystemServicePorts.find(
			(v) => v.id === resourceId,
		);
		const account = accounts.find(
			(v) => v.resourceId === resourceId && v.isDefaultAccount === true,
		);

		dispatch(
			sshAction.connectRequest({
				token: userData.access_token,
				host: computingSystemPort.host,
				port: computingSystemPort.port,
				user: account.user,
				password: account.password,
				id: computingSystemPort.id,
			}),
		);
	}, [computingSystemServicePorts, accounts, dispatch, userData, resourceId]);

	const handleOnClickEvents = useCallback(
		(v) => () => {
			switch (v) {
				case 'connect-ssh':
					onClickOpenSSH();
					break;
				case 'connect-sftp':
					onClickOpenSFTP();
					break;
				case 'get-properties':
					dispatch(
						dialogBoxAction.openForm({
							key: 'resource-properties',
							id: resourceId,
						}),
					);
					break;
				default:
					return;
			}
		},
		[resourceId, dispatch, onClickOpenSFTP, onClickOpenSSH],
	);

	return (
		<ContextMenu
			id={resourceId + '-resources-context-menu'}
			animation={animation.slide}
		>
			{computingSystemServicePorts.find((v) => v.id === resourceId)
				?.protocol === 'SSH2'
				? Object.entries(SSHContextMenuList).map(([key, value]) => (
						<Item onClick={handleOnClickEvents(key)} key={key}>
							{value}
						</Item>
				  ))
				: Object.entries(SFTPContextMenuList).map(([key, value]) => (
						<Item onClick={handleOnClickEvents(key)} key={key}>
							{value}
						</Item>
				  ))}
		</ContextMenu>
	);
};

ResourceContextMenu.propTypes = {
	resourceId: PropTypes.string.isRequired,
};

export default ResourceContextMenu;
