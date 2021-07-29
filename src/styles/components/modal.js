//Modal styles
import styled from 'styled-components';
import Modal from 'react-modal';
import {borderColor, fontColor, modalColor} from '../color';

export const PopupModal = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	font-size: 14px;
	z-index: 10;
	background: ${(props) => modalColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
`;
export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 41px;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
	font-weight: 500;
`;
export const ModalMessage = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 24px 16px;
`;
export const ModalFooter = styled.div`
	display: flex;
	ailgn-items: center;
	justify-content: flex-end;
	height: 60px;
	padding: 13px 16px;
	border-top: 1px solid ${(props) => borderColor[props.theme_value]};
`;
export const AlertText = styled.div`
	width: 226px;
	margin-left: 8px;
`;
