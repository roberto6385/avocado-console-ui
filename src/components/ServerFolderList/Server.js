import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {SSH_SEND_CONNECTION_REQUEST} from '../../reducers/ssht';
import {
	GREEN_COLOR,
	AVOCADO_FONTSIZE,
	SERVER_HOVER_COLOR,
	Span,
	LIGHT_MODE_BACK_COLOR,
	FOLDER_HEIGHT,
	IconContainer,
	ICON_MINT_COLOR,
	ICON_GRAY_COLOR,
} from '../../styles/global';
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {connectionAction} from '../../reducers/sftp';
import {dnsIcon, dnsIconMidium, dnsOpenIcon} from '../../icons/icons';

export const _Form = styled.form`
	border: 1px solid ${GREEN_COLOR};
	display: flex;
	padding: 4px;
`;

export const _Input = styled.input`
	font-size: 14px;
	border: none;
	outline: none;
`;

export const _NavItem = styled(Nav.Item)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${FOLDER_HEIGHT};
	padding: auto 16px;
	padding-left: ${(props) => props?.left};
	background-color: ${(props) => props.back};
	border-left: ${(props) => props.border};
`;

const Server = ({data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server, server} = useSelector((state) => state.common);
	const {userTicket} = useSelector((state) => state.userTicket);
	const [openRename, setOpenRename] = useState(false);
	const renameRef = useRef(null);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onHybridClick = useDoubleClick(
		() => {
			const correspondedServer = server.find((i) => i.id === data.id);
			if (correspondedServer.protocol === 'SSH2') {
				dispatch({
					type: SSH_SEND_CONNECTION_REQUEST,
					data: {
						token: userTicket,
						...correspondedServer,
					},
				});
			} else if (correspondedServer.protocol === 'SFTP') {
				dispatch(
					connectionAction({
						token: userTicket,
						...correspondedServer,
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
		[clicked_server, data, userTicket, server, dispatch],
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
				back={
					clicked_server === data.key
						? SERVER_HOVER_COLOR
						: LIGHT_MODE_BACK_COLOR
				}
				border={
					clicked_server === data.key
						? `2px solid ${GREEN_COLOR}`
						: `2px solid white`
				}
				left={(indent * 6 + 10).toString() + 'px'}
			>
				{/*<Avocado_span*/}
				{/*	size={MIDDLE_FONTSIZE}*/}
				{/*	color={*/}
				{/*		clicked_server === data.key*/}
				{/*			? GREEN_COLOR*/}
				{/*			: ICON_LIGHT_COLOR*/}
				{/*	}*/}
				{/*>*/}
				{/*	<FaServerIcon />*/}
				{/*</Avocado_span>*/}
				{clicked_server === data.key ? (
					<IconContainer
						margin={`0px 12px 0px 0px`}
						color={ICON_MINT_COLOR}
					>
						{dnsIconMidium}
					</IconContainer>
				) : (
					<IconContainer margin={`0px 12px 0px 0px`}>
						{dnsIconMidium}
					</IconContainer>
				)}
				<Span flex={1} size={AVOCADO_FONTSIZE}>
					{openRename ? (
						<_Form onSubmit={handleSubmit} onBlur={handleSubmit}>
							<_Input
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
			<ServerContextMenu data={data} setOpenRename={setOpenRename} />
		</React.Fragment>
	);
};

Server.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Server;
