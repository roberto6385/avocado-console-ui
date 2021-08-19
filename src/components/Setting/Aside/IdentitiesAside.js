import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';

import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import CheckBox from '../../RecycleComponents/CheckBox';
import {NormalButton} from '../../../styles/components/button';
import {tabBarSelector} from '../../../reducers/tabBar';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';

const _Container = styled.div`
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _Li = styled.li`
	height: 48px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid
		${(props) => props.theme.pages.webTerminal.main.aside.border.color};
`;

const _AccountContainer = styled.div`
	width: 109px;
	display: flex;
	align-items: center;
	padding: 6px 16px;
	white-space: nowrap;
`;

const _AuthenticationContainer = styled(_AccountContainer)`
	width: 100px;
`;

const _CheckboxContainer = styled(_AuthenticationContainer)`
	justify-content: center;
`;

const _PrimaryGreenButton = styled(NormalButton)`
	width: 268px;
	margin: 34px 16px;
	padding: 7px 16px;
`;

const IdentitiesAside = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {t} = useTranslation('identities');

	const {accounts} = useSelector(remoteResourceSelector.all);
	const {terminalTabs, selectedTab} = useSelector(tabBarSelector.all);

	const resourceKey = useMemo(
		() => terminalTabs.find((v) => v.uuid === selectedTab)?.server.key,
		[terminalTabs, selectedTab],
	);

	const onClickRedirectToIdentitiesPage = useCallback(() => {
		history.push('/identities');
	}, [history]);

	const onClickChangeIdentity = useCallback(
		(v) => (e) => {
			if (!e.target.checked) return;

			const account = accounts.find(
				(v) => v.key === resourceKey && v.checked,
			);
			dispatch(
				remoteResourceAction.setAccount({
					prev: account,
					next: v,
				}),
			);
		},

		[accounts, resourceKey, dispatch],
	);

	return (
		<_Container>
			<ul>
				<_Li>
					<_AccountContainer>{t('aside.account')}</_AccountContainer>
					<_AuthenticationContainer>
						{t('aside.auth')}
					</_AuthenticationContainer>
					<_CheckboxContainer>
						{t('aside.default')}
					</_CheckboxContainer>
				</_Li>

				{accounts.map((item) => {
					if (item.key === resourceKey) {
						return (
							<_Li key={item.id}>
								<_AccountContainer>
									{item.identity_name}
								</_AccountContainer>
								<_AuthenticationContainer>
									{item.type}
								</_AuthenticationContainer>

								<_CheckboxContainer>
									<CheckBox
										value={item.checked}
										onChangeCheck={onClickChangeIdentity(
											item,
										)}
									/>
								</_CheckboxContainer>
							</_Li>
						);
					}
				})}
			</ul>
			<_PrimaryGreenButton onClick={onClickRedirectToIdentitiesPage}>
				{t('aside.editMore')}
			</_PrimaryGreenButton>
		</_Container>
	);
};

export default IdentitiesAside;
