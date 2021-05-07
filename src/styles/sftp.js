import styled from 'styled-components';
import {DEEP_GRAY_COLOR, GRAY_COLOR, HIGHLIGHT_COLOR} from './global';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {BsArrowUpDown} from 'react-icons/all';

// ConvertSFTP
export const ConvertIcon = styled(BsArrowUpDown)`
	font-size: 21px;
`;

// Dropdown List
export const DropdownUl = styled.ul`
	margin: 0;
	padding: 0;
	min-width: 180px !important;
	border-right: 1px solid ${DEEP_GRAY_COLOR};
	list-style: none;
	overflow-y: scroll;
	.highlight_list.active {
		background: ${HIGHLIGHT_COLOR};
	}
`;

export const DropdownLi = styled.li`
	padding: 2px;
	width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const CustomUl = styled.ul`
	margin: 0px;
	padding: 0px;
	display: flex;
	overflow-y: scroll;
	flex-direction: column;
	white-space: nowrap;
	flex: 1;
	min-width: 250px;
	width: 100%;

	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	.history_list {
	}
	.history_list.active {
		background: ${HIGHLIGHT_COLOR};
	}
`;

export const CustomLi = styled.li`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid ${GRAY_COLOR};
	min-width: 250px;
	width: 100%;
	// overflow: scroll;
`;

// SFTPContainer
export const FileIcon = styled(GoFile)`
	margin-right: 4px;
`;
export const DirectoryIcon = styled(GoFileDirectory)`
	margin-right: 4px;
`;
