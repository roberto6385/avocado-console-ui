import React, {useCallback} from 'react';
import {IoCloseOutline} from 'react-icons/all';

import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import Modal from 'react-modal';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	DefaultButton,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
} from '../../styles/global_design';

const _Modal = styled(Modal)`
	border: 1px solid ${BORDER_COLOR};
	position: absolute;
	z-index: 5;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	background: white;
	border-radius: 4px;
	width: 400px;
`;

const _Header = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _Span = styled.span`
	line-height: ${FOLDER_HEIGHT};
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	// border-top: 1px solid ${BORDER_COLOR};
`;

const _Message = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px;
`;

const AlertMessage = {
	invalid_server: '입력하신 서버의 정보가 잘못되었습니다.',
	lost_server: '해당 서버의 정보가 손상되거나 삭제되었습니다.',
	current_path_name: '현재 경로의 폴더 이름은 변경할 수 없습니다.',
	current_path_delete: '현재 경로상의 상위폴더는 삭제할 수 없습니다.',
};

const AlertHeader = {
	invalid_server: 'Invalid Server',
	lost_server: 'Lost Server Data',
	current_path_name: 'Not Allow to Chnage Folder Name',
	current_path_delete: 'Not Allow to Remove Folder',
};

const AlertPopup = () => {
	const dispatch = useDispatch();
	const {alert_popup} = useSelector((state) => state.popup);
	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, [dispatch]);

	return (
		<_Modal
			isOpen={alert_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_Span>
					{Object.prototype.hasOwnProperty.call(
						AlertHeader,
						alert_popup.key,
					) && AlertHeader[alert_popup.key]}
				</_Span>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			{Object.prototype.hasOwnProperty.call(
				AlertMessage,
				alert_popup.key,
			) && (
				<_Message>
					<_Span>{AlertMessage[alert_popup.key]}</_Span>
				</_Message>
			)}
			<_Footer>
				<DefaultButton onClick={closeModal}>OK</DefaultButton>
			</_Footer>
		</_Modal>
	);
};

export default AlertPopup;
