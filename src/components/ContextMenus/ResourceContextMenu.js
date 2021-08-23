// eslint-disable-next-line no-unused-vars
import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {dialogBoxAction} from '../../reducers/dialogBoxs';
import {ContextMenu} from '../../styles/components/contextMenu';
import {authSelector} from '../../reducers/api/auth';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {sshAction} from '../../reducers/ssh';

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
		const resource = computingSystemServicePorts.find(
			(v) => v.id === resourceId,
		);
		const account = accounts.find(
			(v) => v.resourceId === resourceId && v.isDefaultAccount === true,
		);

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
	}, [
		computingSystemServicePorts,
		dispatch,
		userData.access_token,
		accounts,
		resourceId,
	]);

	const onClickOpenSSH = useCallback(() => {
		const resource = computingSystemServicePorts.find(
			(v) => v.id === resourceId,
		);
		const account = accounts.find(
			(v) => v.resourceId === resourceId && v.isDefaultAccount === true,
		);

		dispatch(
			sshAction.connectRequest({
				token: userData.access_token,
				host: resource.host,
				port: resource.port,
				user: account.user,
				password: account.password,
			}),
		);
	}, [
		computingSystemServicePorts,
		accounts,
		dispatch,
		userData.access_token,
		resourceId,
	]);

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
