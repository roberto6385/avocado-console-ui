import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {
	AVOCADO_FONTSIZE,
	LIGHT_BACKGROUND_COLOR,
	THIRD_HEIGHT,
} from './global_design';

export const BaseTable = styled(Table)`
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	overflow: scroll;
	margin: 0;
	padding: 0;
	border: none;
`;

export const Th = styled.th`
	display: flex;
	align-items: center;
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	justify-content: ${(props) => props.justify || 'flex-start'};
	white-space: nowrap;
	border: none !important;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const HeaderTh = styled.th`
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	border: none !important;
	text-align: ${(props) => props.textAlign || 'left'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 2;
`;

export const FileListP = styled.p`
	width: 200px;
	margin: 0;
	padding: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
