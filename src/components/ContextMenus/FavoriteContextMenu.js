import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {animation, Item} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {CONNECTION_REQUEST} from '../../reducers/sftp';
import {ContextMenu} from '../../styles/components/contextMenu';
import {authSelector} from '../../reducers/api/auth';
import {favoritesAction} from '../../reducers/favorites';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import {sshAction} from '../../reducers/ssh';

const FavoriteContextMenu = ({resourceId}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('favoriteContextMenu');

	// eslint-disable-next-line no-unused-vars
	const {accounts, computingSystemServicePorts} = useSelector(
		remoteResourceSelector.all,
	);

	const {userData} = useSelector(authSelector.all);

	const contextMenuList = {
		'connect-ssh': t('connectSsh'),
		'connect-sftp': t('connectSftp'),
		'delete-favorite': t('deleteFavorite'),
		'add-folder': t('addFolder'),
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
		accounts,
		computingSystemServicePorts,
		dispatch,
		resourceId,
		userData.access_token,
	]);

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
				case 'delete-favorite':
					dispatch(favoritesAction.deleteFavorite(resourceId));
					break;
				case 'add-folder':
					dispatch(
						favoritesAction.addFavoriteGroup({
							id: resourceId,
							name: t('addFolder'),
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
			id={resourceId + '-favorites-context-menu'}
			animation={animation.slide}
		>
			{Object.entries(contextMenuList).map(([key, value]) => (
				<Item key={key} onClick={handleOnClickEvents(key)}>
					{value}
				</Item>
			))}
		</ContextMenu>
	);
};

FavoriteContextMenu.propTypes = {
	resourceId: PropTypes.string.isRequired,
};

export default FavoriteContextMenu;
