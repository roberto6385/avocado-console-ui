//Login, signin, change password pages styles
import styled from 'styled-components';
import {NormalButton} from './button';
import {Input} from './input';

export const UserForm = styled.form`
	color: black;
	background: ${(props) => props.theme.pages.signIn.backgroundColor};
	width: 500px;
	height: 614px;
	padding: 70px;
	border-radius: 16px;
	caret-color: ${(props) => props.theme.pages.signIn.font.color};
	color: ${(props) => props.theme.pages.signIn.font.color};
	display: flex;
	flex-direction: column;
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
		color: ${(props) => props.theme.pages.signIn.links.primary.font.color};
		text-decoration: underline;
	}
`;
export const UserInput = styled(Input)`
	flex: 1;
	height: 40px;
	padding: 12px 10px;
`;
export const UserPasswordInput = styled(Input)`
	flex: 1;
	padding: 0px;
	height: auto;
	border: none;
	background: transparent;
`;
export const UserSubmitButton = styled(NormalButton)`
	width: 360px;
	height: 40px;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5;
	letter-spacing: 0.15px;
`;
export const UserPasswordContainer = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	padding: 12px 10px;
	border-radius: 4px;
	background: ${(props) =>
		props.theme.basic.pages.textBoxs.normalStyle.backgroundColor};
	border: 1px solid;
`;
