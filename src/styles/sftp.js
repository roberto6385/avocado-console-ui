import styled from 'styled-components';
import {
	DEEP_GRAY_COLOR,
	GRAY_COLOR,
	HIGHLIGHT_COLOR,
	MAIN_COLOR,
	NAV_HEIGHT,
} from './global';
import BTable from 'react-bootstrap/Table';
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

export const DropdownP = styled.p`
	margin: 0;
	padding: 0;
	width: 150px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

//Edit

export const FlexBox = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	overflow: scroll;
	flex-direction: column;
	.card-header {
		display: flex;
		align-items: center;
		position: relative;
		height: ${NAV_HEIGHT};
	}
`;

// EditContents

export const TextAreaWrapper = styled.div`
	display: inline-block;
	background: black;
	background-size: 100% 32px;
	background-position: left 10px;
	width: 100%;
	textarea {
		color: white;
		background: url(http://i.imgur.com/2cOaJ.png);
		background-attachment: local;
		background-repeat: no-repeat;
		padding-left: 35px;
		padding-top: 10px;
		outline: none;
		border: none;
		width: 100%;
		height: 100%;
		font-size: 13px;
		line-height: 16px;
		resize: none;
	}
`;

// EditNav

export const Navbar = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;

export const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
	margin: 4px;
	padding: 2px;
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

// FileList

// FileListContents

export const DirectoryIcon = styled(GoFileDirectory)`
	margin-right: 4px;
`;

export const FileIcon = styled(GoFile)`
	margin-right: 4px;
`;

export const CustomTable = styled(BTable)`
	white-space: nowrap;
	height: 100%;
	margin: 0;
	border: none;
	border-right: 1px solid black;
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const CustomNameTh = styled.th`
	flex: ${(props) => props.flex};
	// text-align: left;
	min-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const CustomTh = styled.th`
	flex: ${(props) => props.flex};
	// text-align: left;
	min-width: 130px;
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

export const CustomRightTh = styled.th`
	flex: ${(props) => props.flex};
	min-width: 105px;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: right;
	z-index: 1;
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
		border-bottom: 1px solid black;
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

export const HeaderTr = styled.tr`
	display: flex;
	position: sticky;
	top: 0px;
	background: white;
	z-index: 999;
`;

// FileList Nav

export const PathSpan = styled.span`
	font-size: 14px;
	margin: 0px 4px;
`;

// History

export const HistoryBox = styled.div`
	min-width: 200px;
	height: 100%;
	display: flex;
	flex-direction: column;
	.card-header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: ${NAV_HEIGHT};
	}
`;

// HistoryContents

export const FlexSpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const CustomP = styled.p`
	display: inline-block;
	min-width: ${(props) => props.minWidth};
	margin: 0px 6px;
	padding: 2px 0px;
	font-size: 14px;
	text-align: ${(props) => props.align};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: ${(props) => props.flex};
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
