import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {HIGHLIGHT_COLOR} from './global';
import {Navbar} from '@blueprintjs/core';
import {FOLDER_HEIGHT} from './global_design';

export const Folder_Server_Nav = styled(Navbar)``;
export const Folder_Server_Nav_Item = styled(Navbar.Group)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: ${FOLDER_HEIGHT};
	padding: auto 16px;
	padding-left: ${(props) => props?.left};
	background-color: ${(props) => props.back};
	border-left: ${(props) => props.border};
`;
// blue print로 변경중...

export const BaseNav = styled(Nav)`
	display: flex;
	flex-wrap: nowrap;
	flex-direction: ${(props) => props?.direction};
	overflow: ${(props) => props.overflow || 'initial'};
	height: ${(props) => props.height || 'initial'};
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

export const BaseNavLink = styled(Nav.Link)``;
