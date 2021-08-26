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
import {doesNameIncludeVal} from '../../../utils/searchTree';
import {startSearchingNode} from '../../../utils/redux';

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

const IdentitiesSpace = () => {
	const dispatch = useDispatch();

	const {t} = useTranslation('identities');

	const {
		selectedResource,
		resources,
		accounts,
		computingSystemServicePorts,
		resourceTree,
		resourceGroups,
	} = useSelector(remoteResourceSelector.all);

	const [resourceSearchVal, onChangeResourceSearchVal] = useInput('');
	const [identitySearchVal, onChangeIdentitySearchVal] = useInput('');

	const onClickSelectResource = useCallback(
		(v) => () => {
			dispatch(remoteResourceAction.setSelectedResource(v));
		},
		[dispatch],
	);

	const onClickChangeDefaultIdentity = useCallback(
		(v) => () => {
			if (v.isDefaultAccount) return;

			dispatch(
				remoteResourceAction.setAccount({
					prev: accounts.find(
						(data) =>
							data.resourceId === v.resourceId &&
							data.isDefaultAccount,
					).id,
					next: v.id,
				}),
			);
		},
		[dispatch, accounts],
	);

	const createResourceRath = useCallback(
		(path) => {
			const words = path.split('/');
			let pathName = '';

			for (let i = 1; i < words.length - 1; i++)
				pathName +=
					resourceGroups.find((v) => v.id === words[i]).name + ' > ';

			return (
				pathName +
				resources.find((v) => v.id === words[words.length - 1]).name
			);
		},
		[resources, resourceGroups],
	);

	useEffect(() => {
		dispatch(remoteResourceAction.setSelectedResource(resources[0].id));
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
					{resources.map((data) => {
						if (doesNameIncludeVal(data.name, resourceSearchVal)) {
							const computingSystemServicePort =
								computingSystemServicePorts.find(
									(v) => v.id === data.id,
								);

							return (
								<_ResourceLi
									key={data.id}
									onClick={onClickSelectResource(data.id)}
									selected={data.id === selectedResource}
								>
									<_ResourceName>
										{createResourceRath(
											startSearchingNode(
												resourceTree,
												data.id,
											).path,
										)}
									</_ResourceName>
									<_AddressName>
										{computingSystemServicePort.host}
									</_AddressName>
									<_ProtocolPortName>
										{computingSystemServicePort.protocol}
									</_ProtocolPortName>
									<_ProtocolPortName>
										{computingSystemServicePort.port}
									</_ProtocolPortName>
								</_ResourceLi>
							);
						}
					})}
				</_ResourceListUl>
				<_Ul>
					<_LiHeader className={'weight_bold'}>
						<_Name>
							{t('account')}
							<_Span>
								{` :
								${
									accounts
										.slice()
										.filter(
											(item) =>
												item.resourceId ===
												selectedResource,
										).length
								}${t('cases')}`}
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
					{accounts.map((data) => {
						if (
							doesNameIncludeVal(data.user, identitySearchVal) &&
							data.resourceId === selectedResource
						)
							return (
								<_Li
									key={data.id}
									selected={data.isDefaultAccount}
									onClick={onClickChangeDefaultIdentity(data)}
								>
									<_Name>{data.name}</_Name>
									<_UserNameType>{data.user}</_UserNameType>
									<_UserNameType>
										{data.type === 'Password'
											? t('password')
											: t('keyFile')}
									</_UserNameType>
									<_IdentityCheckBox>
										<CheckBox
											value={data.isDefaultAccount}
										/>
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
