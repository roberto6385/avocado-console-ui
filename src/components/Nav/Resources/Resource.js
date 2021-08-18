import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import ResourcesContextMenu from '../../ContextMenus/ResourcesContextMenu';
import {
	ADD_FAVORITE_SERVER,
	DELETE_FAVORITE_SERVER,
	SET_CLICKED_SERVER,
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
	ResourceItem,
	ResourceItemTitle,
} from '../../../styles/components/navigationBar';
import {authSelector} from '../../../reducers/api/auth';

export const ServerItem = styled(ResourceItem)`
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

const Resource = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, identity, favorites} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userData} = useSelector(authSelector.all);
	const account = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const {show} = useContextMenu({
		id: data.key + '-resources-context-menu',
	});

	const onClickResource = useDoubleClick(
		() => {
			const resource = server.find((i) => i.id === data.id);

			if (resource.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					payload: {
						token: userData.access_token,
						...resource,
						user: account.user,
						password: account.password,
					},
				});
			} else if (resource.protocol === 'SFTP') {
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
			}
		},
		() => {
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			}
		},
		[clicked_server, data, userData, server, identity, dispatch],
	);

	const openResourceContextMenu = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data, dispatch, show],
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
				onClick={onClickResource}
				onContextMenu={openResourceContextMenu}
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

				<ResourceItemTitle>
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
				</ResourceItemTitle>
			</ServerItem>
			<ResourcesContextMenu identity={account} data={data} />
		</React.Fragment>
	);
};

Resource.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Resource;
