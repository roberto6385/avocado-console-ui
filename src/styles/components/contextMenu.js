//Context menu styles
import styled from 'styled-components';
import {Menu} from 'react-contexify';
import {borderColor, contextHover, fontColor, sshSearch} from '../color';

export const ContextMenu = styled(Menu)`
	z-index: 5px;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.19);
	background: ${(props) =>
		props.theme.basic.pages.contextMenus.normalStyle.backgroundColor};
	.react-contexify__item:not(.react-contexify__item--disabled):hover
		> .react-contexify__item__content,
	.react-contexify__item:not(.react-contexify__item--disabled):focus
		> .react-contexify__item__content {
		background: ${(props) =>
			props.theme.basic.pages.contextMenus.normalStyle.selected
				.backgroundColor};
		color: ${(props) =>
			props.theme.basic.pages.contextMenus.normalStyle.font.color};
	}
	.react-contexify__separator {
		background: ${(props) =>
			props.theme.basic.pages.contextMenus.normalStyle.border.color};
	}
	.react-contexify__item__content {
		color: ${(props) =>
			props.theme.basic.pages.contextMenus.normalStyle.font.color};
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
