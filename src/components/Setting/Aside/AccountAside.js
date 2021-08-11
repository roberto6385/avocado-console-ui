import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import {NormalButton, WarningButton} from '../../../styles/components/button';
import {Input} from '../../../styles/components/input';
import {DELETE_USER_ACCOUNT_REQUEST} from '../../../reducers/auth/user';

const _Container = styled.div`
	padding: 15px 16px 15px 17px;
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _NormalButton = styled(NormalButton)`
	width: 268px;
	margin: 0px;
	padding: 7px 7px 7px 6px;
`;

const _WarningButton = styled(WarningButton)`
	width: 268px;
	margin: 0px;
	padding: 7px 7px 7px 6px;
`;

const AccountAside = () => {
	const {t} = useTranslation('accountSpace');
	const history = useHistory();
	const dispatch = useDispatch();
	const {userTicket} = useSelector((state) => state.userTicket, shallowEqual);
	const {user} = useSelector((state) => state.user, shallowEqual);
	const {account} = useSelector((state) => state?.common, shallowEqual);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	const handleDelete = useCallback(() => {
		dispatch({
			type: DELETE_USER_ACCOUNT_REQUEST,
			payload: {
				userUid: user.userUid,
				token: userTicket.access_token,
			},
		});
	}, [dispatch, user, userTicket]);

	return (
		<_Container>
			<TextBoxField_ title={t('account')}>
				<Input
					value={account.account}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</TextBoxField_>
			<TextBoxField_ title={t('name')}>
				<Input
					value={account.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</TextBoxField_>
			<TextBoxField_ title={t('email')}>
				<Input
					value={account.email}
					placeholder={t('emailPlace')}
					readOnly
				/>
			</TextBoxField_>
			<TextBoxField_ title={t('title.auth')}>
				<_NormalButton onClick={changePath('/account')}>
					{t('detailView')}
				</_NormalButton>
			</TextBoxField_>
			<TextBoxField_>
				<_WarningButton onClick={handleDelete}>
					{t('deleteAccount')}
				</_WarningButton>
			</TextBoxField_>
		</_Container>
	);
};

export default AccountAside;
