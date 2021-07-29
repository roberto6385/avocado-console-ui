//Login, signin, change password pages styles
import styled from 'styled-components';
import {borderColor, inputFocusBoaderColor, L_GREEN_NORMAL} from '../color';
import {PrimaryGreenButton} from './button';

export const UserForm = styled.form`
	color: black;
	background: white;
	width: 500px;
	height: 614px;
	padding: 70px;
	border-radius: 16px;
	caret-color: black;
	display: flex;
	flex-direction: column;
	.focus {
		border-color: ${inputFocusBoaderColor[0]};
		outline: 0 none;
	}
`;
export const UserTitle = styled.div`
	font-size: 28px;
	font-weight: bold;
	margin-bottom: 20px;
`;
export const UserTitleSpan = styled.div`
	font-size: 14px;
	margin-bottom: 52px;
	a {
		color: ${L_GREEN_NORMAL};
		text-decoration: underline;
	}
`;
export const UserInput = styled.input`
	flex: 1;
	height: 40px;
	font-size: 14px;
	padding: 12px 10px;
	border-radius: 4px;
	border: 1px solid ${borderColor[0]};
	&:focus {
		border-color: ${inputFocusBoaderColor[0]};
		outline: 0 none;
	}
`;
export const UserSubmitButton = styled(PrimaryGreenButton)`
	width: 360px;
	height: 40px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: 0.15px;
`;
export const UserPasswordInput = styled(UserInput)`
	padding: 0px;
	height: auto;
	border: none;
`;
export const UserPasswordContainer = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	padding: 12px 10px;
	border-radius: 4px;
	border: 1px solid ${borderColor[0]};
`;
