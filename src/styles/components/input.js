import styled from "styled-components";
import {borderColor, fontColor, inputFocusBoaderColor, settingInput} from "../color";

export const Input = styled.input`
	width: 100%;
	height: 34px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => settingInput[props.theme_value]};
	color: ${(props) => fontColor[props.theme_value]};
	&:focus {
		border-color: ${(props) => inputFocusBoaderColor[props.theme_value]};
	}
`;