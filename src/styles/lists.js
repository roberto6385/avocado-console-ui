import styled from 'styled-components';
import {GRAY_COLOR, MAIN_COLOR} from './global';
import {BORDER_COLOR, PreventDragCopy, THIRD_HEIGHT} from './global_design';

export const BaseUl = styled.ul`
	// 드래그 방지
	${PreventDragCopy}
	width:${(props) => props.width};
	list-style: none;
	overflow-y: scroll;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

export const DropListUl = styled(BaseUl)`
	flex: ${(props) => props.flex};
	background: ${(props) => props.back};
	min-width: 250px;
`;
export const BaseLi = styled.li`
	line-height: 0;
	position: relative;
	width: ${(props) => props?.width};
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	padding: 0px;
	background: ${(props) => props.back};
	white-space: nowrap;
	border-bottom: 1px solid ${BORDER_COLOR};
`;

export const CustomLi = styled.li`
	// display: flex;
	// flex-direction: column;
	border-bottom: 1px solid ${GRAY_COLOR};
	width: 200px;
	padding: 4px;
`;
