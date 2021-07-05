import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

import useInput from '../../hooks/useInput';
import {useTranslation} from 'react-i18next';
import InputFiled_ from '../RecycleComponents/InputFiled_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';
import {SecondaryGreenButton, IconButton} from '../../styles/button';
import {
	UserForm,
	UserInput,
	UserPasswordContainer,
	UserPasswordInput,
	UserSubmitButton,
	UserTitle,
	UserTitleSpan,
} from '../../styles/default';
import LoadingSpinner from '../loadingSpinner';
import {
	passwordVisibilityIcon,
	passwordVisibilityOffIcon,
} from '../../icons/icons';

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
	const {loading} = useSelector((state) => state.userTicket);
	const {t} = useTranslation('passwordForm');
	const [id, onChangeId] = useInput('');
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordConfirm, onChangePasswordConfirm] = useInput('');
	const [visible, setVisible] = useState(true);
	const idRef = useRef(null);

	const onSubmitForm = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: OPEN_ALERT_POPUP,
				data: 'developing',
			});

			//TODO: Chnage Password Action

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
		[id, email, password, passwordConfirm],
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
	}, []);

	return !loading ? (
		<UserForm onSubmit={onSubmitForm}>
			<UserTitle>{t('title')}</UserTitle>
			<UserTitleSpan>
				{t('remember')}
				<a href={'/signin'}> {t('signIn')} </a>
			</UserTitleSpan>

			<InputFiled_ marginBottom={'18px'}>
				<UserInput
					ref={idRef}
					value={id}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</InputFiled_>

			<Item_Container>
				<span>{t('auth')}</span>
				<_SecondaryGreenButton onClick={sendAuth}>
					{t('send')}
				</_SecondaryGreenButton>
			</Item_Container>

			<Item_Container>
				<InputFiled_ flex={1} marginBottom={'0px'}>
					<UserInput
						type='email'
						value={email}
						onChange={onChangeEmail}
						placeholder={t('authInput')}
					/>
				</InputFiled_>
				<_SecondaryGreenButton onClick={checkAuth}>
					{t('check')}
				</_SecondaryGreenButton>
			</Item_Container>

			<InputFiled_ marginBottom={'18px'}>
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
						color={'#757575'}
						onClick={typeChange}
					>
						{visible
							? passwordVisibilityIcon
							: passwordVisibilityOffIcon}
					</IconButton>
				</UserPasswordContainer>
			</InputFiled_>
			<InputFiled_ marginBottom={'18px'}>
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
			</InputFiled_>
			<_UserSubmitButton type='submit'>
				{t('changePassword')}
			</_UserSubmitButton>
		</UserForm>
	) : (
		<LoadingSpinner />
	);
};

export default PasswordForm;
