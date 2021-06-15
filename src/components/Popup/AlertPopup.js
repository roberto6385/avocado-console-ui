import React, {useCallback, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';

import {IconButton} from '../../styles/global';
import {
	alertFillIcon,
	cancelFillIcon,
	closeIconMedium,
} from '../../icons/icons';

import {
	ModalFooter,
	ModalHeader,
	ModalHeaderText,
	PopupModal,
	ModalText,
	PrimaryGreenButton,
	PrimaryRedButton,
	PrimaryGreyButton,
} from '../../styles/default';
import {borderColor, fontColor, modalColor} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	border-color: ${(props) => borderColor[props.themeValue]};
	background: ${(props) => modalColor[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
	width: 288px;
`;

const _ModalHeader = styled(ModalHeader)`
	border-color: ${(props) => borderColor[props.themeValue]};
`;

const _ModalFooter = styled(ModalFooter)`
	border-color: ${(props) => borderColor[props.themeValue]};
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
		<_PopupModal
			style={{overlay: {zIndex: 1000}}}
			isOpen={alert_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			themeValue={theme}
		>
			<_ModalHeader themeValue={theme}>
				<ModalHeaderText>{t('alert')}</ModalHeaderText>
				<IconButton onClick={closeModal}>{closeIconMedium}</IconButton>
			</_ModalHeader>

			<_Message>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<div>{cancelFillIcon}</div>
				) : (
					<div>{alertFillIcon}</div>
				)}

				<ModalText>{AlertMessage[alert_popup.key]}</ModalText>
			</_Message>

			<_ModalFooter themeValue={theme}>
				<PrimaryGreyButton themeValue={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ? (
					<PrimaryRedButton themeValue={theme} onClick={closeModal}>
						{t('ok')}
					</PrimaryRedButton>
				) : (
					<PrimaryGreenButton themeValue={theme} onClick={closeModal}>
						{t('ok')}
					</PrimaryGreenButton>
				)}
			</_ModalFooter>
		</_PopupModal>
	);
};

export default AlertPopup;
