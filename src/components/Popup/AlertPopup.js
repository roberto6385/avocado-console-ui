import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import {alertFillIcon, cancelFillIcon, closeIcon} from '../../icons/icons';
import {
	PrimaryGreenButton,
	PrimaryGreyButton,
	PrimaryRedButton,
} from '../../styles/components/button';
import {Icon, IconButton} from '../../styles/components/icon';
import {
	AlertText,
	ModalFooter,
	ModalHeader,
	ModalMessage,
	PopupModal,
} from '../../styles/components/disalogBox';

const _PopupModal = styled(PopupModal)`
	width: 288px;
`;

const AlertPopup = () => {
	const {t} = useTranslation('alertPopup');
	const dispatch = useDispatch();

	const {theme} = useSelector((state) => state.common, shallowEqual);
	const {alert_popup} = useSelector((state) => state.popup, shallowEqual);

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

	const onClickCloseModal = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, []);

	return (
		<_PopupModal
			isOpen={alert_popup.open}
			onRequestClose={onClickCloseModal}
			ariaHideApp={false}
			shouldCloseOnOverlayClick={false}
			theme_value={theme}
		>
			<ModalHeader theme_value={theme}>
				<div>{t('alert')}</div>
				<IconButton
					theme_value={theme}
					size={'sm'}
					margin={'0px'}
					onClick={onClickCloseModal}
				>
					{closeIcon}
				</IconButton>
			</ModalHeader>

			<ModalMessage>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ||
				alert_popup.key === 'invalid_server' ? (
					<Icon margin_right='6px' color={'#D55959'}>
						{cancelFillIcon}
					</Icon>
				) : (
					<Icon margin_right='6px' color={'#178082'}>
						{alertFillIcon}
					</Icon>
				)}

				<AlertText>{AlertMessage[alert_popup.key]}</AlertText>
			</ModalMessage>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton
					theme_value={theme}
					onClick={onClickCloseModal}
				>
					{t('cancel')}
				</PrimaryGreyButton>
				{alert_popup.key === 'developing' ||
				alert_popup.key === 'wrong_path' ||
				alert_popup.key === 'invalid_server' ? (
					<PrimaryRedButton
						theme_value={theme}
						onClick={onClickCloseModal}
					>
						{t('ok')}
					</PrimaryRedButton>
				) : (
					<PrimaryGreenButton
						theme_value={theme}
						onClick={onClickCloseModal}
					>
						{t('ok')}
					</PrimaryGreenButton>
				)}
			</ModalFooter>
		</_PopupModal>
	);
};

export default AlertPopup;
