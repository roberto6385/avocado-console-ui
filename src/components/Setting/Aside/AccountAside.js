import React, {useCallback, useState} from 'react';
import InputFiled_ from '../../RecycleComponents/InputFiled_';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FONT_14, HEIGHT_34, WIDTH_268, WIDTH_300} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fontColor,
	hoverColor,
	settingInput,
} from '../../../styles/color';

const _Container = styled.div`
	width: ${WIDTH_300};
	padding: 15px 8px;
	color: ${(props) => props?.color};
`;

const _Input = styled.input`
	width: 100%;
	height: ${HEIGHT_34};
	padding: 6px 10px;
	border-radius: 4px;
	border: 1px solid;
	border-color: ${(props) => props.b_color};
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Button = styled.button`
	width: ${WIDTH_268};
	height: ${HEIGHT_34};
	border: none;
	border-radius: 4px;
	font-size: ${FONT_14};
	color: ${(props) => props.color};
	background: ${(props) => props.back};
	&:hover {
		background: ${(props) => props?.hover};
	}
`;

const AccountAside = () => {
	const {t} = useTranslation('accountAside');
	const history = useHistory();
	const {theme, account} = useSelector((state) => state.common);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	return (
		<_Container color={fontColor[theme]}>
			<InputFiled_ title={t('account')}>
				<_Input
					back={settingInput[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={account.account}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('name')}>
				<_Input
					back={settingInput[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={account.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('email')}>
				<_Input
					back={settingInput[theme]}
					color={fontColor[theme]}
					b_color={borderColor[theme]}
					value={account.email}
					placeholder={t('emailPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('auth')}>
				<_Button
					back={activeColor[theme]}
					hover={hoverColor[theme]}
					color={theme === 0 ? 'white' : 'black'}
					onClick={changePath('/account')}
				>
					{t('changeAuth')}
				</_Button>
			</InputFiled_>
		</_Container>
	);
};

export default AccountAside;
