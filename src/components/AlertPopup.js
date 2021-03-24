import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../styles/global';
import {CustomModal, ModalFooter, PopupButton} from '../styles/common';

const AlertPopup = ({keyword, open, setOpen}) => {
	const handleClose = () => {
		setOpen(false);
	};

	const okFunction = () => {
		handleClose();
	};

	return (
		<CustomModal size='lg' show={open} onHide={handleClose}>
			<Card.Header as='h5'>
				{keyword}
				<span style={{float: 'right'}} onClick={handleClose}>
					<FaTimes />
				</span>
			</Card.Header>
			<Card.Body>
				{keyword === 'Invalid Server' && (
					<p>입력하신 서버의 정보가 잘못되었습니다.</p>
				)}
			</Card.Body>
			<ModalFooter>
				<PopupButton
					variant='default'
					onClick={okFunction}
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
