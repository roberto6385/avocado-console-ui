import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import base64 from 'base-64';

import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {getUserTicket} from '../../reducers/auth/userTicket';
import {SAVE_ENCODE_DATA} from '../../reducers/common';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import Checkbox_ from '../RecycleComponents/Checkbox_';
import appleButton from '../../images/apple_btn.png';
import googleButton from '../../images/google_btn.png';
import naverButton from '../../images/naver_btn.png';
import kakaoButton from '../../images/kakao_btn.png';
import LoadingSpinner from '../loadingSpinner';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserPasswordInput,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/default';
import {IconButton} from '../../styles/button';

const _UserForm = styled(UserForm)`
	height: 650px;
`;

const _UserPasswordContainer = styled(UserPasswordContainer)`
	margin-bottom: 10px;
`;

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 34px 0 30px 0;
`;

const _CheckboxAnchorContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	margin: 8px 0px;
	a {
		color: #757575;
		text-decoration: underline;
	}
`;

const _Or = styled.div`
	color: #757575;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const _Hr = styled.hr`
	width: 158px;
`;

const _OAuthContainer = styled.div`
	margin: 8px 0px;
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
			console.log('submit check');
			e.preventDefault();
			console.log('submit check');
			if (user === '') {
				idRef.current?.focus();
			} else if (password === '') {
				passwordRef.current?.focus();
			} else {
				console.log('encoding...');

				localStorage.setItem('rememberMe', rememberMe);
				localStorage.setItem('user', user);
				localStorage.setItem('password', password);
				setUser('');
				setPassword('');
				const encodeData = base64.encode(`${'web'}:${'123456789'}`);
				dispatch({type: SAVE_ENCODE_DATA, data: encodeData});
				dispatch(
					getUserTicket({
						Authorization: 'Basic ' + encodeData,
						username: user,
						password: password,
					}),
				);
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

	const onClickRememberMe = useCallback((e) => {
		setRememberMe(e.target.checked);
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
		<_UserForm onSubmit={onSubmitForm}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('account')} <a href={'/signup'}> {t('signUp')} </a>
			</UserTitleSpan>

			<InputFiled_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={user}
					onChange={onChangeUser}
					placeholder={t('id')}
				/>
			</InputFiled_>
			<InputFiled_ marginBottom={'18px'}>
				<_UserPasswordContainer id={'password_container'}>
					<UserPasswordInput
						ref={passwordRef}
						onFocus={focusin}
						onBlur={focusout}
						type={visible ? 'password' : 'text'}
						value={password}
						onChange={onChangePassword}
						placeholder={t('password')}
					/>
					<IconButton
						margin={'0px'}
						color={'#757575'}
						type='button'
						onClick={typeChange}
					>
						{visible ? (
							<span className='material-icons'>visibility</span>
						) : (
							<span className='material-icons'>
								visibility_off
							</span>
						)}
					</IconButton>
				</_UserPasswordContainer>
			</InputFiled_>
			<_CheckboxAnchorContainer>
				<Checkbox_
					title={t('remember')}
					value={rememberMe}
					handleCheck={onClickRememberMe}
					theme_value={0}
				/>
				<a href={'/password'}>{t('forget')}</a>
			</_CheckboxAnchorContainer>
			<_UserSubmitButton type='submit' onClick={onSubmitForm}>
				{t('signIn')}
			</_UserSubmitButton>
			<_Or>
				<_Hr /> {t('or')} <_Hr />
			</_Or>
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
		</_UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignInForm;
