import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_CURRENT_TAB} from '../reducers/common';
import SSHContainer from './SSH/SSHContainer';
import SFTPContainer from './SFTP/SFTPContainer';
import {
	IconButton,
	SSH_SFTP_HEADER_HEIGHT,
	fontColor,
	borderColor,
	iconColor,
	GREEN_COLOR,
	IconContainer,
	backColor,
} from '../styles/global';
import {SSH_SEND_DISCONNECTION_REQUEST} from '../reducers/ssh';
import {disconnectAction} from '../reducers/sftp';
import {closeIconSmall, sftpIconSmall, sshIcon} from '../icons/icons';
import {FONT_14, HEIGHT_30} from '../styles/length';

const _Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.hidden {
		display: none;
	}
`;

const _Header = styled.div`
	height: ${HEIGHT_30};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 6px;
	z-index: 1;
	border: 1px solid;
	border-color: ${(props) => props.bColor};
	background: ${(props) => props.back};
`;

const _HeaderText = styled.div`
	display: flex;
	align-items: center;
	font-size: ${FONT_14};
	color: ${(props) => props.color};
`;

const Pane = ({uuid, type, server}) => {
	const dispatch = useDispatch();
	const {tab, current_tab, theme} = useSelector((state) => state.common);
	const {ssh} = useSelector((state) => state.ssh);
	const {sftp} = useSelector((state) => state.sftp);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [current_tab, uuid]);

	const onClickDelete = useCallback(() => {
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
	}, [ssh, sftp, uuid, type]);

	return (
		<_Container onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length > 1 && (
				<_Header
					back={backColor[theme]}
					bColor={
						current_tab === uuid ? GREEN_COLOR : borderColor[theme]
					}
				>
					<_HeaderText color={fontColor[theme]}>
						{type === 'SSH' && (
							<IconContainer padding={'0px 8px 0px 0px'}>
								{sshIcon('black')}
							</IconContainer>
						)}
						{type === 'SFTP' && (
							<IconContainer padding={'0px 8px 0px 0px'}>
								{sftpIconSmall}
							</IconContainer>
						)}
						{server.name}
					</_HeaderText>
					<IconButton
						color={iconColor[theme]}
						onClick={onClickDelete}
					>
						{closeIconSmall}
					</IconButton>
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
