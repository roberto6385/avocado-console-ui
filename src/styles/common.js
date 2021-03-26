import styled from 'styled-components';

import {Button, Card, Col, FormControl, Modal, Nav, Tab} from 'react-bootstrap';
import {
	HIGHLIGHT_COLOR,
	MAIN_COLOR,
	NAV_HEIGHT,
	NAV_HEIGHT_SUM,
	SECOND_NAV_HEIGHT,
	WHITE_COLOR,
} from './global';
import background from '../images/bg_3.png';
import {FaServer} from 'react-icons/all';
import {RiTerminalFill} from 'react-icons/ri';
import {BiTransferAlt} from 'react-icons/bi';

export const PopupButton = styled(Button)`
	width: 100px;
	margin: 10px;
	background-color: ${(props) => props.back};
	border: none;
	color: white;
	&:hover {
		filter: brightness(85%);
		color: white;
	}
`;

// ConfirmPopup
export const ModalFooter = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 4px 12px;
	margin: 10px;
`;

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

// Footer
export const BottomBar = styled.div`
	height: ${NAV_HEIGHT};
`;

export const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 100%;
`;

export const HostInfo = styled.div`
	margin: 8px;
`;

// LeftContainer
export const Header = styled(Nav)`
	height: ${NAV_HEIGHT_SUM};
	display: block;
	.left_header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: ${NAV_HEIGHT};
		background: ${MAIN_COLOR};
		color: ${WHITE_COLOR};
	}
	.left_header_icons {
		height: ${SECOND_NAV_HEIGHT};
		background: ${WHITE_COLOR};
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border: none;
		border-bottom: solid;
		border-width: 1px;
		border-color: ${HIGHLIGHT_COLOR};
	}
`;

export const ServerNavBarContainer = styled(Nav)`
	flex: 1;
`;

export const OutlineCol = styled(Col)`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
`;

export const IconButton = styled.button`
	line-height: 0;
	background: transparent;
	outline: none;
	border: none;
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

// MainPage
export const Background = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	background-image: url(${background});
	background-size: cover;
	background-position: center;
	position: relative;
`;

export const AddServerButton = styled.button`
	background-color: ${MAIN_COLOR};
	&:hover {
		filter: brightness(85%);
	}
	padding: 10px 40px;
	border: none;
	color: ${WHITE_COLOR};
	border-radius: 8px;
	position: absolute;
	top: 60%;
`;

// ServerNavBar
export const FaServerIcon = styled(FaServer)`
	vertical-align: middle;
	margin-right: 15px;
	font-size: 25px;
`;

export const ServerNavItem = styled(Nav.Item)`
	padding: 15px;
	background-color: ${(props) => props.back};
	&:hover {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

// Split Bar
export const SplitButtonContainer = styled.div`
	height: ${NAV_HEIGHT};
	display: flex;
	align-items: center;
`;

// Tab Contents Container
export const TabContentCardHeader = styled(Card.Header)`
	padding: 7px 20px;
	margin: 0;
	height: ${SECOND_NAV_HEIGHT};
	background: rgba(0, 0, 0, 0.03);
`;

export const TabContentCard = styled(Card)`
	display: flex;
	flex-direction: column;
	height: ${(props) => props.h};
	width: ${(props) => props.w};
`;

// Tab Nav Bar
export const TabContainer = styled(Tab.Container)`
	display: flex !important;
	height: ${NAV_HEIGHT};
`;
export const TabNav = styled(Nav)`
	height: ${NAV_HEIGHT};
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
	color: black;
	display: flex;
	align-items: center;
`;

export const TabSSHTIcon = styled(RiTerminalFill)`
	color: ${MAIN_COLOR};
	margin-right: 5px;
`;

export const TabSFTPIcon = styled(BiTransferAlt)`
	color: ${MAIN_COLOR};
	margin-right: 5px;
`;

export const FlexBox = styled.div`
	display: flex;
`;

// Work Space
export const WorkSpaceContainer = styled.div`
	flex: 1;
`;

export const Work = styled.div`
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
`;

//Add Server Form
export const AddServerCard = styled(Card)`
	display: none;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
`;

export const AddServerButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;
