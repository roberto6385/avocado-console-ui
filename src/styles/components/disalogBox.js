//Modal styles
import styled from 'styled-components';
import Modal from 'react-modal';

export const PopupModal = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	transform: translate(-50%, -50%);
	box-shadow: 0px 4px 20px 0px
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.boxShadow.color};
	border-radius: 4px;
	border: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
	font-size: 14px;
	z-index: 10;
	background: ${(props) =>
		props.theme.basic.pages.dialogBoxs.normalStyle.backgroundColor};
`;
export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 41px;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
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
	border-top: 1px solid
		${(props) =>
			props.theme.basic.pages.dialogBoxs.normalStyle.border.color};
`;
export const AlertText = styled.div`
	width: 226px;
	margin-left: 8px;
`;
