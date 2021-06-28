import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {useDispatch, useSelector} from 'react-redux';

import {useDoubleClick} from '../../hooks/useDoubleClick';
import ServerContextMenu from '../ContextMenu/ServerContextMenu';
import useInput from '../../hooks/useInput';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssh';
import {Span} from '../../styles/global';
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {connectionAction} from '../../reducers/sftp';
import {FONT_14, HEIGHT_34} from '../../styles/length';
import {
	activeColor,
	fontColor,
	iconColor,
	navColor,
	navHighColor,
} from '../../styles/color';
import {awsServerIcon, linuxServerIcon} from '../../icons/icons';

export const _Form = styled.form`
	border: none;
	display: flex;
	padding: 4px 0px;
`;

export const _Input = styled.input`
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
	font-size: ${FONT_14};
	padding: 0;
	margin: 0;
	border: none;
	outline: none;
`;

export const _NavItem = styled(Nav.Item)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${HEIGHT_34};
	padding: auto 16px;
	padding-left: ${(props) => props?.left};
	background-color: ${(props) => props.back};
	border-left: 2px solid;
	border-color: ${(props) => props.bcolor};
`;

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server, theme, identity} = useSelector(
		(state) => state.common,
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
		[data, dispatch],
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
		[data, renameValue],
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
		[data],
	);
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
	}, [openRename, renameRef, data]);

	return (
		<React.Fragment>
			<_NavItem
				onClick={onHybridClick}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				bcolor={
					clicked_server === data.key
						? activeColor[theme]
						: navColor[theme]
				}
				back={
					clicked_server === data.key
						? navHighColor[theme]
						: navColor[theme]
				}
				left={(indent * 6 + 10).toString() + 'px'}
			>
				{clicked_server === data.key ? (
					<div>
						{data.icon === 'linux' &&
							linuxServerIcon(activeColor[theme])}
						{data.icon === 'aws' &&
							awsServerIcon(activeColor[theme])}
					</div>
				) : (
					<div>
						{data.icon === 'linux' &&
							linuxServerIcon(iconColor[theme])}
						{data.icon === 'aws' && awsServerIcon(iconColor[theme])}
					</div>
				)}
				<Span color={fontColor[theme]} flex={1} size={FONT_14}>
					{openRename ? (
						<_Form onSubmit={handleSubmit} onBlur={handleSubmit}>
							<_Input
								back={navHighColor[theme]}
								color={fontColor[theme]}
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
							/>
						</_Form>
					) : (
						data.name
					)}
				</Span>
			</_NavItem>
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
