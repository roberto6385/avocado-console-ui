import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {CHANGE_IDENTITY_CHECKED} from '../../../reducers/common';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {borderColor} from '../../../styles/color';
import {PrimaryGreenButton} from '../../../styles/button';

const _Container = styled.div`
	height: 100%;
	z-index: 5; // terminal보다 높아야 함.
`;

const _Li = styled.li`
	height: 48px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
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

const _PrimaryGreenButton = styled(PrimaryGreenButton)`
	width: 268px;
	margin: 34px 16px;
	padding: 7px 16px;
`;

const IdentitiesAside = () => {
	const dispatch = useDispatch();
	const {t} = useTranslation('identitiesAside');
	const {identity, theme, current_tab, tab} = useSelector(
		(state) => state.common,
		shallowEqual,
	);
	const history = useHistory();
	const currentKey = useMemo(
		() => tab.find((v) => v.uuid === current_tab)?.server.key,
		[tab, current_tab],
	);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const handleCheck = useCallback(
		(item) => (e) => {
			console.log(e.target.checked);
			console.log(item);
			if (!e.target.checked) return;

			const correspondedIdentity = identity.find(
				(v) => v.key === currentKey && v.checked,
			);

			dispatch({
				type: CHANGE_IDENTITY_CHECKED,
				payload: {
					prev: correspondedIdentity,
					next: item,
				},
			});
		},
		[identity, currentKey, dispatch],
	);

	return (
		<_Container>
			<ul>
				<_Li theme_value={theme}>
					<_AccountContainer>{t('account')}</_AccountContainer>
					<_AuthenticationContainer>
						{t('auth')}
					</_AuthenticationContainer>
					<_CheckboxContainer>{t('default')}</_CheckboxContainer>
				</_Li>
				{identity.map((item) => {
					if (item.key === currentKey) {
						return (
							<_Li key={item.id} theme_value={theme}>
								<_AccountContainer>
									{item.identityName}
								</_AccountContainer>
								<_AuthenticationContainer>
									{item.type}
								</_AuthenticationContainer>

								<_CheckboxContainer>
									<Checkbox_
										value={item.checked}
										handleCheck={handleCheck(item)}
									/>
								</_CheckboxContainer>
							</_Li>
						);
					}
				})}
			</ul>
			<_PrimaryGreenButton
				theme_value={theme}
				onClick={changePath('/identities')}
			>
				{t('editMore')}
			</_PrimaryGreenButton>
		</_Container>
	);
};

export default IdentitiesAside;
