import React from 'react';
import {Card, Modal} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../styles/global';
import {CustomModal, ModalFooter, PopupButton} from '../styles/common';

const AlertMessage = {
	invalid_server: '입력하신 서버의 정보가 잘못되었습니다.',
};

const AlertTopMessage = {
	invalid_server: 'Invalid Server',
};

const AlertPopup = ({keyword, open, setOpen}) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<CustomModal size='lg' show={open} onHide={handleClose}>
			<Modal.Header as='h5'>
				{Object.prototype.hasOwnProperty.call(
					AlertTopMessage,
					keyword,
				) && AlertTopMessage[keyword]}
				<span className={'right'} onClick={handleClose}>
					<FaTimes />
				</span>
			</Modal.Header>
			<Modal.Body>
				{Object.prototype.hasOwnProperty.call(
					AlertMessage,
					keyword,
				) && <p>{AlertMessage[keyword]}</p>}
			</Modal.Body>
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

AlertPopup.propTypes = {
	keyword: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default AlertPopup;
