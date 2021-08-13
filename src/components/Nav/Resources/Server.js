import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import ServerContextMenu from '../../ContextMenu/ServerContextMenu';
import {
	ADD_FAVORITE_SERVER,
	DELETE_FAVORITE_SERVER,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import {SSH_SEND_CONNECTION_REQUEST} from '../../../reducers/ssh';
import {
	awsServerIcon,
	bookmarkIcon,
	linuxServerIcon,
} from '../../../icons/icons';
import styled from 'styled-components';
import {CONNECTION_REQUEST} from '../../../reducers/sftp';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	NavigationItem,
	NavigationItemTitle,
} from '../../../styles/components/navigationBar';
import {AUTH} from '../../../reducers/api/auth';

export const ServerItem = styled(NavigationItem)`
	.bookmark_button {
		display: none;
	}
	.active {
		display: block;
	}
	&:hover {
		.bookmark_button {
			display: block;
		}
	}
`;

function searchNode(node, key) {
	if (node.key === key) {
		return true;
	} else if (node.contain && node.contain.length > 0) {
		for (let x of node.contain) {
			searchNode(x, key);
		}
	}
	return false;
}

function isFavoriteServer(root, key) {
	for (let x of root) {
		if (searchNode(x, key)) return true;
	}
	return false;
}

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, identity, favorites} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userData} = useSelector((state) => state[AUTH], shallowEqual);
	const correspondedIdentity = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const onHybridClick = useDoubleClick(
		() => {
			const correspondedServer = server.find((i) => i.id === data.id);

			if (correspondedServer.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					payload: {
						token: userData.access_token,
						...correspondedServer,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
					},
				});
			} else if (correspondedServer.protocol === 'SFTP') {
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
			}
		},
		() => {
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			}
		},
		[
			clicked_server,
			data,
			userData,
			server,
			identity,
			dispatch,
			correspondedIdentity,
		],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const openServerContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data, dispatch, show],
	);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({type: SORT_SERVER_AND_FOLDER, payload: {next: data}});
		},
		[data, dispatch],
	);

	const onClickFavoriteIcon = useCallback(() => {
		console.log(isFavoriteServer(favorites, data.key));

		if (isFavoriteServer(favorites, data.key)) {
			dispatch({type: DELETE_FAVORITE_SERVER, payload: data.key});
		} else {
			dispatch({type: ADD_FAVORITE_SERVER, payload: data.key});
		}
	}, [data, favorites]);

	return (
		<React.Fragment>
			<ServerItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={openServerContextMenu}
				selected={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={clicked_server === data.key && 'selected'}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<NavigationItemTitle>
					{data.name}
					<IconButton
						className={
							isFavoriteServer(favorites, data.key)
								? 'bookmark_button active'
								: 'bookmark_button'
						}
						size={'sm'}
						margin_right={'0px'}
						onClick={onClickFavoriteIcon}
						itype={
							isFavoriteServer(favorites, data.key)
								? 'selected'
								: undefined
						}
					>
						{bookmarkIcon}
					</IconButton>
				</NavigationItemTitle>
			</ServerItem>
			<ServerContextMenu identity={correspondedIdentity} data={data} />
		</React.Fragment>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
