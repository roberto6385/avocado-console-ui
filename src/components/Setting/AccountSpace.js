import React, {useRef, useState} from 'react';
import styled from 'styled-components';

import InputFiled_ from '../RecycleComponents/InputFiled_';
import Radio_ from '../RecycleComponents/Radio_';
import Select_ from '../RecycleComponents/Select_';

import {
	Input,
	PrimaryDisabledButton,
	PrimaryGreenButton,
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../styles/default';

import ChangePasswordForm from '../Form/ChangePasswordForm';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {WIDTH_160, WIDTH_500} from '../../styles/length';

const _Input = styled(Input)`
	width: 500px;
`;

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	margin-top: 7px;
	width: ${WIDTH_160};
	min-width: ${WIDTH_160};
`;
const _PrimaryDisabledButton = styled(PrimaryDisabledButton)`
	margin-top: 7px;
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
		<SettingMainContainer themeValue={theme}>
			<SettingTitle themeValue={theme}>{t('title.account')}</SettingTitle>
			<SettingContentsContainer>
				<InputFiled_ title={t('account')}>
					<_Input
						themeValue={theme}
						value={account.account}
						placeholder={t('accountPlace')}
						readOnly
					/>
				</InputFiled_>
				<InputFiled_ title={t('name')}>
					<_Input
						value={account.name}
						themeValue={theme}
						placeholder={t('namePlace')}
						readOnly
					/>
				</InputFiled_>
				<InputFiled_ title={t('email')}>
					<_Input
						value={account.email}
						themeValue={theme}
						placeholder={t('emailPlace')}
						readOnly
					/>
				</InputFiled_>
			</SettingContentsContainer>
			<SettingTitle themeValue={theme}>{t('title.auth')}</SettingTitle>
			<SettingContentsContainer>
				<_Section>
					<Select_
						title={t('auth')}
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={WIDTH_500}
					/>
					{authType === 'first_option' ? (
						<_PrimaryGreenButton
							themeValue={theme}
							onClick={() => setOpen(true)}
							// disabled
						>
							{t('changePassword')}
						</_PrimaryGreenButton>
					) : (
						<_PrimaryDisabledButton
							onClick={() => setOpen(true)}
							disabled
						>
							{t('changePassword')}
						</_PrimaryDisabledButton>
					)}
				</_Section>

				<Radio_
					radioName={'AlternativeAuth'}
					options={AlternativeAuthOptions}
					value={authValue}
					setValue={setAuthValue}
					disabled={authType === 'first_option'}
				/>
			</SettingContentsContainer>
			<SettingContentsContainer>
				<Select_
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
			</SettingContentsContainer>
			<ChangePasswordForm open={open} setOpen={setOpen} />
		</SettingMainContainer>
	);
};

export default AccountSpace;
