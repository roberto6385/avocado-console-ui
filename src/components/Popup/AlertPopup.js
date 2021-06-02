import React, {useCallback} from 'react';
import {
	BsFillExclamationCircleFill,
	BsFillQuestionCircleFill,
	IoCloseOutline,
} from 'react-icons/all';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import Modal from 'react-modal';
import {IconContext} from 'react-icons';
import {
	AVOCADO_FONTSIZE,
	BorderButton,
	LIGHT_MODE_BORDER_COLOR,
	FOLDER_HEIGHT,
	IconButton,
	MAIN_HEIGHT,
	PrimaryButton,
	DangerButton,
} from '../../styles/global';

const _Modal = styled(Modal)`
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	position: absolute;
	z-index: 10;
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
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};
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
	border-top: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _Message = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px 16px;
`;

const AlertPopup = () => {
	const {t} = useTranslation('alertPopup');
	const dispatch = useDispatch();
	const {alert_popup} = useSelector((state) => state.popup);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, [dispatch]);

	const AlertMessage = {
		invalid_server: t('invalidServer'),
		lost_server: t('lostServer'),
		snippets_name_duplicate: t('snippetsNameDuplicate'),
		server_duplicate: t('serverDuplicate'),
		folder_name_duplicate: t('folderNameDuplicate'),
		no_changes: t('noChange'),
	};

	return (
		<_Modal
			isOpen={alert_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_HeaderText>{t('alert')}</_HeaderText>
				<IconButton onClick={closeModal}>
					<IoCloseOutline />
				</IconButton>
			</_Header>

			<_Message>
				{alert_popup.key === 'developing' ? (
					<IconContext.Provider
						value={{
							size: '20px',
							color: '#d45959',
						}}
					>
						<div>
							<BsFillExclamationCircleFill />
						</div>
					</IconContext.Provider>
				) : (
					<IconContext.Provider
						value={{
							size: '20px',
							color: '#178082',
						}}
					>
						<div>
							<BsFillQuestionCircleFill />
						</div>
					</IconContext.Provider>
				)}

				<_Text>{AlertMessage[alert_popup.key]}</_Text>
			</_Message>

			<_Footer>
				<BorderButton onClick={closeModal}>Cancle</BorderButton>
				{alert_popup.key === 'developing' ? (
					<DangerButton onClick={closeModal}>
						{t('cancle')}
					</DangerButton>
				) : (
					<PrimaryButton onClick={closeModal}>
						{t('ok')}
					</PrimaryButton>
				)}
			</_Footer>
		</_Modal>
	);
};

export default AlertPopup;
