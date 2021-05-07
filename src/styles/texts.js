import styled from 'styled-components';
import {MIDDLE_FONT} from './global';

export const BaseSpan = styled.span`
	display: flex;
	align-items: center;
	margin: ${(props) => props?.margin || '0px'};
	padding: ${(props) => props?.padding || '0px'};
	color: ${(props) => props?.color || 'black'};
	font-size: ${(props) => props?.fontSize || MIDDLE_FONT};
`;

export const EllipsisSpan = styled(BaseSpan)`
	width: ${(props) => props?.width};
	display: block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
