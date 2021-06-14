import React, {useRef, useState} from 'react';
import styled from 'styled-components';

import Input_ from '../RecycleComponents/Input_';
import Radio_ from '../RecycleComponents/Radio_';
import Select_ from '../RecycleComponents/Select_';
import {DefaultButton, PrimaryButton} from '../../styles/global';
import ChangePasswordForm from '../Form/ChangePasswordForm';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {HEIGHT_34, HEIGHT_50, WIDTH_160, WIDTH_500} from '../../styles/length';
import {
	borderColor,
	fontColor,
	mainBackColor,
	settingInput,
} from '../../styles/color';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
	overflow: scroll;
`;

const _Title = styled.div`
	margin: 0px 16px;
	display: flex;
	align-items: center;
	height: ${HEIGHT_50};
	min-height: ${HEIGHT_50};
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
`;

const _ContentsContainer = styled.div`
	padding: 15px 0px;
	margin: 0px 8px;
	font-size: 14px;
`;

const _Input = styled.input`
	width: ${(props) => props?.width || WIDTH_500};
	height: ${HEIGHT_34};
	padding: 0px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _PrimaryButton = styled(PrimaryButton)`
	margin-top: 8px;
	width: ${WIDTH_160};
	min-width: ${WIDTH_160};
`;
const _DisabledButton = styled(DefaultButton)`
	margin-top: 8px;
	width: ${WIDTH_160};
	min-width: ${WIDTH_160};
`;

const _Section = styled.section`
	display: flex;
	align-items: center;
	position: relative;
`;

const AccountSpace = () => {
	const {t} = useTranslation('accountSpace');
	const {theme, account} = useSelector((state) => state.common);

	console.log(account);

	const [open, setOpen] = useState(false);
	const [authType, setAuthType] = useState('first_option');
	const [mfaType, setMfaType] = useState('use');
	const [authValue, setAuthValue] = useState('google');
	const [mfaValue, setMfaValue] = useState('otp');

	const {current: authOptions} = useRef([
		{value: 'first_option', label: t('idPassword')},
		{value: 'second_option', label: t('alternative')},
	]);
	const {current: mfaOptions} = useRef([
		{value: 'use', label: t('use')},
		{value: 'not_use', label: t('notUse')},
	]);
	const {current: AlternativeAuthOptions} = useRef([
		{value: 'google', label: t('google')},
		{value: 'kakao', label: t('kakao')},
		{value: 'naver', label: t('naver')},
	]);

	const {current: MFAOptions} = useRef([
		{value: 'otp', label: t('otp')},
		{value: 'mail', label: t('mail')},
		{value: 'sms', label: t('sms')},
		{value: 'finger_print', label: t('fingerPrint')},
		{value: 'face_id', label: t('faceId')},
	]);

	return (
		<_Container back={mainBackColor[theme]} color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>{t('title.account')}</_Title>
			<_ContentsContainer>
				<Input_ title={t('account')}>
					<_Input
						back={settingInput[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
						value={account.account}
						placeholder={t('accountPlace')}
						readOnly
					/>
				</Input_>
				<Input_ title={t('name')}>
					<_Input
						back={settingInput[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
						value={account.name}
						placeholder={t('namePlace')}
						readOnly
					/>
				</Input_>
				<Input_ title={t('email')}>
					<_Input
						back={settingInput[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
						value={account.email}
						placeholder={t('emailPlace')}
						readOnly
					/>
				</Input_>
			</_ContentsContainer>
			<_Title b_color={borderColor[theme]}>{t('title.auth')}</_Title>
			<_ContentsContainer>
				<_Section>
					<Select_
						back={settingInput[theme]}
						color={fontColor[theme]}
						b_color={borderColor[theme]}
						title={t('auth')}
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={WIDTH_500}
					/>
					{authType === 'first_option' ? (
						<_PrimaryButton
							onClick={() => setOpen(true)}
							// disabled
						>
							{t('changePassword')}
						</_PrimaryButton>
					) : (
						<_DisabledButton onClick={() => setOpen(true)} disabled>
							{t('changePassword')}
						</_DisabledButton>
					)}
				</_Section>

				<Radio_
					radioName={'AlternativeAuth'}
					options={AlternativeAuthOptions}
					value={authValue}
					setValue={setAuthValue}
					disabled={authType === 'first_option'}
				/>
			</_ContentsContainer>
			<_ContentsContainer>
				<Select_
					back={settingInput[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					title={t('mfa')}
					options={mfaOptions}
					value={mfaType}
					setValue={setMfaType}
					width={WIDTH_500}
				/>
				<Radio_
					radioName={'MFA'}
					options={MFAOptions}
					value={mfaValue}
					setValue={setMfaValue}
					disabled={mfaType === 'not_use'}
				/>
			</_ContentsContainer>
			<ChangePasswordForm open={open} setOpen={setOpen} />
		</_Container>
	);
};

export default AccountSpace;
