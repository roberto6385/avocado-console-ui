import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {getUserTicket} from '../../reducers/auth/userTicket';
import TextBoxField_ from '../RecycleComponents/TextBoxField_';
import CheckBox_ from '../RecycleComponents/CheckBox_';
import appleButton from '../../images/alternativeAuth/apple_btn.png';
import googleButton from '../../images/alternativeAuth/google_btn.png';
import naverButton from '../../images/alternativeAuth/naver_btn.png';
import kakaoButton from '../../images/alternativeAuth/kakao_btn.png';
import LoadingSpinner from '../LoadingSpinner';
import {
	passwordVisibilityIcon,
	passwordVisibilityOffIcon,
} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserPasswordInput,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/components/siginIn';

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
		color: ${(props) =>
			props.theme.pages.signIn.links.secondary.font.color};
		text-decoration: underline;
	}
`;

const _Or = styled.div`
	// color: #757575;
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

	const {loading} = useSelector((state) => state.userTicket, shallowEqual);

	const [user, onChangeUser, setUser] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [hidePassword, setHidePassword] = useState(true);
	const [rememberMe, setRememberMe] = useState(false);
	const userRef = useRef(null);
	const passwordRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			if (user === '') {
				userRef.current?.focus();
			} else if (password === '') {
				passwordRef.current?.focus();
			} else {
				localStorage.setItem('rememberMe', rememberMe);
				localStorage.setItem('user', user);
				localStorage.setItem('password', password);

				setUser('');
				setPassword('');
				dispatch(
					getUserTicket({
						username: user,
						password: password,
					}),
				);
			}
		},
		[user, password, rememberMe, setUser, setPassword, dispatch],
	);

	const typeChange = useCallback(
		(e) => {
			e.preventDefault();
			setHidePassword(!hidePassword);
		},
		[hidePassword],
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
		userRef.current?.focus();
	}, [setPassword, setUser]);

	useEffect(() => {
		i18n.changeLanguage('ko-KR');
	}, [i18n]);

	return !loading ? (
		<_UserForm onSubmit={onSubmitForm}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('account')} <a href={'/signup'}> {t('signUp')} </a>
			</UserTitleSpan>

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					ref={userRef}
					value={user}
					onChange={onChangeUser}
					placeholder={t('id')}
				/>
			</TextBoxField_>
			<TextBoxField_ marginBottom={'18px'}>
				<_UserPasswordContainer id={'password_container'}>
					<UserPasswordInput
						ref={passwordRef}
						onFocus={focusin}
						onBlur={focusout}
						type={hidePassword ? 'password' : 'text'}
						value={password}
						onChange={onChangePassword}
						placeholder={t('password')}
					/>
					<IconButton
						margin={'0px 0px 0px 12px'}
						type='button'
						color={'#757575'}
						onClick={typeChange}
					>
						{hidePassword
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</_UserPasswordContainer>
			</TextBoxField_>
			<_CheckboxAnchorContainer>
				<CheckBox_
					title={t('remember')}
					value={rememberMe}
					handleCheck={onClickRememberMe}
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
