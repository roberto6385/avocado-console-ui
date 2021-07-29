import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import InputField_ from '../RecycleComponents/inputField_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/default';
import LoadingSpinner from '../loadingSpinner';
import {
	passwordVisibilityIcon,
	passwordVisibilityOffIcon,
} from '../../icons/icons';
import {DefaultIconButton} from '../../styles/icon';

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
	const {t} = useTranslation('signUpForm');

	const {loading} = useSelector((state) => state.userTicket, shallowEqual);
	const {theme} = useSelector((state) => state.common, shallowEqual);

	const [id, onChangeId, setId] = useInput('');
	const [name, onChangeName, setName] = useInput('');
	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [passwordConfirm, onChangePasswordConfirm, setPasswordConfirm] =
		useInput('');
	const [visible, setVisible] = useState(true);
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
		[dispatch],
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

			<InputField_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</InputField_>

			<InputField_ marginBottom={'18px'}>
				<UserInput
					value={name}
					onChange={onChangeName}
					placeholder={t('name')}
				/>
			</InputField_>

			<InputField_ marginBottom={'18px'}>
				<UserInput
					value={email}
					onChange={onChangeEmail}
					placeholder={t('email')}
				/>
			</InputField_>
			<InputField_ marginBottom={'18px'}>
				<UserPasswordContainer id={'password_container'}>
					<_PasswordInput
						onFocus={focusin('password')}
						onBlur={focusout('password')}
						type={visible ? 'password' : 'text'}
						value={password}
						color={password === '' ? '#e5e5e5' : 'black'}
						onChange={onChangePassword}
						placeholder={t('password')}
					/>
					<DefaultIconButton
						theme_value={theme}
						margin={'0px 0px 0px 12px'}
						type='button'
						color={'#757575'}
						onClick={typeChange}
					>
						{visible
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</DefaultIconButton>
				</UserPasswordContainer>
			</InputField_>
			<InputField_ marginBottom={'18px'}>
				<UserPasswordContainer id={'passwordConfirm_container'}>
					<_PasswordInput
						onFocus={focusin('confirm')}
						onBlur={focusout('confirm')}
						type={visible ? 'password' : 'text'}
						value={passwordConfirm}
						color={passwordConfirm === '' ? '#e5e5e5' : 'black'}
						onChange={onChangePasswordConfirm}
						placeholder={t('confirmPassword')}
					/>
				</UserPasswordContainer>
			</InputField_>
			<_PrimaryGreenButton type='submit'>
				{t('signUp')}
			</_PrimaryGreenButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignUpForm;
