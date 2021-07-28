import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import InputField_ from '../../RecycleComponents/inputField_';
import Radio_ from '../../RecycleComponents/Radio_';
import Select_ from '../../RecycleComponents/Select_';
import {
	Input,
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/default';
import ChangePasswordForm from '../../Form/ChangePasswordForm';
import {
	PrimaryDisabledButton,
	PrimaryGreenButton,
} from '../../../styles/button';
import ChangeNameForm from '../../Form/NameForm';

const _Input = styled(Input)`
	width: 500px;
`;

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	margin-top: 7px;
	width: 160px;
`;
const _PrimaryDisabledButton = styled(PrimaryDisabledButton)`
	margin-top: 7px;
	width: 160px;
`;

const _Section = styled.section`
	display: flex;
	align-items: center;
	position: relative;
`;

const AccountSpace = () => {
	const {t} = useTranslation('accountSpace');
	const {theme, account} = useSelector((state) => state.common, shallowEqual);

	const [open, setOpen] = useState(false);
	const [nameOpen, setNameOpen] = useState(false);
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
		<SettingMainContainer theme_value={theme}>
			<SettingTitle theme_value={theme}>
				{t('title.account')}
			</SettingTitle>
			<SettingContentsContainer>
				<InputField_ title={t('account')}>
					<_Input
						theme_value={theme}
						value={account.account}
						placeholder={t('accountPlace')}
						readOnly
					/>
				</InputField_>
				<InputField_ title={t('name')}>
					<_Input
						value={account.name}
						theme_value={theme}
						placeholder={t('namePlace')}
						readOnly
						onClick={() => setNameOpen(true)}
					/>
				</InputField_>
				<InputField_ title={t('email')}>
					<_Input
						value={account.email}
						theme_value={theme}
						placeholder={t('emailPlace')}
						readOnly
					/>
				</InputField_>
			</SettingContentsContainer>
			<SettingTitle theme_value={theme}>{t('title.auth')}</SettingTitle>
			<SettingContentsContainer>
				<_Section>
					<Select_
						title={t('auth')}
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={'500px'}
					/>
					{authType === 'first_option' ? (
						<_PrimaryGreenButton
							theme_value={theme}
							onClick={() => setOpen(true)}
							// disabled
						>
							{t('changePassword')}
						</_PrimaryGreenButton>
					) : (
						<_PrimaryDisabledButton disabled>
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
					width={'500px'}
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
			<ChangeNameForm open={nameOpen} setOpen={setNameOpen} />
		</SettingMainContainer>
	);
};

export default AccountSpace;
