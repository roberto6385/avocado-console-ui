import React, {useState} from 'react';
import styled from 'styled-components';

import Input_ from '../RecycleComponents/Input_';
import Radio_ from '../RecycleComponents/Radio_';
import Select_ from '../RecycleComponents/Select_';
import {
	ACCOUNT_INPUT_WIDTH,
	LIGHT_MODE_BORDER_COLOR,
	DefaultButton,
	LIGHT_MODE_BACKGROUND_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
	PrimaryButton,
	SUB_HEIGHT,
	TAB_WIDTH,
} from '../../styles/global';
import ChangePasswordForm from '../Form/ChangePasswordForm';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${LIGHT_MODE_BACKGROUND_COLOR};
	overflow: scroll;
`;

const _Title = styled.div`
	margin: 0px 16px;
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	min-height: ${SUB_HEIGHT};
	border-bottom: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const _ContentsContainer = styled.div`
	padding: 15px 0px;
	margin: 0px 8px;
	font-size: 14px;
`;

const _Input = styled.input`
	width: ${(props) => props?.width || ACCOUNT_INPUT_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 0px 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _PrimaryButton = styled(PrimaryButton)`
	margin-top: 8px;
	width: ${TAB_WIDTH};
`;
const _DisabledButton = styled(DefaultButton)`
	margin-top: 8px;
	width: ${TAB_WIDTH};
`;

const _Section = styled.section`
	display: flex;
	align-items: center;
	position: relative;
`;

const authOptions = [
	{value: 'first_option', label: 'ID / Password'},
	{value: 'second_option', label: 'AlternativeAuthN (대체인증)'},
];
const mfaOptions = [
	{value: 'use', label: '사용'},
	{value: 'not_use', label: '사용안함'},
];
const AlternativeAuthOptions = [
	{value: 'google', label: 'Google'},
	{value: 'kakao', label: 'Kakao'},
	{value: 'naver', label: 'Naver'},
];

const MFAOptions = [
	{value: 'otp', label: 'OTP'},
	{value: 'mail', label: 'Mail'},
	{value: 'sms', label: 'SMS'},
	{value: 'finger_print', label: 'Finger Print'},
	{value: 'face_id', label: 'Face ID'},
];

const AccountSpace = () => {
	const [open, setOpen] = useState(false);
	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [authType, setAuthType] = useState('first_option');
	const [mfaType, setMfaType] = useState('use');
	const [authValue, setAuthValue] = useState('google');
	const [mfaValue, setMfaValue] = useState('otp');

	return (
		<_Container>
			<_Title>Account</_Title>
			<_ContentsContainer>
				<Input_ title={'Account'}>
					<_Input
						value={account}
						onChange={(e) => setAccount(e.target.value)}
						placeholder={'Account'}
					/>
				</Input_>
				<Input_ title={'Full name'}>
					<_Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder={'Name'}
					/>
				</Input_>
				<Input_ title={'Email Address'}>
					<_Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={'Email Address'}
					/>
				</Input_>
			</_ContentsContainer>
			<_Title>Authorization</_Title>
			<_ContentsContainer>
				<_Section>
					<Select_
						title='Default Authorization'
						options={authOptions}
						value={authType}
						setValue={setAuthType}
						width={ACCOUNT_INPUT_WIDTH}
					/>
					{authType === 'first_option' ? (
						<_PrimaryButton
							onClick={() => setOpen(true)}
							// disabled
						>
							Change Password
						</_PrimaryButton>
					) : (
						<_DisabledButton onClick={() => setOpen(true)} disabled>
							Change Password
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
					title='MFA'
					options={mfaOptions}
					value={mfaType}
					setValue={setMfaType}
					width={ACCOUNT_INPUT_WIDTH}
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
