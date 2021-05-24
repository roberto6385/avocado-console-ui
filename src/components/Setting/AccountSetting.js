import React, {useState} from 'react';
import styled from 'styled-components';

import Input_ from '../RecycleComponents/Input_';
import Radio_ from '../RecycleComponents/Radio_';
import Select_ from '../RecycleComponents/Select_';
import {
	ACCOUNT_INPUT_WIDTH,
	BORDER_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
	SUB_HEIGHT,
} from '../../styles/global_design';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 0px 16px;
`;

const _Title = styled.div`
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _ContentsContainer = styled.div`
	padding: 15px 0px;
`;

const _Input = styled.input`
	width: ${ACCOUNT_INPUT_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
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

const AccountSetting = () => {
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
				<Select_
					title='Default Authorization'
					options={authOptions}
					value={authType}
					setValue={setAuthType}
				/>
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
				/>
				<Radio_
					radioName={'MFA'}
					options={MFAOptions}
					value={mfaValue}
					setValue={setMfaValue}
					disabled={mfaType === 'not_use'}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default AccountSetting;
