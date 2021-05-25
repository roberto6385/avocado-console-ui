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
	BORDER_COLOR,
	DARK_GREEN_COLOR,
	FOLDER_HEIGHT,
	LOGIN_LOGO_FONTSIZE,
	PrimaryButton,
} from '../../styles/global_design';
import background from '../../images/login.png';
import Input_ from '../RecycleComponents/Input_';
import Checkbox_ from '../RecycleComponents/Checkbox_';

const _Container = styled.div`
	background: ${DARK_GREEN_COLOR};
	position: relative;
`;

const _BackgroundContainer = styled.div`
	background-image: url(${background});
	height: 100vh;
	object-fit: contain;
	background-size: cover;
	background-position: center;
`;

const _Form = styled.form`
	background: white;
	padding: 80px 68px;
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	width: ${AUTH_FORM_WIDTH};
	height: ${AUTH_FORM_HEIGHT};
	border: solid 1px #d6d6d6;
	position: absolute;
	bottom: 264px;
	right: 378px;
`;
const _Input = styled.input`
	width: 100%;
	height: ${FOLDER_HEIGHT};
	font-size: 16px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};

	&:focus {
		border-color: ${DARK_GREEN_COLOR};
		outline: 0 none;
	}
`;

const _LogoSpan = styled.span`
	font-family: Roboto;
	font-size: ${LOGIN_LOGO_FONTSIZE};
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	margin-bottom: 22px;
`;

const _Span = styled.div`
	font-size: ${AVOCADO_FONTSIZE};
	margin-bottom: 44px;

	a {
		color: ${DARK_GREEN_COLOR};
	}
`;

const _SignInButton = styled(PrimaryButton)`
	height: ${FOLDER_HEIGHT};
	padding: 20px;
	width: 100%;
	background: ${DARK_GREEN_COLOR};
	margin: 0px;
`;

const _CheckboxAnchorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: ${AVOCADO_FONTSIZE};
	margin-bottom: 40px;

	a {
		color: ${ANCHOR_GRAY_COLOR};
		text-decoration: underline;
	}
`;

const UserAuthForm = () => {
	const dispatch = useDispatch();
	const [user, onChangeUser] = useInput('web');
	const [password, onChangePassword] = useInput('123456789');
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
		},
		[user, password],
	);

	useEffect(() => {
		emailRef.current?.focus();
	}, []);

	return !loading ? (
		<_Container>
			<_BackgroundContainer>
				<_Form onSubmit={onSubmitForm}>
					<_LogoSpan>Sign in to Avocado</_LogoSpan>
					<_Span>
						Don’t have an account? <a href='/'> sign up now </a>
					</_Span>

					<Input_ title={'Email'}>
						<_Input
							ref={emailRef}
							value={user}
							color={user === '' ? BORDER_COLOR : 'black'}
							onChange={onChangeUser}
							placeholder={'Email'}
						/>
					</Input_>
					<Input_ title={'Password'}>
						<_Input
							value={password}
							color={password === '' ? BORDER_COLOR : 'black'}
							onChange={onChangePassword}
							placeholder={'Password'}
						/>
					</Input_>
					<_CheckboxAnchorContainer>
						<Checkbox_
							title={'Remember Password'}
							value={rememberPassword}
							setValue={setRememberPassword}
						/>
						<a href='#'>Forget Password?</a>
					</_CheckboxAnchorContainer>
					<_SignInButton type='submit'>Sign in</_SignInButton>
				</_Form>
			</_BackgroundContainer>
		</_Container>
	) : (
		<div>loading...</div>
	);
};

export default UserAuthForm;
