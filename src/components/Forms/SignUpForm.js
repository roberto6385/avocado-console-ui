import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import useInput from '../../hooks/useInput';
import TextBoxField from '../RecycleComponents/TextBoxField';
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
import {authSelector} from '../../reducers/api/auth';

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const SignUpForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('signUpForm');

	const {loading} = useSelector(authSelector.all);

	const [id, onChangeId, setId] = useInput('');
	const [name, onChangeName, setName] = useInput('');
	const [email, onChangeEmail, setEmail] = useInput('');
	const [password, onChangePassword, setPassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword, setConfirmPassword] =
		useInput('');
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);

	const idRef = useRef(null);

	const onSubmitSignUp = useCallback(
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

	/*****************************************************/
	//  roberto - siginForm_update
	//
	/*****************************************************/

	const doesPasswordMatch = useCallback(() => {
		return password === confirmPassword;
	});

	const renderFeedbackMessage = useCallback(() => {
		if (confirmPassword) {
			if (!doesPasswordMatch()) {
				return <div>패스워드가 일치하지 않습니다</div>;
			}
		}
	});

	/*****************************************************/

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
		<UserForm onSubmit={onSubmitSignUp}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('account')} <a href={'/signin'}> {t('signIn')} </a>
			</UserTitleSpan>

			<TextBoxField marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
					required
				/>
			</TextBoxField>

			<TextBoxField marginBottom={'18px'}>
				<UserInput
					value={name}
					onChange={onChangeName}
					placeholder={t('name')}
					required
				/>
			</TextBoxField>

			<TextBoxField marginBottom={'18px'}>
				<UserInput
					value={email}
					type={'email'}
					onChange={onChangeEmail}
					placeholder={t('email')}
					required
				/>
			</TextBoxField>
			<TextBoxField marginBottom={'18px'}>
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
			</TextBoxField>

			<TextBoxField flex={1} marginBottom={'18px'}>
				<UserInput
					type={isPasswordHidden ? 'password' : 'text'}
					value={confirmPassword}
					onChange={onChangeConfirmPassword}
					placeholder={t('confirmPassword')}
					required
				/>
			</TextBoxField>

			<_UserSubmitButton type='submit'>{t('signUp')}</_UserSubmitButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default SignUpForm;
