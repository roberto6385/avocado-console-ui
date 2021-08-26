import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';

import {sshAction, sshSelector} from '../../reducers/ssh';
import {closeIcon, sftpIcon, sshIcon} from '../../icons/icons';
import {WarningButton} from '../../styles/components/button';
import {PreventDragCopy} from '../../styles/function';
import {HoverButton, Icon} from '../../styles/components/icon';
import {authSelector} from '../../reducers/api/auth';
import {tabBarAction, tabBarSelector} from '../../reducers/tabBar';
import {remoteResourceSelector} from '../../reducers/remoteResource';
import SSHContainer from '../SSH/SSHContainer';
import SFTPContainer from '../SFTP/Containers/SFTPContainer';
import {sftpAction, sftpSelector} from '../../reducers/renewal';

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

	const {resources, accounts, computingSystemServicePorts} = useSelector(
		remoteResourceSelector.all,
	);

	const {ssh} = useSelector(sshSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

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
				dispatch(
					sftpAction.disconnect({
						uuid: uuid,
						socket: sftp.socket,
					}),
				);
			}
		},
		[dispatch, sftp, ssh, type, uuid],
	);

	const onClickReconnectToServer = useCallback(() => {
		const terminalTabIndex = terminalTabs.findIndex((v) => v.uuid === uuid);
		const computingSystemPort = computingSystemServicePorts.find(
			(v) => v.id === resourceId,
		);
		const account = accounts.find(
			(v) => v.resourceId === resourceId && v.isDefaultAccount === true,
		);

		if (type === 'SSH2') {
			dispatch(
				sshAction.reconnectRequest({
					token: userData.access_token,
					host: computingSystemPort.host,
					port: computingSystemPort.port,
					user: account.user,
					password: account.password,
					id: computingSystemPort.id,
					prevUuid: uuid,
					prevIndex: terminalTabIndex,
				}),
			);
		}
		if (type === 'SFTP') {
			dispatch(
				sftpAction.reconnect({
					token: userData.access_token, // connection info
					host: computingSystemPort.host,
					port: computingSystemPort.port,
					user: account.user,
					password: account.password,
					name: computingSystemPort.name, // create tab info
					id: computingSystemPort.id,
					prevUuid: uuid,
					prevPath: sftp.path,
					prevIndex: terminalTabIndex,
				}),
			);
		}
	}, [
		accounts,
		computingSystemServicePorts,
		dispatch,
		resourceId,
		sftp,
		terminalTabs,
		type,
		userData.access_token,
		uuid,
	]);

	useEffect(() => {
		if (type === 'SSH') {
			setReadyState(ssh.find((v) => v.uuid === uuid).ready);
		}
		if (type === 'SFTP') {
			setReadyState(sftp.readyState);
		}
	}, [sftp, ssh, type, uuid]);

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
				<SSHContainer uuid={uuid} resourceId={resourceId} />
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
