import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {ROBOTO, IconContainer} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
	CHANGE_CURRENT_RESOURCE_KEY,
	CHANGE_IDENTITY_CHECKED,
} from '../../reducers/common';
import {searchIcon} from '../../icons/icons';
import useInput from '../../hooks/useInput';
import {
	FONT_14,
	HEIGHT_26,
	HEIGHT_30,
	HEIGHT_48,
	HEIGHT_50,
	WIDTH_165,
} from '../../styles/length';
import {
	borderColor,
	fontColor,
	iconColor,
	identityForm,
	accountHigh,
	identitySearchInput,
	mainBackColor,
	identityHigh,
} from '../../styles/color';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${(props) => props?.back};
	color: ${(props) => props.color};
	overflow: scroll;
`;

const _Title = styled.div`
	margin: 0px 16px;
	display: flex;
	align-items: center;
	height: ${HEIGHT_50};
	min-height: ${HEIGHT_50};
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
`;

const _ContentContainer = styled.div`
	display: flex;
	flex: 1;
	margin: 0px 8px;
	font-size: 14px;
`;

const _Span = styled.span`
	margin: 8px;
`;

const _Li = styled.li`
	height: ${HEIGHT_48};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	font-family: ${ROBOTO};
	font-size: ${FONT_14};
	letter-spacing: 0.14px;

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
			font-size: ${FONT_14};
			::bofore,
			::after {
				font-size: 15px;
			}
		}
	}
`;

const _ResourceLi = styled(_Li)`
	cursor: pointer;
	background: ${(props) => props?.back};
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
	padding: 6px 16px;
`;
const _ResourceName = styled(_Name)`
	// max-width: 219px;
	min-width: 100px;
	flex: 4;
`;

const _AddressName = styled(_Name)`
	// max-width: 149px;
	min-width: 100px;
	// white-space: nowrap;
	// overflow: hidden;
	// text-overflow: ellipsis;

	flex: 3;
`;
const _ProtocolPortName = styled(_Name)`
	// max-width: 115px;
	min-width: 100px;
	flex: 2;
`;
const _UserNameType = styled(_Name)`
	// max-width: 266px;
	min-width: 100px;
	flex: 5;
`;
const _CheckBoxIdentity = styled(_UserNameType)`
	justify-content: center;
	padding: 0;
	padding: 6px 16px;
`;

const _AccountListUl = styled.ul`
	background: white;
	flex: 1;
	margin: 16px 8px;

	background: ${(props) => props?.back};
	color: ${(props) => props.color};
`;
const _ResourceListUl = styled.ul`
	flex: 1;
	margin: 16px 8px;

	background: ${(props) => props?.back};
	color: ${(props) => props.color};
`;

const _Form = styled.form`
	display: flex;
	align-items: center;
	padding: 16px 10px;
	height: ${HEIGHT_30};
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
	margin: 6px 16px;
	border-radius: 4px;
`;

const _Input = styled.input`
	width: ${WIDTH_165};
	height: ${HEIGHT_26};
	border: none;
	font-size: 14px;
	padding: 0px;
	background: transparent;
	color: ${(props) => props.color};
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
	const [
		resourceSearch,
		onChangeResourceSearch,
		setResourceSearch,
	] = useInput('');
	const [
		identitySearch,
		onChangeIdentitySearch,
		setIdentitySearch,
	] = useInput('');

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
			console.log(e.target.checked);
			console.log(item);

			if (!e.target.checked) return;
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
		[identity, currentResourceListKey, dispatch],
	);

	useEffect(() => {
		dispatch({
			type: CHANGE_CURRENT_RESOURCE_KEY,
			payload: {key: server[0].key},
		});
	}, []);

	return (
		<_Container back={mainBackColor[theme]} color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>{t('title')}</_Title>
			<_ContentContainer>
				<_ResourceListUl back={identityForm[theme]}>
					<_Li b_color={borderColor[theme]} className={'weight_bold'}>
						<_ResourceName>
							{t('resource')}
							<_Span>{`
								: ${server.length}${t('cases')}
								`}</_Span>
						</_ResourceName>
						<_Form back={identitySearchInput[theme]}>
							<IconContainer
								color={iconColor[theme]}
								margin={'0px 6px 0px 0px'}
							>
								{searchIcon}
							</IconContainer>
							<_Input
								onChange={onChangeResourceSearch}
								value={resourceSearch}
								type='text'
								placeholder={t('search')}
								color={fontColor[theme]}
							/>
						</_Form>
						{/*<IconButton*/}
						{/*	color={fontColor[theme]}*/}
						{/*	onClick={newServer}*/}
						{/*>*/}
						{/*	{plusIcon}*/}
						{/*</IconButton>*/}
					</_Li>
					<_Li b_color={borderColor[theme]} className={'weight_bold'}>
						<_ResourceName>{t('resourceName')}</_ResourceName>
						<_AddressName>{t('address')}</_AddressName>
						<_ProtocolPortName>{t('protocol')} </_ProtocolPortName>
						<_ProtocolPortName>{t('port')}</_ProtocolPortName>
						{/*<_ProtocolPortName>{t('note')}</_ProtocolPortName>*/}
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
									b_color={borderColor[theme]}
									key={item.id}
									onClick={selectResourceList(item)}
									back={
										item.key === currentResourceListKey
											? identityHigh[theme]
											: identityForm[theme]
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
				<_AccountListUl back={identityForm[theme]}>
					<_Li b_color={borderColor[theme]} className={'weight_bold'}>
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
						<_Form back={identitySearchInput[theme]}>
							<IconContainer
								color={iconColor[theme]}
								margin={'0px 6px 0px 0px'}
							>
								{searchIcon}
							</IconContainer>
							<_Input
								onChange={onChangeIdentitySearch}
								value={identitySearch}
								type='text'
								placeholder={t('search')}
								color={fontColor[theme]}
							/>
						</_Form>
					</_Li>
					<_Li
						b_color={borderColor[theme]}
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
									b_color={borderColor[theme]}
									key={item.id}
									back={
										item.checked
											? accountHigh[theme]
											: identityForm[theme]
									}
								>
									<_Name>{item.identityName}</_Name>
									<_UserNameType>{item.user}</_UserNameType>
									<_UserNameType>
										{item.type === 'Password'
											? t('password')
											: t('keyFile')}
									</_UserNameType>
									<_CheckBoxIdentity>
										<input
											type={'checkbox'}
											checked={item.checked}
											onChange={handleCheck(item)}
										/>
									</_CheckBoxIdentity>
								</_Li>
							);
					})}
				</_AccountListUl>
			</_ContentContainer>
		</_Container>
	);
};

export default IdentitiesSpace;
