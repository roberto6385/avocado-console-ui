import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';

import {
	PrimaryGreyButton,
	IconButton,
	PrimaryGreenButton,
	PrimaryRedButton,
	formColor,
} from '../../styles/global';
import {
	alertFillIcon,
	cancelFillIcon,
	closeIconMedium,
} from '../../icons/icons';

import {
	PopupFooter_,
	PopupHeader_,
	PopupHeaderText_,
	PopupModal_,
	PopupText_,
} from '../../styles/default';
import {borderColor, fontColor} from '../../styles/color';

const _Modal = styled(PopupModal_)`
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
	width: 288px;
`;

const _Header = styled(PopupHeader_)`
	border-color: ${(props) => props.bcolor};
`;

const _Footer = styled(PopupFooter_)`
	border-color: ${(props) => props.bcolor};
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
	const {theme} = useSelector((state) => state.common);
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
			back={formColor[theme]}
			bcolor={borderColor[theme]}
			color={fontColor[theme]}
		>
			<_Header bcolor={borderColor[theme]}>
				<PopupHeaderText_>{t('alert')}</PopupHeaderText_>
				<IconButton onClick={closeModal}>{closeIconMedium}</IconButton>
			</_Header>

			<_Message>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<div>{cancelFillIcon}</div>
				) : (
					<div>{alertFillIcon}</div>
				)}

				<PopupText_>{AlertMessage[alert_popup.key]}</PopupText_>
			</_Message>

			<_Footer bcolor={borderColor[theme]}>
				<PrimaryGreyButton theme={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<PrimaryRedButton theme={theme} onClick={closeModal}>
						{t('ok')}
					</PrimaryRedButton>
				) : (
					<PrimaryGreenButton theme={theme} onClick={closeModal}>
						{t('ok')}
					</PrimaryGreenButton>
				)}
			</_Footer>
		</_Modal>
	);
};

export default AlertPopup;
