import React, {useCallback, useState} from 'react';
import {Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import {PrevIconButton, PopupButton} from '../../styles/buttons';
import {FlexBox} from '../../styles/divs';
import {BaseModal} from '../../styles/modals';
import {MainHeader} from '../../styles/cards';
import {BaseSpan} from '../../styles/texts';

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
	const handleClose = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, []);

	return (
		<BaseModal show={alert_popup.open} onHide={handleClose}>
			<MainHeader justify={'space-between'}>
				<BaseSpan padding={'0px 8px'}>
					{Object.prototype.hasOwnProperty.call(
						AlertHeader,
						alert_popup.key,
					) && AlertHeader[alert_popup.key]}
				</BaseSpan>
				<PrevIconButton className={'right'}>
					<FaTimes onClick={handleClose} />
				</PrevIconButton>
			</MainHeader>
			<Card.Body>
				{Object.prototype.hasOwnProperty.call(
					AlertMessage,
					alert_popup.key,
				) && <Card.Text>{AlertMessage[alert_popup.key]}</Card.Text>}
			</Card.Body>
			<FlexBox padding={'4px 12px'} justify={'flex-end'}>
				<PopupButton onClick={handleClose} back={`${SUB_COLOR}`}>
					Ok
				</PopupButton>
			</FlexBox>
		</BaseModal>
	);
};

export default AlertPopup;
