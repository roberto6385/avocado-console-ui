import React, {useCallback, useEffect, useRef, useState} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import TextBoxField_ from '../RecycleComponents/TextBoxField_';
import LoadingSpinner from '../LoadingSpinner';
import {
	passwordVisibilityIcon,
	passwordVisibilityOffIcon,
} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import {userAction} from '../../reducers/auth/user';
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

const _PrimaryGreenButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const SignUpForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('signUpForm');

	const {loading} = useSelector((state) => state.userTicket, shallowEqual);

	const [id, onChangeId, setId] = useInput('test');
	const [name, onChangeName, setName] = useInput('테스트');
	const [email, onChangeEmail, setEmail] = useInput('hello@netand.co.kr');
	const [password, onChangePassword, setPassword] = useInput('123456789');
	const [passwordConfirm, onChangePasswordConfirm, setPasswordConfirm] =
		useInput('123456789');
	const [visible, setVisible] = useState(true);
	const idRef = useRef(null);

	function isEmail(asValue) {
		const pattern =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		return pattern.test(asValue);
	}

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();
			console.log(id, name, email, password, passwordConfirm);
			if (
				id === '' ||
				name === '' ||
				email === '' ||
				password === '' ||
				passwordConfirm === ''
			) {
				console.log('입력하지 않은 값이 있습니다.');
			} else {
				if (!isEmail(email)) {
					console.log('올바른 이메일 형식이 아닙니다.');
				} else if (password !== passwordConfirm) {
					console.log('비밀번호가 서로 다릅니다.');
				} else {
					dispatch(
						userAction.createRequest({id, name, email, password}),
					);
				}
			}
		},
		[dispatch, email, id, name, password, passwordConfirm],
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

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</TextBoxField_>

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					value={name}
					onChange={onChangeName}
					placeholder={t('name')}
				/>
			</TextBoxField_>

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					value={email}
					onChange={onChangeEmail}
					placeholder={t('email')}
				/>
			</TextBoxField_>
			<TextBoxField_ marginBottom={'18px'}>
				<UserPasswordContainer id={'password_container'}>
					<UserPasswordInput
						onFocus={focusin('password')}
						onBlur={focusout('password')}
						type={visible ? 'password' : 'text'}
						value={password}
						onChange={onChangePassword}
						placeholder={t('password')}
					/>
					<IconButton
						margin={'0px 0px 0px 12px'}
						type='button'
						color={passwordIconColor}
						onClick={typeChange}
					>
						{visible
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</UserPasswordContainer>
			</TextBoxField_>
			<TextBoxField_ marginBottom={'18px'}>
				<UserPasswordContainer id={'passwordConfirm_container'}>
					<UserPasswordInput
						onFocus={focusin('confirm')}
						onBlur={focusout('confirm')}
						type={visible ? 'password' : 'text'}
						value={passwordConfirm}
						onChange={onChangePasswordConfirm}
						placeholder={t('confirmPassword')}
					/>
				</UserPasswordContainer>
			</TextBoxField_>
			<_PrimaryGreenButton type='submit'>
				{t('signUp')}
			</_PrimaryGreenButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignUpForm;
