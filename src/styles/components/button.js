//Button styles
import styled from 'styled-components';

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
		props.theme.basic.pages.buttons.normalStyle.normalStyle.font.color};
	background: ${(props) =>
		props.theme.basic.pages.buttons.normalStyle.normalStyle
			.backgroundColor};
	&:hover {
		background: ${(props) =>
			props.theme.basic.pages.buttons.normalStyle.normalStyle.hover
				.backgroundColor};
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
		props.theme.basic.pages.buttons.normalStyle.transparentStyle.font
			.color};
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
		props.theme.basic.pages.buttons.borderStyle.warningStyle.font.color};
	border: solid 1px
		${(props) =>
			props.theme.basic.pages.buttons.borderStyle.warningStyle.border
				.color};
	&:hover {
		color: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.warningStyle.hover.font
				.color};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.borderStyle.warningStyle.hover
					.backgroundColor};
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.warningStyle.hover
				.border.color};
	}
	&:active {
		color: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.warningStyle.active.font
				.color};
		border: solid 1px
			${(props) =>
				props.theme.basic.pages.buttons.borderStyle.warningStyle.active
					.backgroundColor};
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.warningStyle.active
				.border.color};
	}
`;

export const TransparentBorderButton = styled(DefaultButton)`
	background: transparent;
	color: ${(props) =>
		props.theme.basic.pages.buttons.borderStyle.transparentStyle.font
			.color};
	&:hover {
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.transparentStyle.hover
				.backgroundColor};
	}
	&:active {
		background: ${(props) =>
			props.theme.basic.pages.buttons.borderStyle.transparentStyle.hover
				.backgroundColor};
	}
`;
