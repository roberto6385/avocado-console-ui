import styled from 'styled-components';
import {fontColor, iconColor, iconHoverColor} from './color';

export const IconBox = styled.div`
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
	color: ${(props) => props?.color || iconColor[props.theme_value]};

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
		fill: ${(props) => props?.color || iconColor[props.theme_value]};
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

export const DefaultIconButton = styled.button`
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
	color: ${(props) => props?.color || fontColor[props.theme_value]};

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
		fill: ${(props) => props?.color || fontColor[props.theme_value]};
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

export const IconButton = styled(DefaultIconButton)`
	color: ${(props) => props?.color || iconColor[props.theme_value]};

	svg {
		fill: ${(props) => props?.color || iconColor[props.theme_value]};
	}

	&:hover {
		// hover color on svg icon does not work => use opacity
		color: ${(props) =>
			props?.hover_color || iconHoverColor[props.theme_value]};
		svg {
			fill: ${(props) =>
				props?.hover_color || iconHoverColor[props.theme_value]};
		}
	}
`;
