import React, {useCallback} from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_CURRENT_TAB} from '../../reducers/common';
import SSHTContainer from '../SSHT/SSHTContainer';
import SFTPContainer from '../SFTP/SFTPContainer';
import {
	AVOCADO_COLOR,
	Avocado_span,
	Button,
	ICON_DARK_COLOR,
	LIGHT_MODE_BACK_COLOR,
	SSH_SFTP_HEADER_HEIGHT,
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
	display: flex;
	flex-direction: column;
`;

const SSH_SFTP_Header = styled.div`
	height: ${SSH_SFTP_HEADER_HEIGHT};
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 1;
	background: ${LIGHT_MODE_BACK_COLOR};
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
		// visibleTab.slice().findIndex((it) => it.uuid === uuid) !== -1 && (
		<SSH_SFTP_Container onClick={onClickChangeTab}>
			{tab.filter((v) => v.display === true).length !== 1 && (
				<SSH_SFTP_Header>
					<Avocado_span
						color={current_tab === uuid ? AVOCADO_COLOR : undefined}
					>
						{type === 'SSHT' ? (
							<RiTerminalFill />
						) : (
							<RiArrowUpDownLine />
						)}
						<Avocado_span>{server.name}</Avocado_span>
					</Avocado_span>
					<Button color={ICON_DARK_COLOR} onClick={onClickDelete}>
						<IoCloseOutline />
					</Button>
				</SSH_SFTP_Header>
			)}
			{type === 'SSHT' ? (
				<SSHTContainer uuid={uuid} server_id={server.id} />
			) : (
				<SFTPContainer uuid={uuid} />
			)}
		</SSH_SFTP_Container>
	);
	// );
};

SSH_SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	server: PropTypes.object.isRequired,
};

export default SSH_SFTP;
