import styled from 'styled-components';
import {Card, Form} from 'react-bootstrap';
import {NAV_HEIGHT} from './global';

//SSHT Container
export const SSHTBody = styled(Card.Body)`
	padding: 0px;
	flex: 1;
	// background: black;
`;

export const SSHTComponents = styled.div`
	flex: 1;
	display: flex;
	align-items: stretch;
	flex-direction: column;
	.card-header {
		height: ${NAV_HEIGHT};
		fontsize: 17px;
		display: flex;
		align-items: center;
	}
`;

//SSHT
export const SSHTerminal = styled.div`
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
	position: relative;
`;

export const TerminalSearchForm = styled(Form.Control)`
	position: absolute;
	right: 0;
	bottom: 0;
	width: 200px;
	display: none;
	z-index: 999;
`;
