//Navigation bar styles
import styled from 'styled-components';
import {fontColor, navHighColor} from '../color';

export const NavigationBarTitle = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	color: ${(props) => fontColor[props.theme_value]};
`;
export const NavigationBarItemForm = styled.form`
	display: flex;
	padding: 4px 0px;
	border: none;
`;
export const NavigationBarInput = styled.input`
	background: ${(props) => navHighColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	margin: 0;
	border: none;
	outline: none;
`;
