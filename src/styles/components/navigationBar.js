//Navigation bar styles
import styled from 'styled-components';

export const NavigationItemTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
`;

export const NavigationItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 34px;
	border-left: 2px solid;
	padding: 0px 16px 0px 8px;
	padding-left: ${(props) => props?.left};
	border-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.navigation.items.selectedStyle
					.border.color
			: props.theme.pages.webTerminal.main.navigation.items.normalStyle
					.border.color};
	background-color: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.navigation.items.selectedStyle
					.backgroundColor
			: props.theme.pages.webTerminal.main.navigation.items.normalStyle
					.backgroundColor};
`;
