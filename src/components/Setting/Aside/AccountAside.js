import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TextBoxField from '../../RecycleComponents/TextBoxField';
import {NormalButton} from '../../../styles/components/button';
import {TextBox} from '../../../styles/components/textBox';
import {userResourceSelector} from '../../../reducers/api/userResource';

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

const AccountAside = () => {
	const {t} = useTranslation('account');
	const history = useHistory();

	const {data} = useSelector(userResourceSelector.all);

	const onClickRedirectToAccountPage = useCallback(() => {
		history.push('/account');
	}, [history]);

	return (
		<_Container>
			<TextBoxField title={t('account')}>
				<TextBox
					value={data.id}
					placeholder={t('placeholder.account')}
					readOnly
				/>
			</TextBoxField>
			<TextBoxField title={t('name')}>
				<TextBox
					value={data.name}
					placeholder={t('placeholder.name')}
					readOnly
				/>
			</TextBoxField>
			<TextBoxField title={t('email')}>
				<TextBox
					value={data.email}
					placeholder={t('placeholder.email')}
					readOnly
				/>
			</TextBoxField>
			<TextBoxField title={t('title.auth')}>
				<_NormalButton onClick={onClickRedirectToAccountPage}>
					{t('detailView')}
				</_NormalButton>
			</TextBoxField>
		</_Container>
	);
};

export default AccountAside;
