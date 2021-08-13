import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TextBoxField_ from '../../RecycleComponents/TextBoxField_';
import {NormalButton, WarningButton} from '../../../styles/components/button';
import {Input} from '../../../styles/components/input';
import {userResourceSelector} from '../../../reducers/api/userResource';
import {authSelector} from '../../../reducers/api/auth';

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
	const {userData} = useSelector(authSelector.all);
	const {data} = useSelector(userResourceSelector.all);

	console.log(data);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[history],
	);

	const handleDelete = useCallback(
		(e) => {
			console.log('prevent deletion');
			// todo
			// dispatch(
			// 	userResourceAction.deleteRequest({
			// 		userUid: data.userUid,
			// 		token: userData.access_token,
			// 	}),
			// );
		},
		[dispatch, data, userData],
	);

	return (
		<_Container>
			<TextBoxField_ title={t('account')}>
				<Input
					value={data.id}
					placeholder={t('accountPlace')}
					readOnly
				/>
			</TextBoxField_>
			<TextBoxField_ title={t('name')}>
				<Input
					value={data.name}
					placeholder={t('namePlace')}
					readOnly
				/>
			</TextBoxField_>
			<TextBoxField_ title={t('email')}>
				<Input
					value={data.email}
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
