import styled from 'styled-components';
import {NAV_HEIGHT, SECOND_NAV_HEIGHT} from './global';
import {Card} from 'react-bootstrap';

export const BaseCard = styled(Card)`
	flex: ${(props) => props?.flex};
	min-width: ${(props) => props?.min};
	padding: 0px;
	margin: 0px;
	border: none;
	width: ${(props) => props?.width || '100%'};
	.card-header {
		display: flex;
		padding: 0px;
		margin: 0px;
		border: none;
	}
	.card-body {
		padding: 0px;
		margin: 0px;
		border: none;
	}
`;

export const MainHeader = styled(BaseCard.Header)`
	height: ${NAV_HEIGHT};
`;
export const SubHeader = styled(BaseCard.Header)`
	height: ${SECOND_NAV_HEIGHT};
`;

export const SSHTBody = styled(BaseCard.Body)`
	flex: 1;
	// background: black;
`;
export const SFTPBody = styled(BaseCard.Body)`
	display: flex;
	flex-direction: ${(props) => props?.direction};
	overflow: scroll;
`;

export const SFTPHistoryBody = styled(SFTPBody)`
	flex-direction: column;
`;
