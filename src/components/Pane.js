import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {CHANGE_CURRENT_TAB} from '../reducers/common';
import SSHContainer from './SSH/SSHContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../reducers/ssh';
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
import {disconnectAction} from '../reducers/sftp';
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
	const [readyState, setReadyState] = useState(null);
	const {tab, current_tab, theme} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const ssh = useSelector((state) => state.ssh.ssh);
	const sftp = useSelector((state) => state.sftp.sftp);
	const socket = useSelector((state) => state.sftp.socket);

	const corSsh = ssh.find((v) => v.uuid === uuid);
	const corSftpList = listState.find((v) => v.uuid === uuid);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [current_tab, dispatch, uuid]);

	const onClickDelete = useCallback(
		(e) => {
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
						socket: sftp.find((v) => v.uuid === uuid).socket,
					}),
				);
			}
		},
		[type, dispatch, uuid, ssh, sftp],
	);
	//

	return (
		<_Container onClick={onClickChangeTab}>
			{(type === 'SSH' && corSftpList.socketStatus === 3) ||
				(type === 'SFTP' && corSftpList.socketStatus === 3 && (
					<_ReconectBlock>
						<PrimaryRedButton>Reconnect</PrimaryRedButton>
					</_ReconectBlock>
				))}
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
