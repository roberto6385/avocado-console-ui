import styled from 'styled-components';
import {Card} from 'react-bootstrap';
import {GRAY_COLOR, HIGHLIGHT_COLOR, MAIN_COLOR, NAV_HEIGHT} from './global';
import BTable from 'react-bootstrap/Table';
import {GoFile, GoFileDirectory} from 'react-icons/go';
import {BsArrowUpDown} from 'react-icons/all';

// ConvertSFTP
export const ConvertIcon = styled(BsArrowUpDown)`
	font-size: 21px;
`;

// Dropzone
export const DropzoneBox = styled.div`
	height: 100%;
	overflow-y: scroll;
	outline: none;
`;

//Edit

export const FlexBox = styled.div`
	flex: 1;
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

export const SFTPBody = styled(Card.Body)`
	padding: 0px;
	display: flex;
	overflow: scroll;
`;

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
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

export const CustomTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: left;
	min-width: 130px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const CustomRightTh = styled.th`
	flex: ${(props) => props.flex};
	text-align: right;
	z-index: 1;
`;

export const CustomThBtn = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	line-height: 0px;
	padding: 0px;
	z-index: 1;
	color: ${(props) => props.color};
`;

export const CustomTbody = styled.tbody`
	tr.highlight_tbody {
		color: black;
		&:hover {
			background: ${HIGHLIGHT_COLOR};
		}
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
	min-width: 220px;
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

export const HistoryBody = styled(Card.Body)`
	padding: 0px;
	border-left: 1px solid ${GRAY_COLOR};
`;

// HistoryContents

export const FlexSpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const CustomP = styled.p`
	display: flex;
	margin: 0px 4px;
	padding: 4px;
	align-items: center;
	font-size: 14px;
	text-align: left;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
export const CustomUl = styled.ul`
	margin: 0px;
	padding: 0px;
	display: flex;
	overflow-y: scroll;
	flex-direction: column;
	white-space: nowrap;
	flex: 1;

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
	width: 300px;
	overflow: scroll;
`;

export const NoHistory = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

// SFTPContainer

export const SftpContainer = styled.div`
	display: flex;
	height: 100%;
	overflow: scroll;
`;
