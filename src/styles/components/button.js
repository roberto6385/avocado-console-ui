//Button styles
import styled from 'styled-components';
import {
	transparnetBorderButtonFontColor,
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
		props.theme.basic.pages.buttons.normalStyle.normalStyle.font.color}
	background: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.normalStyle
			.backgroundColor};
	&:hover {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.normalStyle.hover
				.backgroundColor}
	&:active {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.normalStyle.active
				.backgroundColor};
	}
`;

export const WarningButton = styled(DefaultButton)`
	color: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.warningStyle.font.color};
	background: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.warningStyle
			.backgroundColor};
	&:hover {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.warningStyle.hover
				.backgroundColor};
	}
	&:active {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.warningStyle.active
				.backgroundColor};
	}
`;

export const TransparentButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.transparentStyle
			.backgroundColor};
	border: solid 1px
		${(props) =>
			props.theme.basic.pages.buttons.normalStyle.transparentStyle.border
				.color};
	&:hover {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.transparentStyle.hover
				.backgroundColor};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.normalStyle.transparentStyle
					.hover.border.color};
	}
	&:active {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.transparentStyle.active
				.backgroundColor};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.normalStyle.transparentStyle
					.active.border.color};
	}
`;

export const DisabledButton = styled(DefaultButton)`
	color: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.disabledStyle.font.color};
	background: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.disabledStyle
			.backgroundColor};
`;

export const NormalBorderButton = styled(TransparentButton)`
	background: transparent;
	color: ${(props) =>
		props.theme.basic.pages.buttons.borderStyle.normalStyle.font.color};
	border: solid 1px
		${(props) =>
			props.theme.basic.pages.buttons.borderStyle.normalStyle.border
				.color};
	&:hover {
		color: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.normalStyle.hover.font
				.color};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.borderStyle.normalStyle.hover
					.backgroundColor};
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.normalStyle.hover.border
				.color};
	}
	&:active {
		color: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.normalStyle.active.font
				.color};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.borderStyle.normalStyle.active
					.backgroundColor};
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.normalStyle.active
				.border.color};
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
