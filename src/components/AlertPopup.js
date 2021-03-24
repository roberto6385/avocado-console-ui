import React from 'react';
import styled from 'styled-components';
import {Button, Card, Modal} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {FaTimes} from 'react-icons/all';

import {SUB_COLOR} from '../styles/global';

const ModalFooter = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 4px 12px;
	margin: 10px;
`;

const CustomModal = styled(Modal)`
    .modal-dialog{
        height:100%;
        margin:auto;
        display:flex;
        align-items:center;
        justify-contents:center;
        
        .modal-content{
            margin:auto;
            width:450px;
            height:200px;
            flex-direction:column;
            }
        }
    }
`;

const PopupButton = styled(Button)`
	width: 100px;
	margin: 10px;
	background-color: ${(props) => props.back};
	border: none;
	color: white;
	&:hover {
		filter: brightness(85%);
		color: white;
	}
`;

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
