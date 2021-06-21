import React, {useCallback} from 'react';
import InputFiled_ from '../../RecycleComponents/InputFiled_';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {settingInput} from '../../../styles/color';
import {Input, PrimaryGreenButton} from '../../../styles/default';

const _Container = styled.div`
	padding: 15px 16px 15px 17px;
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _Input = styled(Input)`
	background: ${(props) => settingInput[props.themeValue]};
`;

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	width: 268px;
	margin: 0px;
	padding: 7px 7px 7px 6px;
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
		<_Container>
			<InputFiled_ title={t('account')}>
				<_Input
					themeValue={theme}
					value={account.account}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('name')}>
				<_Input
					themeValue={theme}
					value={account.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('email')}>
				<_Input
					themeValue={theme}
					value={account.email}
					placeholder={t('emailPlace')}
					readOnly
				/>
			</InputFiled_>
			<InputFiled_ title={t('auth')}>
				<_PrimaryGreenButton
					themeValue={theme}
					onClick={changePath('/account')}
				>
					{t('changeAuth')}
				</_PrimaryGreenButton>
			</InputFiled_>
		</_Container>
	);
};

export default AccountAside;
