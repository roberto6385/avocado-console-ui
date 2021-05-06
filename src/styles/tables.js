import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import {HIGHLIGHT_COLOR} from './global';

export const BaseTable = styled(Table)`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	border: none;
	overflow: scroll;
	thead {
		tr {
			display: flex;
			position: sticky;
			top: 0px;
			background: white;
			z-index: 1;
		}
	}
	tbody {
		tr {
			// display: flex;
		}
	}
	//
	//
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const Th = styled.th`
	// flex: ${(props) => props?.flex};
	text-align: ${(props) => props.textAlign || 'right'};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CustomNameTh = styled.th`
	flex: ${(props) => props.flex};
	// text-align: left;
	min-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CustomTimeTh = styled.th`
	flex: ${(props) => props.flex};
	// text-align: left;
	min-width: 200px;
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
export const CustomThBtn = styled.button`
	background: transparent;
	margin-left: 8px;
	border: none;
	font-size: 18px;
	line-height: 0px;
	z-index: 1;
	color: ${(props) => props.color};
`;
export const CustomTbody = styled.tbody`
	flex: 1;
	tr {
		border: none;
		border-bottom: 1px solid gray;
		th {
			border: none;
		}
	}
	tr.highlight_tbody {
		color: black;
	}
	tr.highlight_tbody.active {
		background: ${HIGHLIGHT_COLOR};
	}
`;
