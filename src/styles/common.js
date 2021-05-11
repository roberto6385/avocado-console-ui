import styled from 'styled-components';
import {MAIN_COLOR} from './global';
import {FiServer, RiArrowUpDownLine, RiTerminalFill} from 'react-icons/all';

// SidebarShow, RotateButton 삭제 예정.
export const SidebarShow = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	width: 30px;
`;

export const RotateButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	position: absolute;
	left: -18px;

	-ms-transform: rotate(-90deg); /* IE 9 */
	-webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
	transform: rotate(-90deg);
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

// ServerNavBar
export const FaServerIcon = styled(FiServer)`
	margin-right: 4px;
	color: ${MAIN_COLOR};
`;

export const TabSSHTIcon = styled(RiTerminalFill)`
	color: ${MAIN_COLOR};
	margin-right: 5px;
`;

export const TabSFTPIcon = styled(RiArrowUpDownLine)`
	color: ${MAIN_COLOR};
	margin-right: 5px;
`;

// Work Space
// 이건 split pane이랑 연결되어 있어서 다음에..
export const WorkSpaceContainer = styled.div`
	flex: 1;
	overflow: scroll;
	margin: 0;
	padding: 0;
	position: relative;
	// display: flex;
	// flex-wrap: wrap;
`;
