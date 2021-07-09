import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CHANGE_CURRENT_TAB, CLOSE_TAB} from '../reducers/common';
import SSHContainer from './SSH/SSHContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {
	SSH_SEND_CONNECTION_REQUEST,
	SSH_SEND_DISCONNECTION_REQUEST,
} from '../reducers/ssh';
import {closeIcon, sftpIcon, sshIcon} from '../icons/icons';

import {FONT_14} from '../styles/length';
import {
	activePaneHeaderColor,
	borderColor,
	fontColor,
	paneHeaderHigh,
	tabColor,
} from '../styles/color';
import {ClickableIconButton, IconBox, PrimaryRedButton} from '../styles/button';
import {
	connectionAction,
	disconnectAction,
	reconnectionAction,
} from '../reducers/sftp';
import {PreventDragCopy} from '../styles/function';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.hidden {
		display: none;
	}
	position: relative;
`;

const _Header = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 12px 0px 16px;
	z-index: 1;
	border: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const _HeaderText = styled.div`
	display: flex;
	align-items: center;
	font-size: ${FONT_14};
	color: ${(props) => props.color};
`;

const _ReconectBlock = styled.div`
	background: rgba(0, 0, 0, 0.3);
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	z-index: 5;
	${PreventDragCopy}
`;

const Pane = ({uuid, type, server}) => {
	const dispatch = useDispatch();
	const [ready, setReady] = useState(1);
	const {
		tab,
		current_tab,
		theme,
		identity,
		server: commonServer,
	} = useSelector((state) => state.common, shallowEqual);
	const {userTicket} = useSelector((state) => state.userTicket);

	const ssh = useSelector((state) => state.ssh.ssh);
	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		history: sftp_history,
	} = useSelector((state) => state.sftp, shallowEqual);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [current_tab, dispatch, uuid]);

	const onClickDelete = useCallback(
		(e) => {
			const {socket: sftpSocket} = sftp_socketState.find(
				(v) => v.uuid === uuid,
			);

			e.stopPropagation();
			if (type === 'SSH') {
				dispatch({
					type: SSH_SEND_DISCONNECTION_REQUEST,
					data: {
						uuid: uuid,
						ws: ssh.find((v) => v.uuid === uuid).ws,
					},
				});
			} else if (type === 'SFTP') {
				dispatch(
					disconnectAction({
						uuid,
						socket: sftpSocket,
					}),
				);
			}
		},
		[sftp_socketState, type, uuid, dispatch, ssh],
	);

	const onReconnect = useCallback(() => {
		const correspondedServer = commonServer.find(
			(i) => i.key === server.key,
		);
		const correspondedIdentity = identity.find(
			(it) => it.key === server.key && it.checked === true,
		);

		if (type === 'SSH') {
			const closedSsh = ssh.find((v) => v.uuid === uuid);
			console.log(closedSsh);
			dispatch({
				type: SSH_SEND_CONNECTION_REQUEST,
				data: {
					token: userTicket.access_token,
					...correspondedServer,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,
				},
			});
		} else {
			const {path} = sftp_pathState.find((v) => v.uuid === uuid);

			dispatch(
				reconnectionAction({
					token: userTicket.access_token, // connection info
					host: correspondedServer.host,
					port: correspondedServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,

					name: correspondedServer.name, // create tab info
					key: correspondedServer.key,
					id: correspondedServer.id,
					dispatch: dispatch,

					prevUuid: uuid,
					prevPath: path,
				}),
			);
		}
	}, [
		commonServer,
		dispatch,
		identity,
		server,
		sftp_history,
		sftp_pathState,
		ssh,
		type,
		userTicket,
		uuid,
	]);

	useEffect(() => {
		if (type === 'SSH') {
			const {ready} = ssh.find((v) => v.uuid === uuid);
			setReady(ready);
		} else {
			const {ready} = sftp_socketState.find((v) => v.uuid === uuid);
			setReady(ready);
		}
	}, [sftp_socketState, ssh, type, uuid]);

	return (
		<_Container onClick={onClickChangeTab}>
			{ready === 3 && (
				<_ReconectBlock>
					<PrimaryRedButton onClick={onReconnect}>
						Reconnect
					</PrimaryRedButton>
				</_ReconectBlock>
			)}
			{tab.filter((v) => v.display === true).length > 1 && (
				<_Header
					back={
						current_tab === uuid
							? paneHeaderHigh[theme]
							: tabColor[theme]
					}
					bcolor={
						current_tab === uuid
							? activePaneHeaderColor[theme]
							: borderColor[theme]
					}
				>
					<_HeaderText color={fontColor[theme]}>
						{type === 'SSH' && (
							<IconBox
								size={'xs'}
								margin_right={'6px'}
								color={fontColor[theme]}
							>
								{sshIcon}
							</IconBox>
						)}
						{type === 'SFTP' && (
							<IconBox
								size={'xs'}
								margin_right={'6px'}
								color={fontColor[theme]}
							>
								{sftpIcon}
							</IconBox>
						)}
						{server.name}
					</_HeaderText>
					<ClickableIconButton
						theme_value={theme}
						size={'micro'}
						margin={'0xp 0px 0px 6px'}
						onClick={onClickDelete}
					>
						{closeIcon}
					</ClickableIconButton>
				</_Header>
			)}
			{type === 'SSH' && <SSHContainer uuid={uuid} server={server} />}
			{type === 'SFTP' && <SFTPContainer uuid={uuid} />}
		</_Container>
	);
};

Pane.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default Pane;
