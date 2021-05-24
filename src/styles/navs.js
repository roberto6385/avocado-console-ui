import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {HIGHLIGHT_COLOR} from './global';
import {FOLDER_HEIGHT} from './global_design';

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
