import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {HIGHLIGHT_COLOR} from './global';

export const BaseTable = styled(Table)`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	border: none;
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
		position: sticky;
		top: 0px;
		background: white;
		th {
			padding: 8px !important;
		}
	}
`;
export const Tbody = styled.tbody`
	background-color: ${(props) => props?.back};
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
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	text-align: ${(props) => props.textAlign || 'left'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const HeaderTh = styled.th`
	min-width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	border-bottom: ${(props) => props?.borderColor} !important;
	background: ${(props) => props?.back} !important;
	text-align: ${(props) => props.textAlign || 'left'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const FileListP = styled.p`
	width: 200px;
	margin: 0;
	padding: 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
