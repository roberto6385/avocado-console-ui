import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {HIGHLIGHT_COLOR} from './global';
import {AVOCADO_FONTSIZE, BORDER_COLOR} from './global_design';

export const BaseTable = styled(Table)`
	flex: 1 1 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	margin: 0;
	padding: 0;
	border: none;
	font-size: ${AVOCADO_FONTSIZE};
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const Thead = styled.thead`
	background-color: ${(props) => props?.back};
	tr {
		display: flex;
		top: 0px;
		background: white;
		th {
			padding: 8px !important;
		}
	}
`;
export const Tbody = styled.tbody`
	background-color: ${(props) => props?.back};
	overflow: scroll;
	flex: 1;
	.highlight_tbody.active {
		background: ${HIGHLIGHT_COLOR};
	}
	tr {
		cursor: pointer;
		display: flex;
		th {
			padding: 8px !important;
		}
	}
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
