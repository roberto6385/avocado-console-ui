import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'base-64';
import useInput from '../../hooks/useInput';
import {getUserTicket} from '../../reducers/auth/userTicket';
import {SAVE_ENCODE_DATA} from '../../reducers/common';
import styled from 'styled-components';
import {
	ANCHOR_GRAY_COLOR,
	AUTH_FORM_HEIGHT,
	AUTH_FORM_WIDTH,
	AVOCADO_FONTSIZE,
	LIGHT_MODE_BORDER_COLOR,
	DARK_GREEN_COLOR,
	FOLDER_HEIGHT,
	GREEN_COLOR,
	IconButton,
	LOGIN_LOGO_FONTSIZE,
	PrimaryButton,
} from '../../styles/global';
import Input_ from '../RecycleComponents/Input_';
import Checkbox_ from '../RecycleComponents/Checkbox_';

const _Form = styled.form`
	background: white;
	padding: 70px 61px;
	border-radius: 16px;
	caret-color: black;

	display: flex;
	flex-direction: column;
	width: ${AUTH_FORM_WIDTH};
	height: ${AUTH_FORM_HEIGHT};
	border: solid 1px #d6d6d6;

	.focus {
		border-color: ${DARK_GREEN_COLOR};
		outline: 0 none;
	}
`;
const _Input = styled.input`
	flex: 1;
	height: ${FOLDER_HEIGHT};
	font-size: 14px;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};

	&:focus {
		border-color: ${DARK_GREEN_COLOR};
		outline: 0 none;
	}
`;

const _PasswordContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: 16px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _PasswordInput = styled(_Input)`
	padding: 0px;
	height: auto;
	border: none;
`;

const _Title = styled.span`
	font-family: Roboto;
	font-size: ${LOGIN_LOGO_FONTSIZE};
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	margin: 0px 8px 20px 8px;
`;

const _Span = styled.div`
	font-size: ${AVOCADO_FONTSIZE};
	margin: 0px 8px 52px 8px;

	a {
		color: ${DARK_GREEN_COLOR};
		text-decoration: underline;
	}
`;

const _SignInButton = styled(PrimaryButton)`
	height: ${FOLDER_HEIGHT};
	padding: 20px;
	width: 360px;
	background: ${GREEN_COLOR};
	margin: 0px auto 39px;
`;

const _CheckboxAnchorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: ${AVOCADO_FONTSIZE};
	margin: 0px 8px 40px 8px;

	a {
		color: ${ANCHOR_GRAY_COLOR};
		text-decoration: underline;
	}
`;

const _OAuthContainer = styled.div`
	margin: 8px;
`;

const SignInForm = () => {
	const dispatch = useDispatch();
	const [user, onChangeUser, setUser] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [visible, setVisible] = useState(true);
	const {loading} = useSelector((state) => state.userTicket);
	const [rememberPassword, setRememberPassword] = useState(false);
	const emailRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			const encodeData = base64.encode(`${user}:${password}`);
			dispatch({type: SAVE_ENCODE_DATA, data: encodeData});
			dispatch(
				getUserTicket({
					Authorization: 'Basic ' + encodeData,
					username: user,
					password: password,
				}),
			);
			setUser('');
			setPassword('');
		},
		[user, password],
	);

	const typeChange = useCallback(
		(e) => {
			e.preventDefault();
			setVisible(!visible);
		},
		[visible],
	);

	const focusin = useCallback(() => {
		const passwordContainer = document.getElementById('password_container');
		passwordContainer.classList.add('focus');
	}, []);
	const focusout = useCallback(() => {
		const passwordContainer = document.getElementById('password_container');
		passwordContainer.classList.remove('focus');
	}, []);

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	return !loading ? (
		<_Form onSubmit={onSubmitForm}>
			<_Title>Sign in to Avocado</_Title>
			<_Span>
				Don’t have an account? <a href={'/signup'}> sign up now </a>
			</_Span>

			<Input_>
				<_Input
					ref={emailRef}
					value={user}
					color={user === '' ? LIGHT_MODE_BORDER_COLOR : 'black'}
					onChange={onChangeUser}
					placeholder={'Email'}
				/>
			</Input_>
			<Input_>
				<_PasswordContainer id={'password_container'}>
					<_PasswordInput
						onFocus={focusin}
						onBlur={focusout}
						type={visible ? 'password' : 'text'}
						value={password}
						color={password === '' ? LIGHT_MODE_BORDER_COLOR : 'black'}
						onChange={onChangePassword}
						placeholder={'Password'}
					/>
					<IconButton onClick={typeChange}>
						{visible ? (
							<span className='material-icons'>visibility</span>
						) : (
							<span className='material-icons'>
								visibility_off
							</span>
						)}
					</IconButton>
				</_PasswordContainer>
			</Input_>
			<_CheckboxAnchorContainer>
				<Checkbox_
					title={'Remember Password'}
					value={rememberPassword}
					setValue={setRememberPassword}
				/>
				<a href={'/password'}>Forget Password?</a>
			</_CheckboxAnchorContainer>
			<_SignInButton type='submit'>Sign in</_SignInButton>
			<_OAuthContainer>oauth 는 확정 이후 디자인</_OAuthContainer>
			<_OAuthContainer>oauth</_OAuthContainer>
		</_Form>
	) : (
		<div>loading...</div>
	);
};

export default SignInForm;
