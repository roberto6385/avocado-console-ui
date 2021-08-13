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
import {userResourceAction} from '../../reducers/api/userResource';
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
import {AUTH} from '../../reducers/api/auth';

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const SignUpForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('signUpForm');

	const {loading} = useSelector((state) => state[AUTH], shallowEqual);

	const [id, onChangeId, setId] = useInput('');
	const [name, onChangeName, setName] = useInput('');
	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] =
		useInput('');
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	const idRef = useRef(null);

	const onSubmitSignUpForm = useCallback(
		(e) => {
			e.preventDefault();

			if (password !== confirmPassword) {
				//TODO: Show password !== confirmPassword Message
			} else {
				dispatch(
					userResourceAction.createRequest({
						id,
						name,
						email,
						password,
					}),
				);
			}
		},
		[dispatch, email, id, name, password, confirmPassword],
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

	useEffect(() => {
		idRef.current?.focus();
	}, [idRef]);

	return !loading ? (
		<UserForm onSubmit={onSubmitSignUpForm}>
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
					required
				/>
			</TextBoxField_>

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					value={name}
					onChange={onChangeName}
					placeholder={t('name')}
					required
				/>
			</TextBoxField_>

			<TextBoxField_ marginBottom={'18px'}>
				<UserInput
					value={email}
					type={'email'}
					onChange={onChangeEmail}
					placeholder={t('email')}
					required
				/>
			</TextBoxField_>
			<TextBoxField_ marginBottom={'18px'}>
				<UserPasswordContainer id={'password-text-box'}>
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
						type='button'
						color={passwordIconColor}
						onClick={onClickChangePasswordVisibility}
					>
						{isPasswordHidden
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</UserPasswordContainer>
			</TextBoxField_>

			<TextBoxField_ flex={1} marginBottom={'18px'}>
				<UserInput
					type={isPasswordHidden ? 'password' : 'text'}
					value={confirmPassword}
					onChange={onChangeConfirmPassword}
					placeholder={t('confirmPassword')}
					required
				/>
			</TextBoxField_>

			<_UserSubmitButton type='submit'>{t('signUp')}</_UserSubmitButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignUpForm;
