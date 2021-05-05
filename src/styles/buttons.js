import styled from 'styled-components';
import {MAIN_COLOR} from './global';

// Base가 되는 element의 속성은 건들지 않기로 약속.
// 모든 버튼은 background-color, color를 props로 사용 가능하다.
export const BaseButton = styled.button`
	background-color: ${(props) => props?.back || 'transparent'};
	font-size: 18px;
	line-height: 0;
	outline: none;
	border: none;
	padding: 0px 8px;
	cursor: pointer;
	z-index: 999;
`;

// 하위의 요소들은 Base Ele의 속성을 상속받아 사용.
export const IconButton = styled(BaseButton)`
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
	border-radius: 8px;
	position: absolute;
	top: 60%;
	&:hover {
		filter: brightness(85%);
	}
`;
