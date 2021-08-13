import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {AUTH, authAction} from '../../reducers/api/auth';
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
import {passwordIconColor} from '../../styles/color';
import {GOOGLE_LOCATION} from '../../api/constants';

const _UserForm = styled(UserForm)`
	height: 650px;
`;

const _UserPasswordContainer = styled(UserPasswordContainer)`
	margin-bottom: 10px;
`;

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 34px 0 30px 0;
`;

const _CheckBoxContainer = styled.div`
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

const _DividingLine = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const _DividingLineMessage = styled.hr`
	width: 158px;
`;

const _AlternativeAuthContainer = styled.div`
	margin: 8px 0px;
	display: flex;
	justify-content: space-between;
`;

const _AlternativeAuthButton = styled.button`
	background: transparent;
	border: none;
	width: fit-content;
	padding: 0px;
`;

const SignInForm = () => {
	const dispatch = useDispatch();
	const {t, i18n} = useTranslation('signInForm');

	const {loading} = useSelector((state) => state[AUTH], shallowEqual);

	const [user, onChangeUser, setUser] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [rememberMe, setRememberMe] = useState(false);
	const userRef = useRef(null);

	const onSubmitSignInForm = useCallback(
		(e) => {
			e.preventDefault();

			localStorage.setItem('rememberMe', rememberMe);
			localStorage.setItem('user', user);
			localStorage.setItem('password', password);

			setUser('');
			setPassword('');

			dispatch(
				authAction.userRequest({
					username: user,
					password: password,
				}),
			);
		},
		[user, password, rememberMe, setUser, setPassword, dispatch],
	);

	const onClickChangePasswordVisibility = useCallback(
		(e) => {
			e.preventDefault();
			setIsPasswordHidden(!isPasswordHidden);
		},
		[isPasswordHidden],
	);

	const onFocusPasswordTextBox = useCallback(() => {
		document.getElementById('password-text-box').classList.add('focus');
	}, []);

	const onBlurPasswordTextBox = useCallback(() => {
		document.getElementById('password-text-box').classList.remove('focus');
	}, []);

	const onClickAlternativeAuth = useCallback(
		(key) => (e) => {
			e.preventDefault();

			switch (key) {
				case 'naver':
					//TODO: Naver Alternative Authentication
					break;
				case 'kakao':
					//TODO: Kakao Alternative Authentication
					break;
				case 'google':
					location.href = GOOGLE_LOCATION;
					break;
				case 'apple':
					//TODO: Apple Alternative Authentication
					break;
				default:
					break;
			}
		},
		[],
	);

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
		//TODO: set language according to user locaion
		i18n.changeLanguage('ko-KR');
	}, [i18n]);

	return !loading ? (
		<_UserForm onSubmit={onSubmitSignInForm}>
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
					required
				/>
			</TextBoxField_>
			<TextBoxField_ marginBottom={'18px'}>
				<_UserPasswordContainer id={'password-text-box'}>
					<UserPasswordInput
						onFocus={onFocusPasswordTextBox}
						onBlur={onBlurPasswordTextBox}
						type={isPasswordHidden ? 'password' : 'text'}
						value={password}
						onChange={onChangePassword}
						placeholder={t('password')}
						required
					/>
					<IconButton
						margin={'0px 0px 0px 12px'}
						color={passwordIconColor}
						onClick={onClickChangePasswordVisibility}
					>
						{isPasswordHidden
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</_UserPasswordContainer>
			</TextBoxField_>
			<_CheckBoxContainer>
				<CheckBox_
					title={t('remember')}
					value={rememberMe}
					handleCheck={onClickRememberMe}
				/>
				<a href={'/password'}>{t('forget')}</a>
			</_CheckBoxContainer>
			<_UserSubmitButton type='submit' onClick={onSubmitSignInForm}>
				{t('signIn')}
			</_UserSubmitButton>
			<_DividingLine>
				<_DividingLineMessage /> {t('or')} <_DividingLineMessage />
			</_DividingLine>
			<_AlternativeAuthContainer>
				<_AlternativeAuthButton
					onClick={onClickAlternativeAuth('kakao')}
				>
					<img src={kakaoButton} alt='kakaoButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton
					onClick={onClickAlternativeAuth('naver')}
				>
					<img src={naverButton} alt='naverButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
			<_AlternativeAuthContainer>
				<_AlternativeAuthButton
					onClick={onClickAlternativeAuth('google')}
				>
					<img src={googleButton} alt='googleButton' />
				</_AlternativeAuthButton>
				<_AlternativeAuthButton
					onClick={onClickAlternativeAuth('apple')}
				>
					<img src={appleButton} alt='appleButton' />
				</_AlternativeAuthButton>
			</_AlternativeAuthContainer>
		</_UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignInForm;
