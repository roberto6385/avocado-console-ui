import styled from 'styled-components';
import {NAV_HEIGHT, SECOND_NAV_HEIGHT} from './global';
import {Card} from 'react-bootstrap';

export const BaseCard = styled(Card)`
	flex: ${(props) => props?.flex || 0};
	padding: 0px;
	margin: 0px;
	width: 100%;
	.card-header {
		display: flex;
		padding: 0px;
		margin: 0px;
	}
	.card-body {
		padding: 0px;
		margin: 0px;
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
	overflow: scroll;
`;

export const SFTPHistoryBody = styled(SFTPBody)`
	flex-direction: column;
`;
