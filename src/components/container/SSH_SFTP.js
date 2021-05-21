import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_CURRENT_TAB} from '../../reducers/common';
import SSHContainer from '../SSH/SSHContainer';
import SFTPContainer from '../SFTP/SFTPContainer';
import {
	GREEN_COLOR,
	Avocado_span,
	IconButton,
	ICON_DARK_COLOR,
	LIGHT_MODE_BACK_COLOR,
	SSH_SFTP_HEADER_HEIGHT,
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
} from '../../styles/global_design';
import {
	IoCloseOutline,
	RiArrowUpDownLine,
	RiTerminalFill,
} from 'react-icons/all';
import {SSHT_SEND_DISCONNECTION_REQUEST} from '../../reducers/ssht';
import {disconnectAction} from '../../reducers/sftp';

const SSH_SFTP_Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;

	.hidden {
		display: none;
	}
`;

const SSH_SFTP_Header = styled.div`
	height: ${SSH_SFTP_HEADER_HEIGHT};
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 6px;
	z-index: 1;
	border-bottom: 1px solid ${BORDER_COLOR};
	background: ${LIGHT_MODE_BACK_COLOR};
`;

const Span = styled.span`
	display: flex;
	align-items: center;
	font-size: ${AVOCADO_FONTSIZE};
`;

const SSH_SFTP = ({uuid, type, server}) => {
	const dispatch = useDispatch();
	const {tab, current_tab} = useSelector((state) => state.common);
	const {ssht} = useSelector((state) => state.ssht);
	const {sftp} = useSelector((state) => state.sftp);

	const onClickChangeTab = useCallback(() => {
		if (current_tab !== uuid)
			dispatch({type: CHANGE_CURRENT_TAB, data: uuid});
	}, [current_tab, uuid]);

	const onClickDelete = useCallback(() => {
		if (type === 'SSHT') {
			dispatch({
				type: SSHT_SEND_DISCONNECTION_REQUEST,
				data: {
					uuid: uuid,
					ws: ssht.find((v) => v.uuid === uuid).ws,
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
	}, [ssht, sftp, uuid, type]);

	return (
		<SSH_SFTP_Container onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<SSH_SFTP_Header>
					<Span>
						{type === 'SSHT' ? (
							<RiTerminalFill />
						) : (
							<span className='material-icons button_small'>
								swap_vert
							</span>
						)}
						{server.name}
					</Span>
					<IconButton color={ICON_DARK_COLOR} onClick={onClickDelete}>
						<span className='material-icons button_small'>
							close
						</span>
					</IconButton>
				</SSH_SFTP_Header>
			)}
			{type === 'SSHT' ? (
				<SSHContainer uuid={uuid} server_id={server.id} />
			) : (
				<SFTPContainer uuid={uuid} />
			)}
		</SSH_SFTP_Container>
	);
};

SSH_SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default SSH_SFTP;
