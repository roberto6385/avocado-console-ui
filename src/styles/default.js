import styled from 'styled-components';
import Modal from 'react-modal';
import {
	borderColor,
	buttonFontColor,
	contextHover,
	disabledButtonColor,
	disabledButtonFontColor,
	fontColor,
	greenActiveButtonColor,
	greenHoverButtonColor,
	greenNormalButtonColor,
	greyBackgroundActiveButtonColor,
	greyBackgroundHoverButtonColor,
	greyBackgroundNormalButtonColor,
	greyBoarderActiveButtonColor,
	greyBoarderHoverButtonColor,
	greyBoarderNormalButtonColor,
	greyButtonColor,
	modalColor,
	redActiveButtonColor,
	redHoverButtonColor,
	redNormalButtonColor,
	secondaryDisabledButtonColor,
	sshSearch,
} from './color';
import {Menu} from 'react-contexify';
import {FONT_14} from './length';

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
	border: 1px solid ${(props) => borderColor[props.themeValue]};
	font-size: 14px;
	z-index: 10;
	background: ${(props) => modalColor[props.themeValue]};
	color: ${(props) => fontColor[props.themeValue]};
`;

export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 41px;
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid ${(props) => borderColor[props.themeValue]};
	font-weight: 500;
`;

export const ModalHeaderIconButton = styled.button`
	color: ${(props) => fontColor[props.themeValue]};
	background: transparent;
	border: none;
	line-height: 0px;
	font-weight: 500;
	margin: 6px;
	font-size: 11.7px;
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
	border-top: 1px solid ${(props) => borderColor[props.themeValue]};
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
`;

//Button
export const DefaultButton = styled.button`
	height: 34px;
	width: 120px;
	padding: 7px 16px;
	font-size: 14px;
	border: none;
	border-radius: 4px;
	margin: 0px 8px;
`;

export const PrimaryGreenButton = styled(DefaultButton)`
	color: ${(props) =>
		buttonFontColor[props.themeValue] || buttonFontColor[0]};
	background: ${(props) =>
		greenNormalButtonColor[props.themeValue] || greenNormalButtonColor[0]};
	&:hover {
		background: ${(props) =>
			greenHoverButtonColor[props.themeValue] ||
			greenHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			greenActiveButtonColor[props.themeValue] ||
			greenActiveButtonColor[0]};
	}
`;

export const PrimaryRedButton = styled(DefaultButton)`
	color: ${(props) =>
		buttonFontColor[props.themeValue] || buttonFontColor[0]};
	background: ${(props) =>
		redNormalButtonColor[props.themeValue] || redNormalButtonColor[0]};
	&:hover {
		background: ${(props) =>
			redHoverButtonColor[props.themeValue] || redHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			redActiveButtonColor[props.themeValue] || redActiveButtonColor[0]};
	}
`;

export const PrimaryGreyButton = styled(DefaultButton)`
	color: ${(props) =>
		greyButtonColor[props.themeValue] || greyButtonColor[0]};
	background: ${(props) =>
		greyBackgroundNormalButtonColor[props.themeValue] ||
		greyBackgroundNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			greyBoarderNormalButtonColor[props.themeValue] ||
			greyBackgroundHoverButtonColor[0]};
	&:hover {
		background: ${(props) =>
			greyBackgroundHoverButtonColor[props.themeValue] ||
			greyBackgroundHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				greyBoarderHoverButtonColor[props.themeValue] ||
				greyBoarderHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			greyBackgroundActiveButtonColor[props.themeValue] ||
			greyBackgroundActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				greyBoarderActiveButtonColor[props.themeValue] ||
				greyBoarderActiveButtonColor[0]};
	}
`;

export const PrimaryDisabledButton = styled(DefaultButton)`
	color: ${(props) =>
		disabledButtonFontColor[props.themeValue] ||
		disabledButtonFontColor[0]};
	background: ${(props) =>
		disabledButtonColor[props.themeValue] || disabledButtonColor[0]};
`;

export const SecondaryGreenButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) =>
		greenNormalButtonColor[props.themeValue] || greenNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			greenNormalButtonColor[props.themeValue] ||
			greenNormalButtonColor[0]};
	&:hover {
		color: ${(props) =>
			greenHoverButtonColor[props.themeValue] ||
			greenHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				greenHoverButtonColor[props.themeValue] ||
				greenHoverButtonColor[0]};
	}
	&:active {
		color: ${(props) =>
			greenActiveButtonColor[props.themeValue] ||
			greenActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				greenActiveButtonColor[props.themeValue] ||
				greenActiveButtonColor[0]};
	}
`;

export const SecondaryRedButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) =>
		redNormalButtonColor[props.themeValue] || redNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			redNormalButtonColor[props.themeValue] || redNormalButtonColor[0]};
	&:hover {
		color: ${(props) =>
			redHoverButtonColor[props.themeValue] || redHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				redHoverButtonColor[props.themeValue] ||
				redHoverButtonColor[0]};
	}
	&:active {
		color: ${(props) =>
			redActiveButtonColor[props.themeValue] || redActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				redActiveButtonColor[props.themeValue] ||
				redActiveButtonColor[0]};
	}
`;

export const SecondaryDisabledButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		secondaryDisabledButtonColor[props.themeValue] ||
		secondaryDisabledButtonColor[0]};
`;

// context menu
export const ContextMenu_Avocado = styled(Menu)`
	font-size: ${FONT_14};
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
	}
`;
