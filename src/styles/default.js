import styled from 'styled-components';
import Modal from 'react-modal';
import {
	borderColor,
	contextHover,
	fontColor,
	inputFocusBoaderColor,
	L_GREEN_NORMAL,
	mainBackColor,
	modalColor,
	navHighColor,
	settingInput,
	sshSearch,
} from './color';
import {Menu} from 'react-contexify';
import {PrimaryGreenButton} from './button';

//Modal => popup, form
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

//Modal => popup
export const PopupText = styled.div`
	width: 226px;
	margin-left: 8px;
`;

//Form
export const Form = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 16px 16px 14px 16px;
`;

export const Input = styled.input`
	width: 100%;
	height: 34px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => settingInput[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	&:focus {
		border-color: ${(props) => inputFocusBoaderColor[props.theme_value]};
	}
`;

//Setting Page
export const SettingMainContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) => mainBackColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	overflow: scroll;
	padding: 0px 16px;
`;

export const SettingTitle = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
	line-height: 1.31;
	font-size: 16px;
`;

export const SettingContentsContainer = styled.div`
	padding: 16px 0px;
`;

//Login, Signin, Change Password
export const UserForm = styled.form`
	background: white;
	width: 500px;
	height: 614px;
	padding: 70px;
	border-radius: 16px;
	caret-color: black;
	display: flex;
	flex-direction: column;
	.focus {
		border-color: ${inputFocusBoaderColor[0]};
		outline: 0 none;
	}
`;

export const UserTitle = styled.div`
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 20px;
`;

export const UserTitleSpan = styled.div`
	font-size: 14px;
	margin-bottom: 52px;
	a {
		color: ${L_GREEN_NORMAL};
		text-decoration: underline;
	}
`;

export const UserInput = styled.input`
	flex: 1;
	height: 40px;
	font-size: 14px;
	padding: 12px 10px;
	border-radius: 4px;
	border: 1px solid ${borderColor[0]};
	&:focus {
		border-color: ${inputFocusBoaderColor[0]};
		outline: 0 none;
	}
`;

export const UserSubmitButton = styled(PrimaryGreenButton)`
	width: 360px;
	height: 40px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: 0.15px;
`;

export const UserPasswordInput = styled(UserInput)`
	padding: 0px;
	height: auto;
	border: none;
`;

export const UserPasswordContainer = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	padding: 12px 10px;
	border-radius: 4px;
	border: 1px solid ${borderColor[0]};
`;

//Server Folder Nav
export const NewServerFolderForm = styled.form`
	display: flex;
	padding: 4px 0px;
	border: none;
`;

export const NewServerFolderInput = styled.input`
	background: ${(props) => navHighColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	margin: 0;
	border: none;
	outline: none;
`;

export const FolderServerTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	color: ${(props) => fontColor[props.theme_value]};
`;
// context menu
export const ContextMenu = styled(Menu)`
	z-index: 5px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	background: ${(props) => sshSearch[props.theme_value]};
	.react-contexify__item:not(.react-contexify__item--disabled):hover
		> .react-contexify__item__content,
	.react-contexify__item:not(.react-contexify__item--disabled):focus
		> .react-contexify__item__content {
		background: ${(props) => contextHover[props.theme_value]};
		color: ${(props) => fontColor[props?.theme_value]};
	}
	.react-contexify__separator {
		background: ${(props) => borderColor[props.theme_value]};
	}
	.react-contexify__item__content {
		color: ${(props) => fontColor[props?.theme_value]};
		text-align: left;
	}
`;

export const DropDownMenu = styled(ContextMenu)`
	font-size: 12px;
	min-width: 120px;

	.react-contexify__separator {
		margin: 1px;
	}
	.react-contexify__item__content {
		display: flex;
	}
`;
