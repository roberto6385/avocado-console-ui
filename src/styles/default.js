import styled from 'styled-components';
import Modal from 'react-modal';
import {FONT_14, HEIGHT_41, HEIGHT_60} from './length';

export const PopupModal_ = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.22);
	border-radius: 4px;
	border: 1px solid;
	font-size: ${FONT_14};
`;

export const PopupHeader_ = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${HEIGHT_41};
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
`;

export const PopupHeaderText_ = styled.div`
	font-weight: 500;
	font-size: 14px;
`;

export const PopupText_ = styled.div`
	font-size: 14px;
	width: 226px;
`;

export const PopupFooter_ = styled.div`
	display: flex;
	ailgn-items: center;
	justify-content: flex-end;
	height: ${HEIGHT_60};
	padding: 13px 16px;
	border-top: 1px solid;
`;
