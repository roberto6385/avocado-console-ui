import React, {useCallback} from 'react';
import InputFiled_ from '../../RecycleComponents/InputFiled_';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {shallowEqual, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {settingInput} from '../../../styles/color';
import {Input} from '../../../styles/default';
import {PrimaryGreenButton} from '../../../styles/button';

const _Container = styled.div`
	padding: 15px 16px 15px 17px;
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _Input = styled(Input)`
	background: ${(props) => settingInput[props.theme_value]};
`;

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	width: 268px;
	margin: 0px;
	padding: 7px 7px 7px 6px;
`;

const AccountAside = () => {
	const {t} = useTranslation('accountAside');
	const history = useHistory();

	const {theme, account} = useSelector((state) => state.common, shallowEqual);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	return (
		<_Container>
			<InputFiled_ title={t('account')}>
				<_Input
					theme_value={theme}
					value={account.account}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('name')}>
				<_Input
					theme_value={theme}
					value={account.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('email')}>
				<_Input
					theme_value={theme}
					value={account.email}
					placeholder={t('emailPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('auth')}>
				<_PrimaryGreenButton
					theme_value={theme}
					onClick={changePath('/account')}
				>
					{t('changeAuth')}
				</_PrimaryGreenButton>
			</InputFiled_>
		</_Container>
	);
};

export default AccountAside;
