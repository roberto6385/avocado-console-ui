import React, {useCallback, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import Modal from 'react-modal';
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
import {
	alertFillIcon,
	cancelFillIcon,
	closeIconMedium,
} from '../../icons/icons';

const _Modal = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
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
	const {current: AlertMessage} = useRef({
		invalid_server: t('invalidServer'),
		lost_server: t('lostServer'),
		snippets_name_duplicate: t('snippetsNameDuplicate'),
		snippets_blank: t('snippetsBlank'),
		server_duplicate: t('serverDuplicate'),
		folder_name_duplicate: t('folderNameDuplicate'),
		no_changes: t('noChange'),
		developing: t('developing'),
		wrong_path: t('wrongPath'),
	});

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, []);

	return (
		<_Modal
			style={{overlay: {zIndex: 1000}}}
			isOpen={alert_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
		>
			<_Header>
				<_HeaderText>{t('alert')}</_HeaderText>
				<IconButton onClick={closeModal}>{closeIconMedium}</IconButton>
			</_Header>

			<_Message>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<div>{cancelFillIcon}</div>
				) : (
					<div>{alertFillIcon}</div>
				)}

				<_Text>{AlertMessage[alert_popup.key]}</_Text>
			</_Message>

			<_Footer>
				<BorderButton onClick={closeModal}>{t('cancel')}</BorderButton>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<DangerButton onClick={closeModal}>{t('ok')}</DangerButton>
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
