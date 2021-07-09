import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {CLOSE_REFRESH_POPUP} from '../../reducers/popup';
import styled from 'styled-components';
import {alertFillIcon, closeIcon} from '../../icons/icons';
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
} from '../../styles/button';
import {fontColor} from '../../styles/color';
import base64 from 'base-64';
import {REFRESH_USER_TICKET_REQUEST} from "../../reducers/auth/userTicket";

const _PopupModal = styled(PopupModal)`
	width: 288px;
`;

const RefreshPopup = () => {
	const {t} = useTranslation('alertPopup');
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.common.theme);
	const {userTicket} = useSelector((state) => state.userTicket);
	const refresh_popup = useSelector((state) => state.popup.refresh_popup);

	const closeModal = useCallback(() => {
		dispatch({type: CLOSE_REFRESH_POPUP});
	}, []);

	const refreshLogin = useCallback(() => {
		const encodeData = base64.encode(`${'web'}:${'123456789'}`);
		dispatch({
			type: REFRESH_USER_TICKET_REQUEST,
			params: {
				refresh_token: userTicket.refresh_token,
				Authorization: 'Basic ' + encodeData,
			},
		});
	}, [userTicket]);

	return (
		<_PopupModal
			style={{overlay: {zIndex: 1000}}}
			isOpen={refresh_popup.open}
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
					onClick={closeModal}
				>
					{closeIcon}
				</ClickableIconButton>
			</ModalHeader>

			<ModalMessage>
				<IconBox margin_right='6px' color={'#178082'}>
					{alertFillIcon}
				</IconBox>

				<PopupText>로그인을 연장하시겠습니까?</PopupText>
			</ModalMessage>

			<ModalFooter theme_value={theme}>
				<PrimaryGreyButton theme_value={theme} onClick={closeModal}>
					{t('cancel')}
				</PrimaryGreyButton>
				<PrimaryGreenButton theme_value={theme} onClick={refreshLogin}>
					{t('ok')}
				</PrimaryGreenButton>
			</ModalFooter>
		</_PopupModal>
	);
};

export default RefreshPopup;
