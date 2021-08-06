import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {shallowEqual, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import Radio_ from '../../RecycleComponents/Radio_';
import ComboBox_ from '../../RecycleComponents/ComboBox_';
import ChangePasswordDialogBox from '../../DialogBoxs/ChangePasswordDialogBox';
import {DisabledButton, NormalButton} from '../../../styles/components/button';
import ChangeUserNameDialogBox from '../../DialogBoxs/ChangeUserNameDialogBox';
import {
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/components/settingPage';
import {Input} from '../../../styles/components/input';

const _Input = styled(Input)`
	width: 500px;
`;

const _PrimaryGreenButton = styled(NormalButton)`
	margin-top: 7px;
	width: 160px;
`;
const _PrimaryDisabledButton = styled(DisabledButton)`
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
	const {account} = useSelector((state) => state.common, shallowEqual);

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
		<SettingMainContainer>
			<SettingTitle>{t('title.account')}</SettingTitle>
			<SettingContentsContainer>
				<TextBoxField_ title={t('account')}>
					<_Input
						value={account.account}
						placeholder={t('accountPlace')}
						readOnly
					/>
				</TextBoxField_>
				<TextBoxField_ title={t('name')}>
					<_Input
						value={account.name}
						placeholder={t('namePlace')}
						readOnly
						onClick={() => setNameOpen(true)}
					/>
				</TextBoxField_>
				<TextBoxField_ title={t('email')}>
					<_Input
						value={account.email}
						placeholder={t('emailPlace')}
						readOnly
					/>
				</TextBoxField_>
			</SettingContentsContainer>
			<SettingTitle>{t('title.auth')}</SettingTitle>
			<SettingContentsContainer>
				<_Section>
					<ComboBox_
						title={t('auth')}
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={'500px'}
					/>
					{authType === 'first_option' ? (
						<_PrimaryGreenButton
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
				<ComboBox_
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
			<ChangePasswordDialogBox open={open} setOpen={setOpen} />
			<ChangeUserNameDialogBox open={nameOpen} setOpen={setNameOpen} />
		</SettingMainContainer>
	);
};

export default AccountSpace;
