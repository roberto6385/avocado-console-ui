import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {HIGHLIGHT_COLOR, SUB_COLOR} from './global';

export const BaseNav = styled(Nav)`
	display: flex;
	flex-wrap: nowrap;
	flex-direction: ${(props) => props?.direction};
`;
export const ServerNavItem = styled(Nav.Item)`
	display: flex;
	align-items: center;
	padding: 15px;
	padding-left: ${(props) => props?.left};
	background-color: ${(props) => props.back};
`;
export const TabNav = styled(Nav)`
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
