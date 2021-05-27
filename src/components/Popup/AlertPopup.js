import React, {useCallback} from 'react';
import {IoCloseOutline, IoHelpCircle} from 'react-icons/all';

import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import Modal from 'react-modal';
import {IconContext} from 'react-icons';
import {
	AVOCADO_FONTSIZE,
	BorderButton,
	BORDER_COLOR,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PrimaryButton,
} from '../../styles/global';

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
	width: 290px;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: space-between;
	padding: 0px 16px;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _Text = styled.div`
	font-size: 14px;
	font-family: Roboto;
	width: 226px;
`;

const _HeaderText = styled(_Text)`
	font-weight: 500;
`;

const _Footer = styled.div`
	display: flex;
	ailgn-items: center;
	height: ${MAIN_HEIGHT};
	font-size: ${AVOCADO_FONTSIZE};
	justify-content: flex-end;
	padding: 13px 8px;
	border-top: 1px solid ${BORDER_COLOR};
`;

const _Message = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px 16px;
`;

const AlertMessage = {
	invalid_server: 'The server information is not valid',
	lost_server: 'The server information is damaged',
	snippets_name_duplicate: 'There is already a snippet with the same name',
	server_duplicate:
		'There is already a server with the same name or information',
	folder_name_duplicate: 'There is already a fodler with the same name',
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
				<_HeaderText>Alert</_HeaderText>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>
			<_Message>
				<IconContext.Provider
					value={{
						size: '33px',
						color: '#178082',
						style: {margin: '0px 4px 0px 0px', padding: '0px'},
					}}
				>
					<div>
						<IoHelpCircle />
					</div>
				</IconContext.Provider>
				<_Text>{AlertMessage[alert_popup.key]}</_Text>
			</_Message>
			<_Footer>
				<BorderButton onClick={closeModal}>Cancle</BorderButton>
				<PrimaryButton onClick={closeModal}>OK</PrimaryButton>
			</_Footer>
		</_Modal>
	);
};

export default AlertPopup;
