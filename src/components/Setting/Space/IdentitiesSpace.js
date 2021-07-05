import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
	CHANGE_CURRENT_RESOURCE_KEY,
	CHANGE_IDENTITY_CHECKED,
} from '../../../reducers/common';
import {searchIcon} from '../../../icons/icons';
import useInput from '../../../hooks/useInput';
import {
	borderColor,
	fontColor,
	identityForm,
	accountHigh,
	identitySearchInput,
	identityHigh,
} from '../../../styles/color';
import Checkbox_ from '../../RecycleComponents/Checkbox_';
import {
	SettingContentsContainer,
	SettingMainContainer,
	SettingTitle,
} from '../../../styles/default';
import {IconBox} from '../../../styles/button';

const _SettingContentsContainer = styled(SettingContentsContainer)`
	display: flex;
	flex: 1;
`;

const _Span = styled.span`
	margin: 8px;
`;

const _Ul = styled.ul`
	background: white;
	flex: 1;
	color: ${(props) => fontColor[props.theme_value]};
	border: 1px solid ${(props) => borderColor[props.theme_value]};
	background: ${(props) => identityForm[props.theme_value]};
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
	border-bottom: 1px solid ${(props) => borderColor[props.theme_value]};
	// background: ${(props) => props.back};
	background: ${(props) =>
		props.clicked
			? accountHigh[props.theme_value]
			: identityForm[props.theme_value]};
	letter-spacing: 0.13px;
	.pretty.p-svg.p-curve {
		z-index: 0;
		line-height: 14px;
		margin: 0px 4px 0px 22.5px;
		label:before {
			font-size: 15px !important;
		}
		label:after {
			font-size: 15px !important;
		}
		label {
			font-size: 14px;
			::bofore,
			::after {
				font-size: 15px;
			}
		}
	}
`;

const _ResourceLi = styled(_Li)`
	cursor: pointer;
	background: ${(props) =>
		props.clicked
			? identityHigh[props.theme_value]
			: identityForm[props.theme_value]};
`;

const _Name = styled.div`
	// max-width: 298px;
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
const _CheckBoxIdentity = styled(_UserNameType)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
`;

const _Form = styled.form`
	font-size: 12px;
	display: flex;
	align-items: center;
	padding: 3px 16px;
	height: 30px;
	background: ${(props) => identitySearchInput[props.theme_value]};
	margin: 9px 16px;
`;

const _Input = styled.input`
	width: 233px;
	height: 24px;
	border: none;
	background: transparent;
	color: ${(props) => fontColor[props.theme_value]};
`;

const _LiHeader = styled(_Li)`
	font-size: 14px;
`;

function searchTreeNode(node, key) {
	if (node.type === 'server' || !node.contain.length) {
		if (node.key === key) return node.name;
		else return false;
	}

	for (let x of node.contain) {
		let result = searchTreeNode(x, key);
		if (result) return node.name + ' > ' + result;
	}
	return '';
}

function searchTreeStart(root, key) {
	for (let x of root) {
		const result = searchTreeNode(x, key);
		if (result) return result;
	}
	return false;
}

const IdentitiesSpace = () => {
	const {t} = useTranslation('identitiesSpace');
	const {identity, server, currentResourceListKey, nav, theme} = useSelector(
		(state) => state.common,
	);
	const dispatch = useDispatch();
	const [resourceSearch, onChangeResourceSearch, setResourceSearch] =
		useInput('');
	const [identitySearch, onChangeIdentitySearch, setIdentitySearch] =
		useInput('');

	// const onClickVisibleAddAccountForm = useCallback(() => {
	// 	dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
	// 	dispatch({
	// 		type: OPEN_ADD_ACCOUT_FORM_POPUP,
	// 		data: {type: 'add'},
	// 	});
	// }, []);

	const selectResourceList = useCallback(
		(item) => (e) => {
			dispatch({
				type: CHANGE_CURRENT_RESOURCE_KEY,
				payload: {key: item.key},
			});
		},
		[],
	);

	const handleCheck = useCallback(
		(item) => (e) => {
			// 	if (!e.target.checked) return;
			// 	const correspondedIdentity = identity.find(
			// 		(v) => v.key === currentResourceListKey && v.checked,
			// 	);
			//
			// 	dispatch({
			// 		type: CHANGE_IDENTITY_CHECKED,
			// 		payload: {
			// 			prev: correspondedIdentity,
			// 			next: item,
			// 		},
			// 	});
		},
		[identity, currentResourceListKey],
	);

	const onClickCheck = useCallback(
		(item) => (e) => {
			if (item.checked) return;
			const correspondedIdentity = identity.find(
				(v) => v.key === currentResourceListKey && v.checked,
			);

			dispatch({
				type: CHANGE_IDENTITY_CHECKED,
				payload: {
					prev: correspondedIdentity,
					next: item,
				},
			});
		},
		[identity, currentResourceListKey],
	);

	useEffect(() => {
		dispatch({
			type: CHANGE_CURRENT_RESOURCE_KEY,
			payload: {key: server[0].key},
		});
	}, [server]);

	return (
		<SettingMainContainer theme_value={theme}>
			<SettingTitle theme_value={theme}>{t('title')}</SettingTitle>
			<_SettingContentsContainer>
				<_ResourceListUl theme_value={theme}>
					<_LiHeader theme_value={theme} className={'weight_bold'}>
						<_ResourceName>
							{t('resource')}
							<_Span>{`
								: ${server.length}${t('cases')}
								`}</_Span>
						</_ResourceName>
						<_Form theme_value={theme}>
							<IconBox
								size={'xs'}
								margin-right={'6px'}
								theme_value={theme}
							>
								{searchIcon}
							</IconBox>
							<_Input
								onChange={onChangeResourceSearch}
								value={resourceSearch}
								type='text'
								placeholder={t('search')}
								theme_value={theme}
							/>
						</_Form>
					</_LiHeader>
					<_Li theme_value={theme} className={'weight_bold'}>
						<_ResourceName>{t('resourceName')}</_ResourceName>
						<_AddressName>{t('address')}</_AddressName>
						<_ProtocolPortName>{t('protocol')} </_ProtocolPortName>
						<_ProtocolPortName>{t('port')}</_ProtocolPortName>
					</_Li>
					{server.map((item) => {
						if (
							item.name
								.toLowerCase()
								.replace(/ /g, '')
								.includes(
									resourceSearch
										.toLowerCase()
										.replace(/ /g, ''),
								)
						)
							return (
								<_ResourceLi
									theme_value={theme}
									key={item.id}
									onClick={selectResourceList(item)}
									clicked={
										item.key === currentResourceListKey
									}
								>
									<_ResourceName>
										{searchTreeStart(nav, item.key)}
									</_ResourceName>
									<_AddressName>{item.host}</_AddressName>
									<_ProtocolPortName>
										{item.protocol}
									</_ProtocolPortName>
									<_ProtocolPortName>
										{item.port}
									</_ProtocolPortName>
									{/*<_ProtocolPortName>Note</_ProtocolPortName>*/}
								</_ResourceLi>
							);
					})}
				</_ResourceListUl>
				<_Ul theme_value={theme}>
					<_LiHeader theme_value={theme} className={'weight_bold'}>
						<_Name>
							{t('account')}
							<_Span>
								{` :
								${
									identity
										.slice()
										.filter(
											(item) =>
												item.key ===
												currentResourceListKey,
										).length
								}${t('cases')}`}
							</_Span>
						</_Name>
						<_Form theme_value={theme}>
							<IconBox
								size={'xs'}
								margin-right={'6px'}
								theme_value={theme}
							>
								{searchIcon}
							</IconBox>
							<_Input
								onChange={onChangeIdentitySearch}
								value={identitySearch}
								type='text'
								placeholder={t('search')}
								theme_value={theme}
							/>
						</_Form>
					</_LiHeader>
					<_Li
						theme_value={theme}
						className={'weight_bold'}
						// onContextMenu={contextMenuOpen(-1)}
					>
						{/*<Checkbox index={-1} onChange={checkManager(-1)} />*/}
						<_Name>{t('accountName')}</_Name>
						<_UserNameType>{t('userName')}</_UserNameType>
						<_UserNameType>{t('type')}</_UserNameType>
						<_CheckBoxIdentity>{t('default')}</_CheckBoxIdentity>
						{/*<_ButtonContainer>Edit</_ButtonContainer>*/}
					</_Li>
					{identity.map((item) => {
						if (item.key !== currentResourceListKey) return;
						if (
							item.user
								.toLowerCase()
								.replace(/ /g, '')
								.includes(
									identitySearch
										.toLowerCase()
										.replace(/ /g, ''),
								)
						)
							return (
								<_Li
									theme_value={theme}
									key={item.id}
									clicked={item.checked}
									onClick={onClickCheck(item)}
								>
									<_Name>{item.identityName}</_Name>
									<_UserNameType>{item.user}</_UserNameType>
									<_UserNameType>
										{item.type === 'Password'
											? t('password')
											: t('keyFile')}
									</_UserNameType>
									<_CheckBoxIdentity>
										<Checkbox_
											value={item.checked}
											handleCheck={handleCheck(item)}
										/>
									</_CheckBoxIdentity>
								</_Li>
							);
					})}
				</_Ul>
			</_SettingContentsContainer>
		</SettingMainContainer>
	);
};

export default IdentitiesSpace;
