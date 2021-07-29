//Setting page styles
import styled from 'styled-components';
import {borderColor, fontColor, mainBackColor} from '../color';

export const SettingMainContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) => mainBackColor[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	overflow: scroll;
	padding: 0px 16px;
`;
export const SettingTitle = styled.div`
	display: flex;
	align-items: center;
	height: 50px;
	min-height: 50px;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
	line-height: 1.31;
	font-size: 16px;
`;
export const SettingContentsContainer = styled.div`
	padding: 16px 0px;
`;
