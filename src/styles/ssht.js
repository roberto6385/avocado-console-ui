import styled from 'styled-components';
import {Form} from 'react-bootstrap';

export const TerminalSearchForm = styled(Form.Control)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 200px;
	display: none;
	z-index: 999;
`;
