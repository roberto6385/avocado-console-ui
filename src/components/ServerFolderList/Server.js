import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../hooks/useDoubleClick';
import ServerContextMenu from '../ContextMenu/ServerContextMenu';
import useInput from '../../hooks/useInput';
import {
	BOOKMARKING,
	CHANGE_SERVER_FOLDER_NAME,
	LOCAL_SAVE_FAVORITES,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {Nav} from 'react-bootstrap';

import {
	activeColor,
	iconColor,
	navColor,
	navHighColor,
} from '../../styles/color';
import {
	awsServerIcon,
	bookmarkIcon,
	linuxServerIcon,
	starIcon,
} from '../../icons/icons';
import {
	FolderServerTitle,
	NewServerFolderForm,
	NewServerFolderInput,
} from '../../styles/default';
import styled from 'styled-components';
import {ClickableIconButton, IconBox} from '../../styles/button';
import {connectionAction} from '../../reducers/sftp';

export const ServerItem = styled(Nav.Item)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 34px;
	padding: 0px 16px 0px 8px;
	padding-left: ${(props) => props?.left};
	border-left: 2px solid;
	border-color: ${(props) =>
		props.clicked
			? activeColor[props.theme_value]
			: navColor[props.theme_value]};
	background-color: ${(props) =>
		props.clicked
			? navHighColor[props.theme_value]
			: navColor[props.theme_value]};
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

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, theme, identity, favorites} = useSelector(
		(state) => state?.common,
	);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');
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

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			if (renameValue !== data.name)
				dispatch({
					type: CHANGE_SERVER_FOLDER_NAME,
					data: {key: data.key, name: renameValue},
				});
			setOpenRename(false);
		},
		[data, dispatch, renameValue],
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
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: data}});
		},
		[data, dispatch],
	);

	const handleBookmark = useCallback(() => {
		dispatch({type: BOOKMARKING, data: data});
		dispatch({type: LOCAL_SAVE_FAVORITES});
	}, [data, dispatch]);

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
			<ServerItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				theme_value={theme}
				clicked={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<IconBox
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
				</IconBox>

				<FolderServerTitle theme_value={theme}>
					{openRename ? (
						<NewServerFolderForm
							onSubmit={handleSubmit}
							onBlur={handleSubmit}
						>
							<NewServerFolderInput
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
								theme_value={theme}
							/>
						</NewServerFolderForm>
					) : (
						data.name
					)}
					<IconBox
						className={
							favorites.find(
								(v) =>
									JSON.stringify(v) === JSON.stringify(data),
							)
								? 'bookmark_button active'
								: 'bookmark_button'
						}
						size={'sm'}
						margin_right={'0px'}
						theme_value={theme}
						onClick={handleBookmark}
						color={
							favorites.find(
								(v) =>
									JSON.stringify(v) === JSON.stringify(data),
							)
								? activeColor[theme]
								: undefined
						}
					>
						{bookmarkIcon}
					</IconBox>
				</FolderServerTitle>
			</ServerItem>
			<ServerContextMenu
				correspondedIdentity={correspondedIdentity}
				data={data}
				setOpenRename={setOpenRename}
			/>
		</React.Fragment>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
