import styled from 'styled-components';
import {Card} from 'react-bootstrap';
import {NAV_HEIGHT} from './global';

export const SSHTBody = styled(Card.Body)`
	padding: 0px;
	flex: 1;
	background: black;
`;

export const SSHTContainer = styled.div`
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
