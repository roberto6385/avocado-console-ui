import React, {useCallback} from 'react';
import {Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../../styles/global';
import {CustomModal, ModalFooter, PopupButton} from '../../styles/common';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_ALERT_POPUP} from '../../reducers/popup';

const AlertMessage = {
	invalid_server: '입력하신 서버의 정보가 잘못되었습니다.',
	lost_server: '해당 서버의 정보가 손상되거나 삭제되었습니다.',
	current_path: '현재 경로의 폴더 이름은 변경할 수 없습니다.',
};

const AlertHeader = {
	invalid_server: 'Invalid Server',
	lost_server: 'Lost Server Data',
	current_path: 'Not Allow to Chnage Folder Name',
};

const AlertPopup = () => {
	const dispatch = useDispatch();
	const {alert_popup} = useSelector((state) => state.popup);

	const handleClose = useCallback(() => {
		dispatch({type: CLOSE_ALERT_POPUP});
	}, []);

	return (
		<CustomModal size='lg' show={alert_popup.open} onHide={handleClose}>
			<Card.Header as='h5'>
				{Object.prototype.hasOwnProperty.call(
					AlertHeader,
					alert_popup.key,
				) && AlertHeader[alert_popup.key]}
				<span className={'right'} onClick={handleClose}>
					<FaTimes />
				</span>
			</Card.Header>
			<Card.Body>
				{Object.prototype.hasOwnProperty.call(
					AlertMessage,
					alert_popup.key,
				) && <Card.Text>{AlertMessage[alert_popup.key]}</Card.Text>}
			</Card.Body>
			<ModalFooter>
				<PopupButton
					variant='default'
					onClick={handleClose}
					back={`${SUB_COLOR}`}
				>
					Cancel
				</PopupButton>
			</ModalFooter>
		</CustomModal>
	);
};

export default AlertPopup;
