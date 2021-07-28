import React, {useCallback} from 'react';
import InputField_ from '../../RecycleComponents/inputField_';
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
			<InputField_ title={t('account')}>
				<_Input
					theme_value={theme}
					value={account.account}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</InputField_>
			<InputField_ title={t('name')}>
				<_Input
					theme_value={theme}
					value={account.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</InputField_>
			<InputField_ title={t('email')}>
				<_Input
					theme_value={theme}
					value={account.email}
					placeholder={t('emailPlace')}
					readOnly
				/>
			</InputField_>
			<InputField_ title={t('auth')}>
				<_PrimaryGreenButton
					theme_value={theme}
					onClick={changePath('/account')}
				>
					{t('changeAuth')}
				</_PrimaryGreenButton>
			</InputField_>
		</_Container>
	);
};

export default AccountAside;
