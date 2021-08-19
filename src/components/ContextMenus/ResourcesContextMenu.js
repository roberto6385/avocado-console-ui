import React, {useCallback, useMemo} from 'react';
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

const ResourcesContextMenu = ({identity, data}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {resources} = useSelector(remoteResourceSelector.all);
	const {userData} = useSelector(authSelector.all);
	const resource = useMemo(
		() => resources.find((i) => i.key === data.key),
		[resources, data],
	);

	const SSHContextMenuList = {
		'connect-ssh': t('connectSsh'),
		'connect-sftp': t('connectSftp'),
		'get-properties': t('properties'),
	};

	const SFTPContextMenuList = {
		'connect-sftp': t('connectSftp'),
		'get-properties': t('properties'),
	};

	const onClickOpenSFTP = useCallback(() => {
		const resource = resources.find((i) => i.key === data.key);
		dispatch({
			type: CONNECTION_REQUEST,
			payload: {
				token: userData.access_token, // connection info
				host: resource.host,
				port: resource.port,
				user: identity.user,
				password: identity.password,

				name: resource.name, // create tab info
				key: resource.key,
				id: resource.id,
			},
		});
	}, [
		resources,
		dispatch,
		userData,
		identity.user,
		identity.password,
		data.key,
	]);

	const onClickOpenSSH = useCallback(() => {
		const resource = resources.find((i) => i.key === data.key);

		dispatch(
			sshAction.connectRequest({
				token: userData.access_token,
				...resource,
				user: identity.user,
				password: identity.password,
			}),
		);
	}, [
		resources,
		dispatch,
		userData,
		identity.user,
		identity.password,
		data.key,
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
						dialogBoxAction.openForm({id: data.id, key: 'server'}),
					);
					break;
				default:
					return;
			}
		},
		[data.id, dispatch, onClickOpenSFTP, onClickOpenSSH],
	);

	return (
		<ContextMenu
			id={data.key + '-resources-context-menu'}
			animation={animation.slide}
		>
			{resource?.protocol === 'SSH2'
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

ResourcesContextMenu.propTypes = {
	data: PropTypes.object.isRequired,
	identity: PropTypes.object.isRequired,
};

export default ResourcesContextMenu;
