import React, {useCallback} from 'react';
import {Card} from 'react-bootstrap';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../../styles/global';
import {CustomModal, ModalFooter} from '../../styles/common';
import {useDispatch, useSelector} from 'react-redux';
import {CLOSE_ALERT_POPUP} from '../../reducers/popup';
import {PopupButton} from "../../styles/buttons";

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

	console.log(alert_popup.key);

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
				<PopupButton onClick={handleClose} back={`${SUB_COLOR}`}>
					Ok
				</PopupButton>
			</ModalFooter>
		</CustomModal>
	);
};

export default AlertPopup;
