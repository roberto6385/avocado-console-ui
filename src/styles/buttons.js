import styled from 'styled-components';
import {MAIN_COLOR} from './global';

// Base가 되는 element의 속성은 건들지 않기로 약속.
// 모든 버튼은 background-color, color를 props로 사용 가능하다.
export const BaseButton = styled.button`
	background-color: ${(props) => props?.back || `${MAIN_COLOR}`};
	color: ${(props) => props?.color || 'black'};
	font-size: 18px;
	line-height: 0;
	outline: none;
	border: none;
	padding: 0px 8px;
	cursor: pointer;
	z-index: ${(props) => props.zIndex || '0px'};
	&:hover {
		filter: brightness(85%);
	}
`;

export const TextButton = styled.button`
	border: none;
	cursor: pointer;
	background-color: ${(props) => props?.back};
	padding: 8px 16px;
	margin: 4px 8px;
	border-radius: 20px;
	font-size: 14px;
	width: 120px;
	&:hover {
		filter: brightness(85%);
	}
`;

// 하위의 요소들은 Base Ele의 속성을 상속받아 사용.
export const IconButton = styled(BaseButton)`
	background-color: ${(props) => props?.back || 'transparent'};
	&:hover {
		color: ${MAIN_COLOR};
	}
`;

export const PopupButton = styled(BaseButton)`
	color: white;
	width: 100px;
	margin: 10px;
	padding: 16px; // covered attr
	border-radius: 8px;
	&:hover {
		filter: brightness(85%);
	}
`;

export const AddServerButton = styled(BaseButton)`
	padding: 20px 40px;
	color: white;
	border-radius: 8px;
	position: absolute;
	top: 60%;
	&:hover {
		filter: brightness(85%);
	}
`;
