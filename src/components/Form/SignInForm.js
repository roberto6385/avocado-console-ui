import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'base-64';
import useInput from '../../hooks/useInput';
import {getUserTicket} from '../../reducers/auth/userTicket';
import {SAVE_ENCODE_DATA} from '../../reducers/common';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {
	ANCHOR_GRAY_COLOR,
	AUTH_FORM_HEIGHT,
	AUTH_FORM_WIDTH,
	LIGHT_MODE_BORDER_COLOR,
	DARK_GREEN_COLOR,
	FOLDER_HEIGHT,
	IconButton,
} from '../../styles/global';
import Input_ from '../RecycleComponents/Input_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import appleButton from '../../images/apple_btn.png';
import googleButton from '../../images/google_btn.png';
import naverButton from '../../images/naver_btn.png';
import kakaoButton from '../../images/kakao_btn.png';
import {FONT_14, FONT_29, HEIGHT_40} from '../../styles/length';
import {PrimaryGreenButton} from '../../styles/default';

const _Form = styled.div`
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
	font-size: ${FONT_29};
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	margin: 0px 8px 20px 8px;
`;

const _Span = styled.div`
	font-size: ${FONT_14};
	margin: 0px 8px 52px 8px;

	a {
		color: ${DARK_GREEN_COLOR};
		text-decoration: underline;
	}
`;

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	height: ${HEIGHT_40};
	width: 360px;
	margin: 24px auto 39px;
	font-size: 16px;
	padding: 10px;
`;

const _CheckboxAnchorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: ${FONT_14};
	margin: 0px 8px 40px 8px;

	a {
		color: ${ANCHOR_GRAY_COLOR};
		text-decoration: underline;
	}
`;

const _OAuthContainer = styled.div`
	margin: 8px;
	display: flex;
	justify-content: space-between;
`;

const _OAuthButton = styled.button`
	background: transparent;
	border: none;
	width: fit-content;
	padding: 0px;
`;

const SignInForm = () => {
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation('signInForm');
	const [user, onChangeUser, setUser] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [visible, setVisible] = useState(true);
	const {loading} = useSelector((state) => state.userTicket);
	const [rememberMe, setRememberMe] = useState(false);
	const idRef = useRef(null);
	const passwordRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (user === '') {
				idRef.current?.focus();
			} else if (password === '') {
				passwordRef.current?.focus();
			} else {
				// const encodeData = base64.encode(`${user}:${password}`);
				const encodeData = base64.encode(`${'web'}:${'123456789'}`);
				dispatch({type: SAVE_ENCODE_DATA, data: encodeData});
				dispatch(
					getUserTicket({
						Authorization: 'Basic ' + encodeData,
						username: user,
						password: password,
					}),
				);

				localStorage.setItem('rememberMe', rememberMe);
				localStorage.setItem('user', user);
				localStorage.setItem('password', password);
				// account에 계정 정보 등록해놓으려고 rememberMe값만 bool 처리 했습니다.
				// rememberMe 가 true일 때, 첫 로그인 화면에서 저장했던 값을 불러오고
				// false 일 때는, 불러오지 않게 했어요!
				setUser('');
				setPassword('');
			}
		},
		[user, password, rememberMe],
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

	const oauthFunction = useCallback((e) => {
		e.preventDefault();

		switch (e.currentTarget.name) {
			case 'naverButton':
				break;
			case 'kakaoButton':
				break;
			case 'googleButton':
				console.log('google');
				location.href =
					'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=819744979674-dastdmj1j5k8coluu2vofclsi3kvo90h.apps.googleusercontent.com&redirect_uri=' +
					window.location.protocol +
					'//' +
					window.location.host +
					'/Redirect&scope=email%20profile&state=myState&access_type=offline&prompt=consent';
				break;
			case 'appleButton':
				break;
			default:
				break;
		}
		//TODO: Google auth
	}, []);

	useEffect(() => {
		if (localStorage.getItem('rememberMe') === 'true') {
			setUser(localStorage.getItem('user'));
			setPassword(localStorage.getItem('password'));
			setRememberMe(true);
		}
		idRef.current?.focus();
	}, []);

	useEffect(() => {
		i18n.changeLanguage('ko-KR');
	}, []);

	return !loading ? (
		<_Form onSubmit={onSubmitForm}>
			<_Title>{t('title')}</_Title>
			<_Span>
				{t('account')} <a href={'/signup'}> {t('signUp')} </a>
			</_Span>

			<Input_>
				<_Input
					ref={idRef}
					value={user}
					color={user === '' ? LIGHT_MODE_BORDER_COLOR : 'black'}
					onChange={onChangeUser}
					placeholder={t('id')}
				/>
			</Input_>
			<Input_>
				<_PasswordContainer id={'password_container'}>
					<_PasswordInput
						ref={passwordRef}
						onFocus={focusin}
						onBlur={focusout}
						type={visible ? 'password' : 'text'}
						value={password}
						color={
							password === '' ? LIGHT_MODE_BORDER_COLOR : 'black'
						}
						onChange={onChangePassword}
						placeholder={t('password')}
					/>
					<IconButton type='button' onClick={typeChange}>
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
					title={t('remember')}
					value={rememberMe}
					handleCheck={(e) => setRememberMe(e.target.checked)}
				/>
				<a href={'/password'}>{t('forget')}</a>
			</_CheckboxAnchorContainer>
			<_PrimaryGreenButton type='submit'>
				{t('signIn')}
			</_PrimaryGreenButton>
			<_OAuthContainer>
				<_OAuthButton name={'kakaoButton'} onClick={oauthFunction}>
					<img src={kakaoButton} alt='kakaoButton' />
				</_OAuthButton>
				<_OAuthButton name={'naverButton'} onClick={oauthFunction}>
					<img src={naverButton} alt='naverButton' />
				</_OAuthButton>
			</_OAuthContainer>
			<_OAuthContainer>
				<_OAuthButton name={'googleButton'} onClick={oauthFunction}>
					<img src={googleButton} alt='googleButton' />
				</_OAuthButton>
				<_OAuthButton name={'appleButton'} onClick={oauthFunction}>
					<img src={appleButton} alt='appleButton' />
				</_OAuthButton>
			</_OAuthContainer>
		</_Form>
	) : (
		<div>loading...</div>
	);
};

export default SignInForm;
