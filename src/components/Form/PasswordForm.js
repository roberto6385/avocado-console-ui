import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {
	AUTH_FORM_SUB_HEIGHT,
	AUTH_FORM_WIDTH,
	AVOCADO_FONTSIZE,
	LIGHT_MODE_BORDER_COLOR,
	DARK_GREEN_COLOR,
	FOLDER_HEIGHT,
	GREEN_COLOR,
	IconButton,
	LOGIN_LOGO_FONTSIZE,
	PrimaryButton,
	SecondaryButtonGreen,
} from '../../styles/global';
import Input_ from '../RecycleComponents/Input_';
import {OPEN_ALERT_POPUP} from '../../reducers/popup';

const _Form = styled.form`
	background: white;
	padding: 70px 61px;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	width: ${AUTH_FORM_WIDTH};
	height: ${AUTH_FORM_SUB_HEIGHT};
	border: solid 1px #d6d6d6;
	caret-color: black;

	.focus {
		border-color: ${DARK_GREEN_COLOR};
		outline: 0 none;
	}
`;

const Item_Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const _Input = styled.input`
	flex: 1;
	height: ${FOLDER_HEIGHT};
	font-size: 14px;
	padding: 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};

	&:focus {
		border-color: ${DARK_GREEN_COLOR};
		outline: 0 none;
	}
`;

const _PasswordContainer = styled.div`
	display: flex;
	align-items: center;
	height: ${FOLDER_HEIGHT};
	font-size: 16px;
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _PasswordInput = styled(_Input)`
	padding: 0px;
	height: auto;
	border: none;
`;

const _Title = styled.span`
	font-family: Roboto;
	font-size: ${LOGIN_LOGO_FONTSIZE};
	font-weight: bold;
	font-stretch: normal;
	font-style: normal;
	margin: 0px 8px 20px 8px;
`;

const _Span = styled.div`
	font-size: ${AVOCADO_FONTSIZE};
	margin: 0px 8px 52px 8px;

	a {
		color: ${DARK_GREEN_COLOR};
		text-decoration: underline;
	}
`;

const _SignInButton = styled(PrimaryButton)`
	height: ${FOLDER_HEIGHT};
	padding: 20px;
	width: 360px;
	background: ${GREEN_COLOR};
	margin: 24px auto 39px;
`;

const _CustomButton = styled(SecondaryButtonGreen)`
	height: ${FOLDER_HEIGHT};
	margin: 0px 8px 18px;
`;

const PasswordForm = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('passwordForm');
	const [id, onChangeId] = useInput('');
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('');
	const [passwordConfirm, onChangePasswordConfirm] = useInput('');
	const [visible, setVisible] = useState(true);
	const {loading} = useSelector((state) => state.userTicket);
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
				const passwordContainer = document.getElementById(
					'password_container',
				);
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
				const passwordContainer = document.getElementById(
					'password_container',
				);
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
		<_Form onSubmit={onSubmitForm}>
			<_Title>{t('title')}</_Title>
			<_Span>
				{t('remember')}
				<a href={'/signin'}> {t('signIn')} </a>
			</_Span>

			<Input_>
				<_Input
					ref={idRef}
					value={id}
					color={id === '' ? LIGHT_MODE_BORDER_COLOR : 'black'}
					onChange={onChangeId}
					placeholder={t('id')}
				/>
			</Input_>
			<Item_Container>
				<Input_ flex={1}>
					<span>{t('auth')}</span>
					{/*<span>등록한 메일로 인증번호가 전송됩니다.</span>*/}
				</Input_>

				<_CustomButton onClick={sendAuth}>{t('send')}</_CustomButton>
			</Item_Container>
			<Item_Container>
				<Input_ flex={1}>
					<_Input
						type='email'
						value={email}
						color={email === '' ? LIGHT_MODE_BORDER_COLOR : 'black'}
						onChange={onChangeEmail}
						placeholder={t('authInput')}
					/>
				</Input_>
				<_CustomButton onClick={checkAuth}>{t('check')}</_CustomButton>
			</Item_Container>
			<Input_>
				<_PasswordContainer id={'password_container'}>
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
				</_PasswordContainer>
			</Input_>
			<Input_>
				<_PasswordContainer id={'passwordConfirm_container'}>
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
				</_PasswordContainer>
			</Input_>
			<_SignInButton type='submit'>{t('changePassword')}</_SignInButton>
		</_Form>
	) : (
		<div>loading...</div>
	);
};

export default PasswordForm;
