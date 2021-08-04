import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../../hooks/useDoubleClick';
import useInput from '../../../hooks/useInput';
import {
	LOCAL_SAVE_FAVORITES,
	SET_CLICKED_SERVER,
	SORT_FAVORITES_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import {SSH_SEND_CONNECTION_REQUEST} from '../../../reducers/ssh';

import {activeColor, iconColor} from '../../../styles/color';
import {awsServerIcon, linuxServerIcon} from '../../../icons/icons';
import {connectionAction} from '../../../reducers/sftp';
import FavoritesContextMenu from '../../ContextMenu/FavoritesContextMenu';
import {Icon} from '../../../styles/components/icon';
import {
	NavigationBarInput,
	NavigationBarTitle,
	NavigationItems,
} from '../../../styles/components/navigationBar';

const FavoriteServer = ({data, indent, temp}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, theme, identity} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');
	const correspondedIdentity = useMemo(
		() => identity.find((it) => it.key === data.key && it.checked === true),
		[identity, data],
	);

	const onHybridClick = useDoubleClick(
		() => {
			if (temp) return;

			const correspondedServer = server.find((i) => i.id === data.id);

			if (correspondedServer.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					data: {
						token: userTicket.access_token,
						...correspondedServer,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,
					},
				});
			} else if (correspondedServer.protocol === 'SFTP') {
				dispatch(
					connectionAction({
						token: userTicket.access_token, // connection info
						host: correspondedServer.host,
						port: correspondedServer.port,
						user: correspondedIdentity.user,
						password: correspondedIdentity.password,

						name: correspondedServer.name, // create tab info
						key: correspondedServer.key,
						id: correspondedServer.id,
					}),
				);
			}
		},
		() => {
			if (clicked_server === data.key) {
				dispatch({type: SET_CLICKED_SERVER, data: null});
			} else {
				dispatch({type: SET_CLICKED_SERVER, data: data.key});
			}
		},
		[
			clicked_server,
			data,
			userTicket,
			server,
			identity,
			dispatch,
			correspondedIdentity,
		],
	);

	const {show} = useContextMenu({
		id: data.key + 'server',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			console.log('contextMenuOpen item');
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data, dispatch, show],
	);

	const EscapeKey = useCallback((e) => {
		if (e.keyCode === 27) setOpenRename(false);
	}, []);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			console.log('favorites server next put item');

			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_FAVORITES_SERVER_AND_FOLDER,
					data: {next: data},
				});
			dispatch({type: LOCAL_SAVE_FAVORITES});
		},
		[data, dispatch],
	);

	const handleDragOver = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);

	//when re-name form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (openRename) {
				await setRenameValue(data.name);
				await renameRef.current.focus();
				await renameRef.current.select();
			}
		};
		fillInForm();
	}, [openRename, renameRef, data, setRenameValue]);

	return (
		<React.Fragment>
			<NavigationItems
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDragOver={handleDragOver}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				selected={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					color={
						clicked_server === data.key
							? activeColor[theme]
							: iconColor[theme]
					}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<NavigationBarTitle theme_value={theme}>
					{openRename ? (
						<NavigationBarInput
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={EscapeKey}
							theme_value={theme}
						/>
					) : (
						data.name
					)}
				</NavigationBarTitle>
			</NavigationItems>
			{!temp && (
				<FavoritesContextMenu
					correspondedIdentity={correspondedIdentity}
					data={data}
					setOpenRename={setOpenRename}
				/>
			)}
		</React.Fragment>
	);
};

FavoriteServer.propTypes = {
	data: PropTypes.object.isRequired,
	temp: PropTypes.bool.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteServer;
