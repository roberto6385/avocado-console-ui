import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import {LIGHT_MODE_BORDER_COLOR, IconButton} from '../../styles/global';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/default';

const _PasswordInput = styled(UserInput)`
	padding: 0px;
	height: auto;
	border: none;
`;

const _PrimaryGreenButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const SignUpForm = () => {
	const dispatch = useDispatch();
	const {loading} = useSelector((state) => state.userTicket);
	const {t} = useTranslation('signUpForm');
	const [id, onChangeId, setId] = useInput('');
	const [name, onChangeName, setName] = useInput('');
	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [passwordConfirm, onChangePasswordConfirm, setPasswordConfirm] =
		useInput('');
	const [visible, setVisible] = useState(true);
	const [rememberPassword, setRememberPassword] = useState(false);
	const idRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});
			//TODO: Sign up ACtion

			// 	const encodeData = base64.encode(`${user}:${password}`);
			// 	dispatch({type: SAVE_ENCODE_DATA, data: encodeData});
			// 	dispatch(
			// 		getUserTicket({
			// 			Authorization: 'Basic ' + encodeData,
			// 			username: user,
			// 			password: password,
			// 		}),
			// 	);
		},
		[id, name, email, password, passwordConfirm],
	);

	const typeChange = useCallback(
		(e) => {
			e.preventDefault();
			setVisible(!visible);
		},
		[visible],
	);

	const focusin = useCallback(
		(keyword) => () => {
			if (keyword === 'password') {
				const passwordContainer =
					document.getElementById('password_container');
				passwordContainer.classList.add('focus');
			} else {
				const passwordContainer = document.getElementById(
					'passwordConfirm_container',
				);
				passwordContainer.classList.add('focus');
			}
		},
		[],
	);
	const focusout = useCallback(
		(keyword) => () => {
			if (keyword === 'password') {
				const passwordContainer =
					document.getElementById('password_container');
				passwordContainer.classList.remove('focus');
			} else {
				const passwordContainer = document.getElementById(
					'passwordConfirm_container',
				);
				passwordContainer.classList.remove('focus');
			}
		},
		[],
	);

	useEffect(() => {
		idRef.current?.focus();
	}, [idRef]);

	return !loading ? (
		<UserForm onSubmit={onSubmitForm}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('account')} <a href={'/signin'}> {t('signIn')} </a>
			</UserTitleSpan>

			<InputFiled_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</InputFiled_>

			<InputFiled_ marginBottom={'18px'}>
				<UserInput
					value={name}
					onChange={onChangeName}
					placeholder={t('name')}
				/>
			</InputFiled_>

			<InputFiled_ marginBottom={'18px'}>
				<UserInput
					value={email}
					onChange={onChangeEmail}
					placeholder={t('email')}
				/>
			</InputFiled_>
			<InputFiled_ marginBottom={'18px'}>
				<UserPasswordContainer id={'password_container'}>
					<_PasswordInput
						onFocus={focusin('password')}
						onBlur={focusout('password')}
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
				</UserPasswordContainer>
			</InputFiled_>
			<InputFiled_ marginBottom={'18px'}>
				<UserPasswordContainer id={'passwordConfirm_container'}>
					<_PasswordInput
						onFocus={focusin('confirm')}
						onBlur={focusout('confirm')}
						type={visible ? 'password' : 'text'}
						value={passwordConfirm}
						color={
							passwordConfirm === ''
								? LIGHT_MODE_BORDER_COLOR
								: 'black'
						}
						onChange={onChangePasswordConfirm}
						placeholder={t('confirmPassword')}
					/>
				</UserPasswordContainer>
			</InputFiled_>
			<_PrimaryGreenButton type='submit'>
				{t('signUp')}
			</_PrimaryGreenButton>
		</UserForm>
	) : (
		<div>loading...</div>
	);
};

export default SignUpForm;
