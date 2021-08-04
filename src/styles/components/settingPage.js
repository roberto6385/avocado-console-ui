//Setting page styles
import styled from 'styled-components';

export const SettingMainContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.aside.backgroundColor};
	overflow: scroll;
	padding: 0px 16px;
`;
export const SettingTitle = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid
		${(props) => props.theme.pages.webTerminal.main.aside.border.color};
	line-height: 1.31;
	font-size: 16px;
`;
export const SettingContentsContainer = styled.div`
	padding: 16px 0px;
`;
