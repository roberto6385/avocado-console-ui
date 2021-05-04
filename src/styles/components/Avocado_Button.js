import styled from 'styled-components';
import {MAIN_COLOR} from '../global';

// Base가 되는 element의 속성은 건들지 않기로 약속.
export const BaseButton = styled.button`
	line-height: 0;
	background: transparent;
	outline: none;
	border: none;
	padding: 0px 8px;
`;

// 하위의 요소들은 Base Ele의 속성을 상속받아 사용.

export const IconButton = styled(BaseButton)`
	&:hover {
		color: ${MAIN_COLOR};
	}
`;
export const UserButton = styled(BaseButton)`
	color: ${MAIN_COLOR};
`;
