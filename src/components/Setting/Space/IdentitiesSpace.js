import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {searchIcon} from '../../../icons/icons';
import useInput from '../../../hooks/useInput';
import CheckBox from '../../RecycleComponents/CheckBox';
import {
	SettingContentContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/components/settingPage';
import {
	remoteResourceAction,
	remoteResourceSelector,
} from '../../../reducers/remoteResource';
import SearchIconTextBox from '../../RecycleComponents/SearchIconTextBox';

const _SettingContentContainer = styled(SettingContentContainer)`
	display: flex;
	flex: 1;
`;

const _Span = styled.span`
	margin: 8px;
`;

const _Ul = styled.ul`
	background: white;
	flex: 1;
	border: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.content.identitiesPageStyle.items
			.normalStyle.border.color};
	background: ${(props) =>
		props.theme.pages.webTerminal.setting.content.identitiesPageStyle.items
			.normalStyle.backgroundColor};
`;
const _ResourceListUl = styled(_Ul)`
	margin-right: 16px;
`;

const _Li = styled.li`
	font-size: 13px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.setting.content.identitiesPageStyle.items
			.normalStyle.border.color};
	background: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.setting.content.identitiesPageStyle
					.items.normalStyle.accountTableSelectedStyle.backgroundColor
			: props.theme.pages.webTerminal.setting.content.identitiesPageStyle
					.items.normalStyle.backgroundColor};
	letter-spacing: 0.13px;
	}
`;

const _ResourceLi = styled(_Li)`
	cursor: pointer;
	background: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.setting.content.identitiesPageStyle
					.items.normalStyle.resourceTableSelectedStyle
					.backgroundColor
			: props.theme.pages.webTerminal.setting.content.identitiesPageStyle
					.items.normalStyle.backgroundColor};
`;

const _Name = styled.div`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	white-space: nowrap;
	min-width: 100px;
	flex: 6;
	display: flex;
	align-items: center;
	margin: 6px 16px;
`;
const _ResourceName = styled(_Name)`
	min-width: 100px;
	flex: 4;
	overflow: hidden;
`;

const _AddressName = styled(_Name)`
	min-width: 100px;
	flex: 3;
	overflow: hidden;
`;
const _ProtocolPortName = styled(_Name)`
	min-width: 100px;
	flex: 2;
`;
const _UserNameType = styled(_Name)`
	min-width: 100px;
	flex: 5;
`;
const _IdentityCheckBox = styled(_UserNameType)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
`;

const _SearchTextBox = styled.form`
	font-size: 12px;
	display: flex;
	align-items: center;
	height: 30px;
	margin: 9px 16px;
`;

const _LiHeader = styled(_Li)`
	font-size: 14px;
`;

function searchNextResourceNode(node, key) {
	if (node.type === 'server' || !node.contain.length) {
		if (node.key === key) return node.name;
		else return false;
	}

	for (let x of node.contain) {
		let result = searchNextResourceNode(x, key);
		if (result) return node.name + ' > ' + result;
	}
	return '';
}

function createResourceRath(root, key) {
	for (let x of root) {
		const result = searchNextResourceNode(x, key);
		if (result) return result;
	}
	return false;
}

const IdentitiesSpace = () => {
	const dispatch = useDispatch();

	const {t} = useTranslation('identities');

	const {selectedResource, resources, accounts, resourceTree} = useSelector(
		remoteResourceSelector.all,
	);

	const [resourceSearchVal, onChangeResourceSearchVal] = useInput('');
	const [identitySearchVal, onChangeIdentitySearchVal] = useInput('');

	const onClickSelectResource = useCallback(
		(v) => () => {
			dispatch(remoteResourceAction.setSelectedResource(v.key));
		},
		[dispatch],
	);

	const onClickChangeDefaultIdentity = useCallback(
		(v) => () => {
			if (v.checked) return;

			const account = accounts.find(
				(v) => v.key === selectedResource && v.checked,
			);
			dispatch(
				remoteResourceAction.setAccount({
					prev: account,
					next: v,
				}),
			);
		},
		[accounts, dispatch, selectedResource],
	);

	useEffect(() => {
		dispatch(remoteResourceAction.setSelectedResource(resources[0].key));
	}, [dispatch, resources]);

	return (
		<SettingMainContainer>
			<SettingTitle>{t('title')}</SettingTitle>
			<_SettingContentContainer>
				<_ResourceListUl>
					<_LiHeader className={'weight_bold'}>
						<_ResourceName>
							{t('resource')}
							<_Span>{`
								: ${resources.length}${t('cases')}
								`}</_Span>
						</_ResourceName>
						<_SearchTextBox>
							<SearchIconTextBox
								icon={searchIcon}
								onChange={onChangeResourceSearchVal}
								value={resourceSearchVal}
								placeholder={t('search')}
								size={'12px'}
							/>
						</_SearchTextBox>
					</_LiHeader>
					<_Li className={'weight_bold'}>
						<_ResourceName>{t('resourceName')}</_ResourceName>
						<_AddressName>{t('address')}</_AddressName>
						<_ProtocolPortName>{t('protocol')} </_ProtocolPortName>
						<_ProtocolPortName>{t('port')}</_ProtocolPortName>
					</_Li>
					{resources.map((item) => {
						if (
							item.name
								.toLowerCase()
								.replace(/ /g, '')
								.includes(
									resourceSearchVal
										.toLowerCase()
										.replace(/ /g, ''),
								)
						)
							return (
								<_ResourceLi
									key={item.id}
									onClick={onClickSelectResource(item)}
									selected={item.key === selectedResource}
								>
									<_ResourceName>
										{createResourceRath(
											resourceTree,
											item.key,
										)}
									</_ResourceName>
									<_AddressName>{item.host}</_AddressName>
									<_ProtocolPortName>
										{item.protocol}
									</_ProtocolPortName>
									<_ProtocolPortName>
										{item.port}
									</_ProtocolPortName>
								</_ResourceLi>
							);
					})}
				</_ResourceListUl>
				<_Ul>
					<_LiHeader className={'weight_bold'}>
						<_Name>
							{t('account')}
							<_Span>
								{` :
								${accounts.slice().filter((item) => item.key === selectedResource).length}${t(
									'cases',
								)}`}
							</_Span>
						</_Name>
						<_SearchTextBox>
							<SearchIconTextBox
								icon={searchIcon}
								onChange={onChangeIdentitySearchVal}
								value={identitySearchVal}
								placeholder={t('search')}
								size={'12px'}
							/>
						</_SearchTextBox>
					</_LiHeader>
					<_Li className={'weight_bold'}>
						<_Name>{t('accountName')}</_Name>
						<_UserNameType>{t('userName')}</_UserNameType>
						<_UserNameType>{t('type')}</_UserNameType>
						<_IdentityCheckBox>{t('default')}</_IdentityCheckBox>
					</_Li>
					{accounts.map((item) => {
						if (item.key !== selectedResource) return;
						if (
							item.user
								.toLowerCase()
								.replace(/ /g, '')
								.includes(
									identitySearchVal
										.toLowerCase()
										.replace(/ /g, ''),
								)
						)
							return (
								<_Li
									key={item.id}
									selected={item.checked}
									onClick={onClickChangeDefaultIdentity(item)}
								>
									<_Name>{item.identity_name}</_Name>
									<_UserNameType>{item.user}</_UserNameType>
									<_UserNameType>
										{item.type === 'Password'
											? t('password')
											: t('keyFile')}
									</_UserNameType>
									<_IdentityCheckBox>
										<CheckBox value={item.checked} />
									</_IdentityCheckBox>
								</_Li>
							);
					})}
				</_Ul>
			</_SettingContentContainer>
		</SettingMainContainer>
	);
};

export default IdentitiesSpace;
