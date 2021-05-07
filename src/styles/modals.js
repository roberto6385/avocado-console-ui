import styled from 'styled-components';
import {Modal} from 'react-bootstrap';

export const BaseModal = styled(Modal)`
	display: flex !important;
	align-items: center;
	justify-content: center;
	.modal-dialog {
		display: inline-block;
		margin: ${(props) => props?.margin || '0px'};
		.modal-content {
			width: ${(props) => props.width || '500px'} !important;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;
