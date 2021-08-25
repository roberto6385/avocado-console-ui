import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import TextBoxField from '../RecycleComponents/TextBoxField';
import {NormalBorderButton} from '../../styles/components/button';
import LoadingSpinner from '../LoadingSpinner';
import {
	cancelFillIcon,
	passwordVisibilityIcon,
	passwordVisibilityOffIcon,
} from '../../icons/icons';
import {IconButton} from '../../styles/components/icon';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserPasswordFeedbackMessage,
	UserPasswordInput,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
	UserPasswordConfirmWarning,
} from '../../styles/components/siginIn';
import {passwordIconColor} from '../../styles/color';
import {authSelector} from '../../reducers/api/auth';
import {dialogBoxAction} from '../../reducers/dialogBoxs';

/*****************************************************/
//  roberto - siginForm_update
//
/*****************************************************/
import {passwordMatch, passwordWarning} from '../../utils/Forms';
/*****************************************************/

const _ItemContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 18px;
`;

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const _NormalBorderButton = styled(NormalBorderButton)`
	height: 40px;
	border-radius: 4px;
	width: 120px;
	margin-right: 0px;
	margin-left: 16px;
`;

const FindPasswordForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('findPasswordForm');

	const {loading} = useSelector(authSelector.all);

	const [id, onChangeId] = useInput('');
	const [certificationNumber, onChangeCertificationNumber] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword] = useInput('');
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

	const idRef = useRef(null);

	const onSubmitFindPassword = useCallback(
		(e) => {
			e.preventDefault();
			if (!doesPasswordMatch()) {
				renderFeedbackMessage();
				confirmPasswordWarning();
			} else {
				dispatch(dialogBoxAction.openAlert({key: 'developing'}));
				//TODO: Change Password Action
			}
		},
		[dispatch, certificationNumber, id, password, confirmPassword],
	);

	const doesPasswordMatch = useCallback(() =>
		passwordMatch(password, confirmPassword),
	);

	const renderFeedbackMessage = useCallback(() => {
		if (confirmPassword) {
			if (!doesPasswordMatch()) {
				setConfirmPasswordMessage(t('confirmPasswordMessage'));
			}
		}
	});

	const confirmPasswordWarning = useCallback(() =>
		passwordWarning(
			confirmPassword,
			confirmPasswordMessage,
			doesPasswordMatch,
		),
	);

	const onClickSendVerificationCode = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(dialogBoxAction.openAlert({key: 'developing'}));
			//TODO: Send Verification Code Action
		},
		[dispatch],
	);

	const onClickConfirmVerificationCode = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(dialogBoxAction.openAlert({key: 'developing'}));
			//TODO: Confirm Verification Code Action
		},
		[dispatch],
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
		<UserForm onSubmit={onSubmitFindPassword}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('remember')}
				<a href={'/signin'}> {t('signIn')} </a>
			</UserTitleSpan>

			<TextBoxField marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</TextBoxField>

			<_ItemContainer>
				<span>{t('auth')}</span>
				<_NormalBorderButton onClick={onClickSendVerificationCode}>
					{t('send')}
				</_NormalBorderButton>
			</_ItemContainer>

			<_ItemContainer>
				<TextBoxField flex={1} marginBottom={'0px'}>
					<UserInput
						type='text'
						value={certificationNumber}
						onChange={onChangeCertificationNumber}
						placeholder={t('authInput')}
						required
					/>
				</TextBoxField>
				<_NormalBorderButton onClick={onClickConfirmVerificationCode}>
					{t('check')}
				</_NormalBorderButton>
			</_ItemContainer>

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
						color={passwordIconColor}
						onClick={onClickChangePasswordVisibility}
					>
						{isPasswordHidden
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</UserPasswordContainer>
			</TextBoxField>

			<_ItemContainer>
				<TextBoxField flex={1} marginBottom={'0px'}>
					<UserPasswordConfirmWarning>
						<UserPasswordContainer
							className={`${confirmPasswordWarning()}`}
						>
							<UserPasswordInput
								type={isPasswordHidden ? 'password' : 'text'}
								value={confirmPassword}
								onChange={onChangeConfirmPassword}
								placeholder={t('confirmPassword')}
								required
							/>
							{confirmPasswordWarning() ? (
								<IconButton
									margin={'0px 0px 0px 12px'}
									itype={'warning'}
								>
									{cancelFillIcon}
								</IconButton>
							) : (
								''
							)}
						</UserPasswordContainer>
					</UserPasswordConfirmWarning>
				</TextBoxField>
			</_ItemContainer>
			<UserPasswordFeedbackMessage>
				{confirmPasswordWarning() ? confirmPasswordMessage : ''}
			</UserPasswordFeedbackMessage>
			<_UserSubmitButton type='submit'>
				{t('changePassword')}
			</_UserSubmitButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default FindPasswordForm;
