import styled from 'styled-components';
import {GRAY_COLOR, PreventDragCopy} from './global';

export const BaseUl = styled.ul`
	// 드래그 방지
	${PreventDragCopy}
	list-style: none;
	overflow-y: scroll;
	margin: 0px;
	padding: 0px;
`;
export const BaseLi = styled.li`
	width: ${(props) => props?.width};
	padding: ${(props) => props.padding};
	background: ${(props) => props.back || 'white'};
`;

export const CustomLi = styled.li`
	// display: flex;
	// flex-direction: column;
	border-bottom: 1px solid ${GRAY_COLOR};
	width: 200px;
	padding: 4px;
`;
