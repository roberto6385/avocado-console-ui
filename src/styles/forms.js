import styled from 'styled-components';
import {Form} from 'react-bootstrap';
import {MAIN_COLOR, SMALL_FONT} from './global';

export const BaseForm = styled(Form)`
	border: 1px solid ${MAIN_COLOR};
	display: flex;
	padding: 4px;
	z-index: ${(props) => props?.zIndex || 1};
`;

export const BaseInput = styled(Form.Control)`
	flex: ${(props) => props?.flex};
	font-size: ${(props) => props.fontSize || SMALL_FONT};
	border: none;
	outline: none;
`;

export const TerminalSearchForm = styled(BaseForm)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 200px;
	display: none;
	// xterm.js 의 canvas가 z-index:3을 갖고 있어서 5를 넣어줌.
	z-index: 5;
`;
