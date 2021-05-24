import React, {useState} from 'react';
import styled from 'styled-components';
import {
	ACCOUNT_INPUT_WIDTH,
	BORDER_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
	SUB_HEIGHT,
} from '../../styles/global_design';
import Input_Container from './Input_Container';
import Select_ from '../RecycleComponents/Select_';
import _Radio from '../RecycleComponents/Radio_';

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
const AlternativeAuthOptions = [
	{value: 'google', label: 'Google'},
	{value: 'kakao', label: 'Kakao'},
	{value: 'naver', label: 'Naver'},
];

const AccountSetting = () => {
	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [authType, setAuthType] = useState('first_option');
	const [authValue, setAuthValue] = useState('google');

	return (
		<_Container>
			<_Title>Account</_Title>
			<_ContentsContainer>
				<Input_Container title={'Account'}>
					<_Input
						value={account}
						onChange={(e) => setAccount(e.target.value)}
						placeholder={'Account'}
					/>
				</Input_Container>
				<Input_Container title={'Full name'}>
					<_Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder={'Name'}
					/>
				</Input_Container>
				<Input_Container title={'Email Address'}>
					<_Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={'Email Address'}
					/>
				</Input_Container>
			</_ContentsContainer>
			<_Title>Authorization</_Title>
			<_ContentsContainer>
				<Select_
					title='Default Authorization'
					options={authOptions}
					value={authType}
					setValue={setAuthType}
				/>
				<_Radio
					radioName={'AlternativeAuth'}
					options={AlternativeAuthOptions}
					value={authValue}
					setValue={setAuthValue}
					disabled={authType === 'first_option'}
				/>
			</_ContentsContainer>
		</_Container>
	);
};

export default AccountSetting;
