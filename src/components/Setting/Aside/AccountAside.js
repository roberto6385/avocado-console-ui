import React, {useCallback, useState} from 'react';
import Input_ from '../../RecycleComponents/Input_';
import styled from 'styled-components';
import {
	ACCOUNT_BUTTON_WIDTH,
	AVOCADO_FONTSIZE,
	AVOCADO_HOVER_COLOR,
	borderColor,
	fontColor,
	GREEN_COLOR,
	inputColor,
	LIGHT_MODE_BORDER_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
} from '../../../styles/global';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

const _Container = styled.div`
	padding: 15px 8px;
	color: ${(props) => props?.color};
`;

const _Input = styled.input`
	width: 100%;
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Button = styled.button`
	width: ${ACCOUNT_BUTTON_WIDTH};
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	border: none;
	background: ${GREEN_COLOR};
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	color: white;
	&:hover {
		background: ${AVOCADO_HOVER_COLOR};
	}
`;

const AccountAside = () => {
	const history = useHistory();
	const {theme} = useSelector((state) => state.common);

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
		<_Container color={fontColor[theme]}>
			<Input_ title={'Account'}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={account}
					onChange={(e) => setAccount(e.target.value)}
					placeholder={'Account'}
				/>
			</Input_>
			<Input_ title={'Full name'}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={'Name'}
				/>
			</Input_>
			<Input_ title={'Email Address'}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={'Email Address'}
				/>
			</Input_>
			<Input_ title={'Authorization'}>
				<_Button onClick={changePath('/account')}>
					Change Authorization
				</_Button>
			</Input_>
		</_Container>
	);
};

export default AccountAside;
