import styled from 'styled-components';

export const Icon = styled.div`
	background: transparent;
	border: none;
	line-height: 0px;
	padding: 0px;
	margin-right: ${(props) => props?.margin_right || '16px'};
	margin: ${(props) => props?.margin};
	font-size: ${(props) =>
		props?.size
			? props.size === 'sm'
				? '20px'
				: props.size === 'xs'
				? '18px'
				: props.size === 'micro'
				? '16px'
				: props.size
			: '24px'};
	color: ${(props) =>
		props?.color ||
		(props?.itype === 'confirm'
			? props.theme.basic.pages.icons.dynamicIcons.normal.confirmStyle
					.font.color
			: props?.itype === 'warning'
			? props.theme.basic.pages.icons.dynamicIcons.normal.warningStyle
					.font.color
			: props?.itype === 'font'
			? props.theme.basic.pages.icons.dynamicIcons.normal.fontColorStyle
					.font.color
			: props?.itype === 'selected'
			? props.theme.basic.pages.icons.dynamicIcons.selected.font.color
			: props.theme.basic.pages.icons.dynamicIcons.normal.normalStyle.font
					.color)};
};

	span {
		//if icon is span, font-size does not apply
		font-size: ${(props) =>
			props?.size
				? props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
	}

	svg {
		fill: ${(props) =>
			props?.color ||
			(props?.itype === 'confirm'
				? props.theme.basic.pages.icons.dynamicIcons.normal.confirmStyle
						.font.color
				: props?.itype === 'warning'
				? props.theme.basic.pages.icons.dynamicIcons.normal.warningStyle
						.font.color
				: props?.itype === 'font'
				? props.theme.basic.pages.icons.dynamicIcons.normal
						.fontColorStyle.font.color
				: props?.itype === 'selected'
				? props.theme.basic.pages.icons.dynamicIcons.selected.font.color
				: props.theme.basic.pages.icons.dynamicIcons.normal.normalStyle
						.font.color)};
		width: ${(props) =>
			props?.size
				? props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
		height: ${(props) =>
			props?.size
				? props.size === 'sm'
					? '20px'
					: props.size === 'xs'
					? '18px'
					: props.size === 'micro'
					? '16px'
					: props.size
				: '24px'};
	}
`;

export const IconButton = styled(Icon)`
	cursor: pointer;
`;

export const HoverButton = styled(Icon)`
	cursor: pointer;
	&:hover {
		color: ${(props) =>
			props?.hover_color ||
			props.theme.basic.pages.icons.dynamicIcons.hover.font.color};
		svg {
			fill: ${(props) =>
				props?.hover_color ||
				props.theme.basic.pages.icons.dynamicIcons.hover.font.color};
		}
	}
`;
