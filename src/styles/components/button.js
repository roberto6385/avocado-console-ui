//Button styles
import styled from 'styled-components';
import {
	buttonFontColor,
	disabledButtonColor,
	disabledButtonFontColor,
	normalButtonActiveColor,
	normalButtonHoverColor,
	normalButtonColor,
	transparentButtonColor,
	transparentButtonHoverBackgroundColor,
	transparentButtonBoarderColor,
	warningButtonActiveColor,
	warningButtonHoverColor,
	warningButtonColor,
	transparnetBorderButtonFontColor,
	transparentButtonActiveBorderColor,
	normalBorderButtonHoverColor,
	normalBorderButtonActiveColor,
	warningBorderButtonFontColor,
	warningBorderButtonHoverFontColor,
	warningBorderButtonActiveFontColor,
	warningBorderButtonHoverColor,
	warningBorderButtonActiveColor,
	transparnetBorderButtonHoverColor,
} from '../color';

export const DefaultButton = styled.button`
	height: 34px;
	width: 120px;
	padding: 7px 16px;
	font-size: 14px;
	border: none;
	border-radius: 4px;
	margin: 0px 8px;
`;

export const NormalButton = styled(DefaultButton)`
	color: ${(props) =>
		buttonFontColor[props.theme_value] || buttonFontColor[0]};
	background: ${(props) =>
		normalButtonColor[props.theme_value] || normalButtonColor[0]};
	&:hover {
		background: ${(props) =>
			normalButtonHoverColor[props.theme_value] ||
			normalButtonHoverColor[0]};
	}
	&:active {
		background: ${(props) =>
			normalButtonActiveColor[props.theme_value] ||
			normalButtonActiveColor[0]};
	}
`;

export const WarningButton = styled(DefaultButton)`
	color: ${(props) =>
		buttonFontColor[props.theme_value] || buttonFontColor[0]};
	background: ${(props) =>
		warningButtonColor[props.theme_value] || warningButtonColor[0]};
	&:hover {
		background: ${(props) =>
			warningButtonHoverColor[props.theme_value] ||
			warningButtonHoverColor[0]};
	}
	&:active {
		background: ${(props) =>
			warningButtonActiveColor[props.theme_value] ||
			warningButtonActiveColor[0]};
	}
`;

export const TransparentButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		transparentButtonColor[props.theme_value] || transparentButtonColor[0]};
	border: solid 1px
		${(props) =>
			transparentButtonBoarderColor[props.theme_value] ||
			transparentButtonBoarderColor[0]};
	&:hover {
		background: ${(props) =>
			transparentButtonHoverBackgroundColor[props.theme_value] ||
			transparentButtonHoverBackgroundColor[0]};
		border: solid 1px
			${(props) =>
				transparentButtonBoarderColor[props.theme_value] ||
				transparentButtonBoarderColor[0]};
	}
	&:active {
		background: ${(props) =>
			transparentButtonHoverBackgroundColor[props.theme_value] ||
			transparentButtonHoverBackgroundColor[0]};
		border: solid 1px
			${(props) =>
				transparentButtonActiveBorderColor[props.theme_value] ||
				transparentButtonActiveBorderColor[0]};
	}
`;

export const DisabledButton = styled(DefaultButton)`
	color: ${(props) =>
		disabledButtonFontColor[props.theme_value] ||
		disabledButtonFontColor[0]};
	background: ${(props) =>
		disabledButtonColor[props.theme_value] || disabledButtonColor[0]};
`;

export const NormalBorderButton = styled(TransparentButton)`
	background: transparent;
	color: ${(props) =>
		normalButtonColor[props.theme_value] || normalButtonColor[0]};
	border: solid 1px
		${(props) =>
			normalButtonColor[props.theme_value] || normalButtonColor[0]};
	&:hover {
		color: ${(props) =>
			normalButtonHoverColor[props.theme_value] ||
			normalButtonHoverColor[0]};
		border: solid 1px
			${(props) =>
				normalButtonHoverColor[props.theme_value] ||
				normalButtonHoverColor[0]};
		background: ${(props) =>
			normalBorderButtonHoverColor[props.theme_value] ||
			normalBorderButtonHoverColor[0]};
	}
	&:active {
		color: ${(props) =>
			normalButtonActiveColor[props.theme_value] ||
			normalButtonActiveColor[0]};
		border: solid 1px
			${(props) =>
				normalButtonActiveColor[props.theme_value] ||
				normalButtonActiveColor[0]};
		background: ${(props) =>
			normalBorderButtonActiveColor[props.theme_value] ||
			normalBorderButtonActiveColor[0]};
	}
`;

export const WarningBorderButton = styled(TransparentButton)`
	background: transparent;
	color: ${(props) =>
		warningBorderButtonFontColor[props.theme_value] ||
		warningBorderButtonFontColor[0]};
	border: solid 1px
		${(props) =>
			warningBorderButtonFontColor[props.theme_value] ||
			warningBorderButtonFontColor[0]};
	&:hover {
		color: ${(props) =>
			warningBorderButtonHoverFontColor[props.theme_value] ||
			warningBorderButtonHoverFontColor[0]};
		border: solid 1px
			${(props) =>
				warningBorderButtonHoverFontColor[props.theme_value] ||
				warningBorderButtonHoverFontColor[0]};
		background: ${(props) =>
			warningBorderButtonHoverColor[props.theme_value] ||
			warningBorderButtonHoverColor[0]};
	}
	&:active {
		color: ${(props) =>
			warningBorderButtonActiveFontColor[props.theme_value] ||
			warningBorderButtonActiveFontColor[0]};
		border: solid 1px
			${(props) =>
				warningBorderButtonActiveFontColor[props.theme_value] ||
				warningBorderButtonActiveFontColor[0]};
		background: ${(props) =>
			warningBorderButtonActiveColor[props.theme_value] ||
			warningBorderButtonActiveColor[0]};
	}
`;

export const TransparentBorderButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		transparnetBorderButtonFontColor[props.theme_value] ||
		transparnetBorderButtonFontColor[0]};
	&:hover {
		background: ${(props) =>
			transparnetBorderButtonHoverColor[props.theme_value] ||
			transparnetBorderButtonHoverColor[0]};
	}
	&:active {
		background: ${(props) =>
			transparnetBorderButtonHoverColor[props.theme_value] ||
			transparnetBorderButtonHoverColor[0]};
	}
`;
