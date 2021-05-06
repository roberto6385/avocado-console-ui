import styled from 'styled-components';

import {FormControl, Modal, Nav} from 'react-bootstrap';
import {HIGHLIGHT_COLOR, MAIN_COLOR, SUB_COLOR} from './global';
import {FaServer, RiArrowUpDownLine, RiTerminalFill} from 'react-icons/all';

export const CustomModal = styled(Modal)`
    .modal-dialog{
        height:100%;
        margin:auto;
        display:flex;
        align-items:center;
        justify-contents:center;
        
        .modal-content{
            margin:auto;
            width:450px;
            height:200px;
            flex-direction:column;
            }
        }
    }
`;

export const ServerNavBarContainer = styled(Nav)`
	flex: 1;
`;

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

export const ServerSearchForm = styled(FormControl)`
	font-size: 12px;
	border: none;
	border-bottom: 1px solid ${HIGHLIGHT_COLOR};
	outline: none;
	border: 'none';
`;

// ServerNavBar
export const FaServerIcon = styled(FaServer)`
	vertical-align: middle;
	margin-right: 15px;
	font-size: 25px;
`;

export const ServerNavItem = styled(Nav.Item).attrs((props) => ({
	style: {
		paddingLeft: props.left,
		backgroundColor: props.back,
	},
}))`
	display: flex;
	align-items: center;
	padding: 15px;
	&:hover {
		background-color: ${SUB_COLOR};
	}
`;

export const TabNav = styled(Nav)`
	flex: 1;
	flex-wrap: nowrap;
	overflow-x: scroll;
`;

export const TabNavItem = styled(Nav.Item)`
	.tab_navLink {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.active_tab_item {
		background-color: ${HIGHLIGHT_COLOR};
	}
	&:hover {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

export const IconSpan = styled.span`
	// color: black;
	display: flex;
	align-items: center;
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
	margin: 0;
	padding: 0;
	position: relative;
	// display: flex;
	// flex-wrap: wrap;
`;

//Add Server Form
export const AddServerModal = styled(Modal)`
	display: none;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
