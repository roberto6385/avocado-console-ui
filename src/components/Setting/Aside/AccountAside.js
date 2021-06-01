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
	PATH_SEARCH_INPUT_HEIGHT,
	RIGHT_SIDE_WIDTH,
} from '../../../styles/global';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

const _Container = styled.div`
	width: ${RIGHT_SIDE_WIDTH};
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
	const {t} = useTranslation('accountAside');
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
			<Input_ title={t('account')}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={account}
					onChange={(e) => setAccount(e.target.value)}
					placeholder={t('accountPlace')}
				/>
			</Input_>
			<Input_ title={t('name')}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={t('namePlace')}
				/>
			</Input_>
			<Input_ title={t('email')}>
				<_Input
					back={inputColor[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={t('emailPlace')}
				/>
			</Input_>
			<Input_ title={t('auth')}>
				<_Button onClick={changePath('/account')}>
					{t('changeAuth')}
				</_Button>
			</Input_>
		</_Container>
	);
};

export default AccountAside;
