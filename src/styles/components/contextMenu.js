//Context menu styles
import styled from 'styled-components';
import {Menu} from 'react-contexify';
import {borderColor, contextHover, fontColor, sshSearch} from '../color';

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
