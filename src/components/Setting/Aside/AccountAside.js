import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import InputField_ from '../../RecycleComponents/inputField_';
import {settingInput} from '../../../styles/color';
import {postDeleteAccount} from '../../../reducers/auth/delete';
import {
	PrimaryGreenButton,
	PrimaryRedButton,
} from '../../../styles/components/button';
import {Input} from '../../../styles/components/input';

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

const _PrimaryRednButton = styled(PrimaryRedButton)`
	width: 268px;
	margin: 0px;
	padding: 7px 7px 7px 6px;
`;

const AccountAside = () => {
	const {t} = useTranslation('accountAside');
	const history = useHistory();
	const dispatch = useDispatch();
	const {userInfo, userTicket} = useSelector(
		(state) => state.userTicket,
		shallowEqual,
	);

	const {theme, account} = useSelector((state) => state.common, shallowEqual);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	const handleDelete = useCallback(() => {
		dispatch(
			postDeleteAccount({
				userUid: userInfo.userUid,
				token: userTicket.access_token,
			}),
		);
	}, [dispatch, userInfo, userTicket]);

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
			<InputField_>
				<_PrimaryRednButton theme_value={theme} onClick={handleDelete}>
					계정 삭제
				</_PrimaryRednButton>
			</InputField_>
		</_Container>
	);
};

export default AccountAside;
