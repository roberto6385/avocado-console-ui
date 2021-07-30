import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import TextBox_ from '../RecycleComponents/TextBox_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {SecondaryGreenButton} from '../../styles/components/button';
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

const Item_Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 18px;

`;

const _UserSubmitButton = styled(UserSubmitButton)`
	margin: 24px 0 0 0;
`;

const _SecondaryGreenButton = styled(SecondaryGreenButton)`
	height: 40px;
	border-radius: 4px;
	width: 120px;
	margin-right: 0px;
	margin-left: 16px;
`;

const PasswordForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('passwordForm');

	const {loading} = useSelector((state) => state.userTicket);

	const [id, onChangeId] = useInput('');
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [confirmPassword, onChangeConfirmPassword] = useInput('');
	const [hidePassword, setHidePassword] = useState(true);
	const idRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			//TODO: Change Password Action

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

	const sendAuth = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			console.log('some action!');
		},
		[dispatch],
	);
	const checkAuth = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			console.log('some action!');
		},
		[dispatch],
	);

	const typeChange = useCallback(
		(e) => {
			e.preventDefault();
			setHidePassword(!hidePassword);
		},
		[hidePassword],
	);

	const focusin = useCallback(
		(keyword) => () => {
			if (keyword === 'password') {
				const passwordContainer =
					document.getElementById('password_container');
				passwordContainer.classList.add('focus');
			} else {
				const passwordContainer = document.getElementById(
					'confirmPassword_container',
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
					'confirmPassword_container',
				);
				passwordContainer.classList.remove('focus');
			}
		},
		[],
	);

	useEffect(() => {
		idRef.current?.focus();
	}, []);

	return !loading ? (
		<UserForm onSubmit={onSubmitForm}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('remember')}
				<a href={'/signin'}> {t('signIn')} </a>
			</UserTitleSpan>

			<TextBox_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</TextBox_>

			<Item_Container>
				<span>{t('auth')}</span>
				<_SecondaryGreenButton onClick={sendAuth}>
					{t('send')}
				</_SecondaryGreenButton>
			</Item_Container>

			<Item_Container>
				<TextBox_ flex={1} marginBottom={'0px'}>
					<UserInput
						type='email'
						value={email}
						onChange={onChangeEmail}
						placeholder={t('authInput')}
					/>
				</TextBox_>
				<_SecondaryGreenButton onClick={checkAuth}>
					{t('check')}
				</_SecondaryGreenButton>
			</Item_Container>

			<TextBox_ marginBottom={'18px'}>
				<UserPasswordContainer id={'password_container'}>
					<UserPasswordInput
						onFocus={focusin('password')}
						onBlur={focusout('password')}
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
				</UserPasswordContainer>
			</TextBox_>
			<TextBox_ marginBottom={'18px'}>
				<UserPasswordContainer id={'confirmPassword_container'}>
					<UserPasswordInput
						onFocus={focusin('confirm')}
						onBlur={focusout('confirm')}
						type={hidePassword ? 'password' : 'text'}
						value={confirmPassword}
						onChange={onChangeConfirmPassword}
						placeholder={t('confirmPassword')}
					/>
				</UserPasswordContainer>
			</TextBox_>
			<_UserSubmitButton type='submit'>
				{t('changePassword')}
			</_UserSubmitButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default PasswordForm;
