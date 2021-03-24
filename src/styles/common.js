import styled from 'styled-components';
import {Button} from 'react-bootstrap';

export const PopupButton = styled(Button)`
	width: 100px;
	margin: 10px;
	background-color: ${(props) => props.back};
	border: none;
	color: white;
	&:hover {
		filter: brightness(85%);
		color: white;
	}
`;
