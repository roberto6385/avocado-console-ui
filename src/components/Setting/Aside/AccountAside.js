import React, {useCallback, useState} from 'react';
import Input_ from '../../RecycleComponents/Input_';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	GREEN_COLOR,
	LIGHT_MODE_BORDER_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
} from '../../../styles/global';
import {useHistory} from 'react-router-dom';

const _Container = styled.div`
	padding: 15px 8px;
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${LIGHT_MODE_BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const AccountAside = () => {
	const history = useHistory();

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const [account, setAccount] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	return (
		<_Container>
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
			<Input_ title={'Authorization'}>
				<_Input
					onClick={changePath('/account')}
					type='button'
					value={'Change Authorization'}
					back={GREEN_COLOR}
					color={'white'}
				/>
			</Input_>
		</_Container>
	);
};

export default AccountAside;
