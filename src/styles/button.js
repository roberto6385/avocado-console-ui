//Button
import styled from 'styled-components';
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
		buttonFontColor[props.theme_value] || buttonFontColor[0]};
	background: ${(props) =>
		greenNormalButtonColor[props.theme_value] || greenNormalButtonColor[0]};
	&:hover {
		background: ${(props) =>
			greenHoverButtonColor[props.theme_value] ||
			greenHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			greenActiveButtonColor[props.theme_value] ||
			greenActiveButtonColor[0]};
	}
`;

export const PrimaryRedButton = styled(DefaultButton)`
	color: ${(props) =>
		buttonFontColor[props.theme_value] || buttonFontColor[0]};
	background: ${(props) =>
		redNormalButtonColor[props.theme_value] || redNormalButtonColor[0]};
	&:hover {
		background: ${(props) =>
			redHoverButtonColor[props.theme_value] || redHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			redActiveButtonColor[props.theme_value] || redActiveButtonColor[0]};
	}
`;

export const PrimaryGreyButton = styled(DefaultButton)`
	color: ${(props) =>
		greyButtonColor[props.theme_value] || greyButtonColor[0]};
	background: ${(props) =>
		greyBackgroundNormalButtonColor[props.theme_value] ||
		greyBackgroundNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			greyBoarderNormalButtonColor[props.theme_value] ||
			greyBackgroundHoverButtonColor[0]};
	&:hover {
		background: ${(props) =>
			greyBackgroundHoverButtonColor[props.theme_value] ||
			greyBackgroundHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				greyBoarderHoverButtonColor[props.theme_value] ||
				greyBoarderHoverButtonColor[0]};
	}
	&:active {
		background: ${(props) =>
			greyBackgroundActiveButtonColor[props.theme_value] ||
			greyBackgroundActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				greyBoarderActiveButtonColor[props.theme_value] ||
				greyBoarderActiveButtonColor[0]};
	}
`;

export const PrimaryDisabledButton = styled(DefaultButton)`
	color: ${(props) =>
		disabledButtonFontColor[props.theme_value] ||
		disabledButtonFontColor[0]};
	background: ${(props) =>
		disabledButtonColor[props.theme_value] || disabledButtonColor[0]};
`;

export const SecondaryGreenButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) =>
		greenNormalButtonColor[props.theme_value] || greenNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			greenNormalButtonColor[props.theme_value] ||
			greenNormalButtonColor[0]};
	&:hover {
		color: ${(props) =>
			greenHoverButtonColor[props.theme_value] ||
			greenHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				greenHoverButtonColor[props.theme_value] ||
				greenHoverButtonColor[0]};
	}
	&:active {
		color: ${(props) =>
			greenActiveButtonColor[props.theme_value] ||
			greenActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				greenActiveButtonColor[props.theme_value] ||
				greenActiveButtonColor[0]};
	}
`;

export const SecondaryRedButton = styled(PrimaryGreyButton)`
	background: transparent;
	color: ${(props) =>
		redNormalButtonColor[props.theme_value] || redNormalButtonColor[0]};
	border: solid 1px
		${(props) =>
			redNormalButtonColor[props.theme_value] || redNormalButtonColor[0]};
	&:hover {
		color: ${(props) =>
			redHoverButtonColor[props.theme_value] || redHoverButtonColor[0]};
		border: solid 1px
			${(props) =>
				redHoverButtonColor[props.theme_value] ||
				redHoverButtonColor[0]};
	}
	&:active {
		color: ${(props) =>
			redActiveButtonColor[props.theme_value] || redActiveButtonColor[0]};
		border: solid 1px
			${(props) =>
				redActiveButtonColor[props.theme_value] ||
				redActiveButtonColor[0]};
	}
`;

export const SecondaryDisabledButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		secondaryDisabledButtonColor[props.theme_value] ||
		secondaryDisabledButtonColor[0]};
`;