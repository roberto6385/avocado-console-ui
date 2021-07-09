import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import {alertFillIcon, cancelFillIcon, closeIcon} from '../../icons/icons';
import {
	ModalFooter,
	ModalHeader,
	PopupModal,
	ModalMessage,
	PopupText,
} from '../../styles/default';
import {
	ClickableIconButton,
	IconBox,
	PrimaryGreenButton,
	PrimaryGreyButton,
	PrimaryRedButton,
} from '../../styles/button';
import {fontColor} from '../../styles/color';

const _PopupModal = styled(PopupModal)`
	width: 288px;
`;

const AlertPopup = () => {
	const {t} = useTranslation('alertPopup');
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.common.theme);
	const alert_popup = useSelector((state) => state.popup.alert_popup);
	const AlertMessage = {
		invalid_server: t('invalidServer'),
		lost_server: t('lostServer'),
		snippets_name_duplicate: t('snippetsNameDuplicate'),
		snippets_blank: t('snippetsBlank'),
		server_duplicate: t('serverDuplicate'),
		folder_name_duplicate: t('folderNameDuplicate'),
		no_changes: t('noChange'),
		developing: t('developing'),
		wrong_path: t('wrongPath'),
	};

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, [dispatch]);

	return (
		<_PopupModal
			style={{overlay: {zIndex: 1000}}}
			isOpen={alert_popup.open}
			onRequestClose={closeModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('alert')}</div>
				<ClickableIconButton
					color={fontColor[theme]}
					size={'sm'}
					margin={'0px'}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<ModalMessage>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ||
				alert_popup.key === 'invalid_server' ? (
					<IconBox margin_right='6px' color={'#D55959'}>
						{cancelFillIcon}
					</IconBox>
				) : (
					<IconBox margin_right='6px' color={'#178082'}>
						{alertFillIcon}
					</IconBox>
				)}

				<PopupText>{AlertMessage[alert_popup.key]}</PopupText>
			</ModalMessage>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ||
				alert_popup.key === 'invalid_server' ? (
					<PrimaryRedButton theme_value={theme} onClick={closeModal}>
						{t('ok')}
					</PrimaryRedButton>
				) : (
					<PrimaryGreenButton
						theme_value={theme}
						onClick={closeModal}
					>
						{t('ok')}
					</PrimaryGreenButton>
				)}
			</ModalFooter>
		</_PopupModal>
	);
};

export default AlertPopup;
