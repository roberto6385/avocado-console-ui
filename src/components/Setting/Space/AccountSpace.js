import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TextBoxField from '../../RecycleComponents/TextBoxField';
import Radio from '../../RecycleComponents/Radio';
import ComboBox from '../../RecycleComponents/ComboBox';
import ChangePasswordDialogBox from '../../DialogBoxs/Form/ChangePasswordDialogBox';
import {DisabledButton, NormalButton} from '../../../styles/components/button';
import {
	SettingContentContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/components/settingPage';
import {TextBox} from '../../../styles/components/textBox';
import {dialogBoxAction} from '../../../reducers/dialogBoxs';
import {userResourceSelector} from '../../../reducers/api/userResource';

const _TextBox = styled(TextBox)`
	width: 500px;
`;

const _NormalButton = styled(NormalButton)`
	margin-top: 7px;
	width: 160px;
`;
const _DisabledButton = styled(DisabledButton)`
	margin-top: 7px;
	width: 160px;
`;

const _Section = styled.section`
	display: flex;
	align-items: center;
	position: relative;
`;

const AccountSpace = () => {
	const {t} = useTranslation('account');
	const dispatch = useDispatch();

	const {data} = useSelector(userResourceSelector.all);

	const [authType, setAuthType] = useState('id-password');
	const [alternativeAuth, setAlternativeAuth] = useState('google');
	const [isMFAUsed, setIsMFAUsed] = useState('mfa-used');
	const [MFA, setMFA] = useState('otp');

	const {current: authOptions} = useRef([
		{value: 'id-password', label: t('idPassword')},
		{value: 'alternative', label: t('alternative')},
	]);
	const {current: alternativeAuthOptions} = useRef([
		{value: 'google', label: t('google')},
		{value: 'kakao', label: t('kakao')},
		{value: 'naver', label: t('naver')},
	]);

	const {current: useMFAOptions} = useRef([
		{value: 'mfa-used', label: t('mfaUse')},
		{value: 'mfa-not-used', label: t('mfaNotUse')},
	]);
	const {current: MFAOptions} = useRef([
		{value: 'otp', label: t('otp')},
		{value: 'mail', label: t('mail')},
		{value: 'sms', label: t('sms')},
		{value: 'finger-print', label: t('fingerPrint')},
		{value: 'face-id', label: t('faceId')},
	]);

	return (
		<SettingMainContainer>
			<SettingTitle>{t('title.account')}</SettingTitle>
			<SettingContentContainer>
				<TextBoxField title={t('account')}>
					<_TextBox
						value={data.id}
						placeholder={t('placeHolder.account')}
						readOnly
					/>
				</TextBoxField>
				<TextBoxField title={t('name')}>
					<_TextBox
						value={data.name}
						placeholder={t('placeholder.name')}
						readOnly
						onClick={() =>
							dispatch(
								dialogBoxAction.openForm({key: 'userName'}),
							)
						}
					/>
				</TextBoxField>
				<TextBoxField title={t('email')}>
					<_TextBox
						value={data.email}
						placeholder={t('placeholder.email')}
						readOnly
					/>
				</TextBoxField>
			</SettingContentContainer>
			<SettingTitle>{t('title.auth')}</SettingTitle>
			<SettingContentContainer>
				<_Section>
					<ComboBox
						title={t('auth')}
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={'500px'}
					/>
					{authType === 'id-password' ? (
						<_NormalButton
							onClick={() =>
								dispatch(
									dialogBoxAction.openForm({key: 'password'}),
								)
							}
							// disabled
						>
							{t('changePassword')}
						</_NormalButton>
					) : (
						<_DisabledButton disabled>
							{t('changePassword')}
						</_DisabledButton>
					)}
				</_Section>

				<Radio
					options={alternativeAuthOptions}
					value={alternativeAuth}
					setValue={setAlternativeAuth}
					disabled={authType === 'id-password'}
				/>
			</SettingContentContainer>
			<SettingContentContainer>
				<ComboBox
					title={t('mfa')}
					options={useMFAOptions}
					value={isMFAUsed}
					setValue={setIsMFAUsed}
					width={'500px'}
				/>
				<Radio
					options={MFAOptions}
					value={MFA}
					setValue={setMFA}
					disabled={isMFAUsed === 'mfa-not-used'}
				/>
			</SettingContentContainer>
			<ChangePasswordDialogBox />
		</SettingMainContainer>
	);
};

export default AccountSpace;
