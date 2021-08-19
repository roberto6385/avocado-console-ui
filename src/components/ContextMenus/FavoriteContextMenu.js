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

const FavoriteContextMenu = ({identity, data}) => {
	const dispatch = useDispatch();
	const {t} = useTranslation('favoriteContextMenu');

	const {resources} = useSelector(remoteResourceSelector.all);

	const {userData} = useSelector(authSelector.all);

	const contextMenuList = {
		'connect-ssh': t('connectSsh'),
		'connect-sftp': t('connectSftp'),
		'delete-favorite': t('deleteFavorite'),
		'add-folder': t('addFolder'),
	};

	const onClickOpenSFTP = useCallback(() => {
		const resource = resources.find((v) => v.key === data.key);

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
	}, [resources, dispatch, userData, identity, data.key]);

	const onClickOpenSSH = useCallback(() => {
		const resource = resources.find((v) => v.key === data.key);

		dispatch(
			sshAction.connectRequest({
				token: userData.access_token,
				...resource,
				user: identity.user,
				password: identity.password,
			}),
		);
	}, [resources, dispatch, userData, identity, data.key]);

	const onClickAddFolder = useCallback(() => {
		dispatch(
			favoritesAction.addFavoriteGroup({
				name: t('addFolder'),
				key: 'favorites',
			}),
		);
	}, [dispatch, t]);

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
					dispatch(favoritesAction.deleteFavorite(data.key));
					break;
				case 'add-folder':
					onClickAddFolder();
					break;
				default:
					return;
			}
		},
		[data.key, dispatch, onClickOpenSFTP, onClickOpenSSH, onClickAddFolder],
	);

	return (
		<ContextMenu
			id={data.key + '-favorites-context-menu'}
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
	data: PropTypes.object.isRequired,
	identity: PropTypes.object.isRequired,
};

export default FavoriteContextMenu;
