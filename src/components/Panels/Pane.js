import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {sshAction, sshSelector} from '../../reducers/ssh';
import {closeIcon, sftpIcon, sshIcon} from '../../icons/icons';
import {WarningButton} from '../../styles/components/button';
import {DISCONNECTION_REQUEST, RECONNECTION_REQUEST} from '../../reducers/sftp';
import {PreventDragCopy} from '../../styles/function';
import {HoverButton, Icon} from '../../styles/components/icon';
import {authSelector} from '../../reducers/api/auth';
import {tabBarAction, tabBarSelector} from '../../reducers/tabBar';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import SSHContainer from '../SSH/SSHContainer';
import SFTPContainer from '../SFTP/Containers/SFTPContainer';

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

const Pane = ({uuid, type, resourceId}) => {
	const dispatch = useDispatch();

	const {terminalTabs, selectedTab} = useSelector(tabBarSelector.all);
	const {userData} = useSelector(authSelector.all);

	const {resources, accounts} = useSelector(remoteResourceSelector.all);

	const {ssh} = useSelector(sshSelector.all);
	const {socket: sftp_socketState, path: sftp_pathState} = useSelector(
		(state) => state.sftp,
		shallowEqual,
	);
	//TODO: if possible to use ws.readyState, delete readyState
	const [readyState, setReadyState] = useState(1);

	const onClickChangeCurrentTab = useCallback(() => {
		if (selectedTab !== uuid) dispatch(tabBarAction.selectTab(uuid));
	}, [selectedTab, dispatch, uuid]);

	const onClickCloseTab = useCallback(
		(e) => {
			e.stopPropagation();

			if (type === 'SSH') {
				dispatch(
					sshAction.disconnectRequest({
						uuid: uuid,
						ws: ssh.find((v) => v.uuid === uuid).ws,
					}),
				);
			}
			if (type === 'SFTP') {
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

	const onClickReconnectToServer = useCallback(() => {
		const resource = resources.find((i) => i.key === resourceId);
		const account = accounts.find(
			(it) =>
				it.resourceId === resourceId && it.isDefaultAccount === true,
		);

		const terminalTabIndex = terminalTabs.findIndex((v) => v.uuid === uuid);

		if (type === 'SSH') {
			dispatch(
				sshAction.reconnectRequest({
					token: userData.access_token,
					...resource,
					user: account.user,
					password: account.password,

					prevUuid: uuid,
					prevIndex: terminalTabIndex,
				}),
			);
		} else {
			dispatch({
				type: RECONNECTION_REQUEST,
				payload: {
					token: userData.access_token, // connection info
					host: resource.host,
					port: resource.port,
					user: account.user,
					password: account.password,

					name: resource.name, // create tab info
					key: resource.key,
					id: resource.id,

					prevUuid: uuid,
					prevIndex: terminalTabIndex,
					prevPath: sftp_pathState.find((v) => v.uuid === uuid).path,
				},
			});
		}
	}, [
		resources,
		dispatch,
		accounts,
		resourceId,
		sftp_pathState,
		terminalTabs,
		type,
		userData,
		uuid,
	]);

	useEffect(() => {
		if (type === 'SSH') {
			setReadyState(ssh.find((v) => v.uuid === uuid).ready);
		} else {
			setReadyState(sftp_socketState.find((v) => v.uuid === uuid).ready);
		}
	}, [sftp_socketState, ssh, type, uuid]);

	return (
		<_Container onClick={onClickChangeCurrentTab}>
			{readyState === 3 && (
				<_ReconectBlock>
					<WarningButton onClick={onClickReconnectToServer}>
						Reconnect
					</WarningButton>
				</_ReconectBlock>
			)}
			{terminalTabs.filter((v) => v.display === true).length > 1 && (
				<_Header selected={selectedTab === uuid}>
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
						{resources.find((v) => v.id === resourceId).name}
					</_HeaderText>
					<HoverButton
						size={'micro'}
						margin='0px'
						onClick={onClickCloseTab}
					>
						{closeIcon}
					</HoverButton>
				</_Header>
			)}
			{type === 'SSH' && (
				<SSHContainer uuid={uuid} resourceKey={resourceId} />
			)}
			{type === 'SFTP' && <SFTPContainer uuid={uuid} />}
		</_Container>
	);
};

Pane.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	resourceId: PropTypes.string.isRequired,
};

export default Pane;
