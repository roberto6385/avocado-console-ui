import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {CHANGE_CURRENT_TAB} from '../../reducers/common';
import SSHContainer from '../SSH/SSHContainer';
import SFTP_ from '../SFTP/containers/SFTP_';
import {
	SSH_SEND_DISCONNECTION_REQUEST,
	SSH_SEND_RECONNECTION_REQUEST,
} from '../../reducers/ssh';
import {closeIcon, sftpIcon, sshIcon} from '../../icons/icons';
import {WarningButton} from '../../styles/components/button';
import {DISCONNECTION_REQUEST, RECONNECTION_REQUEST} from '../../reducers/sftp';
import {PreventDragCopy} from '../../styles/function';
import {HoverButton, Icon} from '../../styles/components/icon';

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
	border-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.panels.header.selectedStyle
					.border.color
			: props.theme.pages.webTerminal.main.panels.header.normalStyle
					.border.color};
	background: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.panels.header.selectedStyle
					.backgroundColor
			: props.theme.pages.webTerminal.main.panels.header.normalStyle
					.backgroundColor};
`;

const _HeaderText = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
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
		identity,
		server: commonServer,
	} = useSelector((state) => state.common, shallowEqual);
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);

	const ssh = useSelector((state) => state.ssh.ssh, shallowEqual);
	const {
		socket: sftp_socketState,
		path: sftp_pathState,
		history: sftp_history,
	} = useSelector((state) => state.sftp, shallowEqual);

	const onClickChangeCurrentTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, payload: uuid});
	}, [current_tab, dispatch, uuid]);

	const onClickDelete = useCallback(
		(e) => {
			e.stopPropagation();
			if (type === 'SSH') {
				dispatch({
					type: SSH_SEND_DISCONNECTION_REQUEST,
					payload: {
						uuid: uuid,
						ws: ssh.find((v) => v.uuid === uuid).ws,
					},
				});
			} else if (type === 'SFTP') {
				dispatch({
					type: DISCONNECTION_REQUEST,
					payload: {
						uuid,
						socket: sftp_socketState.find((v) => v.uuid === uuid)
							.socket,
					},
				});
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

		const index = tab.findIndex((v) => v.uuid === uuid);

		if (type === 'SSH') {
			dispatch({
				type: SSH_SEND_RECONNECTION_REQUEST,
				payload: {
					token: userTicket.access_token,
					...correspondedServer,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,

					prevUuid: uuid,
					prevIndex: index,
				},
			});
		} else {
			const {path} = sftp_pathState.find((v) => v.uuid === uuid);

			dispatch({
				type: RECONNECTION_REQUEST,
				payload: {
					token: userTicket.access_token, // connection info
					host: correspondedServer.host,
					port: correspondedServer.port,
					user: correspondedIdentity.user,
					password: correspondedIdentity.password,

					name: correspondedServer.name, // create tab info
					key: correspondedServer.key,
					id: correspondedServer.id,

					prevUuid: uuid,
					prevIndex: index,
					prevPath: path,
				},
			});
		}
	}, [
		commonServer,
		dispatch,
		identity,
		server,
		sftp_pathState,
		tab,
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
		<_Container onClick={onClickChangeCurrentTab}>
			{ready === 3 && (
				<_ReconectBlock>
					<WarningButton onClick={onReconnect}>
						Reconnect
					</WarningButton>
				</_ReconectBlock>
			)}
			{tab.filter((v) => v.display === true).length > 1 && (
				<_Header selected={current_tab === uuid ? true : false}>
					<_HeaderText>
						{type === 'SSH' && (
							<Icon
								size={'xs'}
								margin_right={'6px'}
								itype={'font'}
							>
								{sshIcon}
							</Icon>
						)}
						{type === 'SFTP' && (
							<Icon
								size={'xs'}
								margin_right={'6px'}
								itype={'font'}
							>
								{sftpIcon}
							</Icon>
						)}
						{server.name}
					</_HeaderText>
					<HoverButton
						size={'micro'}
						margin='0px'
						onClick={onClickDelete}
					>
						{closeIcon}
					</HoverButton>
				</_Header>
			)}
			{type === 'SSH' && <SSHContainer uuid={uuid} server={server} />}
			{type === 'SFTP' && <SFTP_ uuid={uuid} />}
		</_Container>
	);
};

Pane.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default Pane;
