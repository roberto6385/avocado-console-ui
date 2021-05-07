import styled from 'styled-components';
import {Form} from 'react-bootstrap';
import {MAIN_COLOR, SMALL_FONT} from './global';

export const BaseForm = styled(Form)`
	border: 1px solid ${MAIN_COLOR};
	display: flex;
	padding: 2px;
`;

export const BaseInput = styled(Form.Control)`
	flex: ${(props) => props?.flex};
	font-size: ${(props) => props.fontSize || SMALL_FONT};
	border: none;
	outline: none;
	z-index: 999;
`;

export const TerminalSearchForm = styled(BaseForm)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 200px;
	display: none;
	z-index: 999;
`;
