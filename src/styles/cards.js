import styled from 'styled-components';
import {NAV_HEIGHT, SECOND_NAV_HEIGHT} from './global';
import {Card} from 'react-bootstrap';

// 추가하실 속성 있으시면 props로 전달 하셔서 사용하시면 됩니다.
export const BaseCard = styled(Card)`
	display: flex;
	flex-direction: column;
	min-width: ${(props) => props?.min};
	padding: ${(props) => props?.padding || '0px'};
	margin: 0px;
	border: none;
	width: ${(props) => props.width || '100%'};
	height: ${(props) => props.height || '100%'};
`;

export const MainHeader = styled(BaseCard.Header)`
	display: flex;
	padding: ${(props) => props?.padding || '0px'};
	margin: 0px;
	border: none;
	height: ${NAV_HEIGHT};
	background: ${(props) => props.back};
	color: ${(props) => props.color || 'black'};
	justify-content: ${(props) => props.justify};
	align-items: center;
	width: ${(props) => props.width || '100%'};
`;
export const SubHeader = styled(MainHeader)`
	height: ${SECOND_NAV_HEIGHT};
`;

export const SSHTBody = styled(BaseCard.Body)`
	display: flex;
	padding: 0px;
	margin: 0px;
	border: none;
	flex: 1;
`;
export const SFTPBody = styled(BaseCard.Body)`
	display: flex;
	padding: 0px;
	margin: 0px;
	border: none;
	flex: ${(props) => props?.flex};
	width: ${(props) => props.width || '100%'};
	flex-direction: ${(props) => props?.direction};
	overflow: scroll;
`;
export const SideBody = styled(BaseCard.Body)`
	display: flex;
	padding: ${(props) => props?.padding || '0px'};
	margin: ${(props) => props?.margin || '0px'};
	border: none;
	flex: ${(props) => props?.flex};
	width: ${(props) => props.width || '100%'};
	flex-direction: ${(props) => props?.direction};
`;
