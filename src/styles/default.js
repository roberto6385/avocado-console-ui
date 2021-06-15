import styled from 'styled-components';
import Modal from 'react-modal';
import {FONT_14, HEIGHT_41, HEIGHT_60} from './length';
import {
	buttonFontColor,
	disabledButtonColor,
	disabledButtonFontColor,
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
	redActiveButtonColor,
	redHoverButtonColor,
	redNormalButtonColor,
	secondaryDisabledButtonColor,
} from './color';

export const PopupModal = styled(Modal)`
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

export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${HEIGHT_41};
	padding: 0px 10px 0px 16px;
	border-bottom: 1px solid;
`;

export const ModalHeaderText = styled.div`
	font-weight: 500;
`;

export const ModalText = styled.div`
	font-size: 14px;
	width: 226px;
`;

export const ModalFooter = styled.div`
	display: flex;
	ailgn-items: center;
	justify-content: flex-end;
	height: ${HEIGHT_60};
	padding: 13px 16px;
	border-top: 1px solid;
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
