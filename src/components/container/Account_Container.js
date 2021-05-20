import React, {useCallback, useState} from 'react';
import Input_Container from './Input_Container';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	GREEN_COLOR,
	BORDER_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
} from '../../styles/global_design';
import {useHistory} from 'react-router-dom';

const Container = styled.div`
	padding: 15px 16px;
`;

const Input = styled.input`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid ${BORDER_COLOR};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const Account_Container = () => {
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
		<Container>
			<Input_Container title={'Account'}>
				<Input
					value={account}
					onChange={(e) => setAccount(e.target.value)}
					placeholder={'Account'}
				/>
			</Input_Container>
			<Input_Container title={'Full name'}>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={'Name'}
				/>
			</Input_Container>
			<Input_Container title={'Email Address'}>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={'Email Address'}
				/>
			</Input_Container>
			<Input_Container title={'Authorization'}>
				<Input
					onClick={changePath('/account')}
					type='button'
					value={'Change Authorization'}
					back={GREEN_COLOR}
					color={'white'}
				/>
			</Input_Container>
		</Container>
	);
};

export default Account_Container;
