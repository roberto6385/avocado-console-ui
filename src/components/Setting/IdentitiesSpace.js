import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {
	AVOCADO_FONTSIZE,
	GREEN_COLOR,
	ROBOTO,
	SUB_HEIGHT,
	THIRD_HEIGHT,
	formColor,
	fontColor,
	borderColor,
	backColor,
	serverFolderBackColor,
} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {OPEN_ADD_ACCOUT_FORM_POPUP} from '../../reducers/popup';
import {
	ACCOUT_CONTROL_ID,
	CHANGE_CURRENT_RESOURCE_KEY,
	CHANGE_IDENTITY_CHECKED,
} from '../../reducers/common';
import Checkbox_ from '../RecycleComponents/Checkbox_';

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
	height: ${SUB_HEIGHT};
	min-height: ${SUB_HEIGHT};
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
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
	background: ${(props) => props.back};
	font-family: ${ROBOTO};
	font-size: ${AVOCADO_FONTSIZE};
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
			font-size: ${AVOCADO_FONTSIZE};
			::bofore,
			::after {
				font-size: 15px;
			}
		}
		svg {
			border-radius: 4px;
			background: ${GREEN_COLOR};
			font-size: 15px !important;
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
	const {
		identity,
		server,
		// accountCheckList,
		currentResourceListKey,
		nav,
		theme,
	} = useSelector((state) => state.common);
	const dispatch = useDispatch();

	// const {show} = useContextMenu({
	// 	id: 'account',
	// });

	// const newServer = useCallback(() => {
	// 	dispatch({
	// 		type: OPEN_ADD_SERVER_FORM_POPUP,
	// 		data: {type: 'add'},
	// 	});
	// }, [dispatch]);

	const onClickVisibleAddAccountForm = useCallback(() => {
		dispatch({type: ACCOUT_CONTROL_ID, payload: {id: null}});
		dispatch({
			type: OPEN_ADD_ACCOUT_FORM_POPUP,
			data: {type: 'add'},
		});
	}, []);

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
		<_Container back={backColor[theme]} color={fontColor[theme]}>
			<_Title b_color={borderColor[theme]}>{t('title')}</_Title>
			<_ContentContainer>
				<_ResourceListUl back={formColor[theme]}>
					<_Li b_color={borderColor[theme]} className={'weight_bold'}>
						<_ResourceName>
							{t('resource')}
							<_Span>{server.length}</_Span>
						</_ResourceName>

						<div>서치 인풋, 아이콘</div>
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
						return (
							<_ResourceLi
								b_color={borderColor[theme]}
								key={item.id}
								onClick={selectResourceList(item)}
								back={
									item.key === currentResourceListKey
										? serverFolderBackColor[theme]
										: formColor[theme]
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
				<_AccountListUl back={formColor[theme]}>
					<_Li b_color={borderColor[theme]} className={'weight_bold'}>
						<_Name>
							{t('account')}
							<_Span>
								{
									identity
										.slice()
										.filter(
											(item) =>
												item.key ===
												currentResourceListKey,
										).length
								}
							</_Span>
						</_Name>
						<div>서치 인풋, 아이콘</div>

						{/*<div>*/}
						{/*	<IconButton*/}
						{/*		color={fontColor[theme]}*/}
						{/*		onClick={onClickVisibleAddAccountForm}*/}
						{/*	>*/}
						{/*		{plusIcon}*/}
						{/*	</IconButton>*/}

						{/*	<IconButton*/}
						{/*		color={fontColor[theme]}*/}
						{/*		onClick={deleteAccount}*/}
						{/*	>*/}
						{/*		{deleteIcon}*/}
						{/*	</IconButton>*/}
						{/*</div>*/}
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
						<_CheckBoxIdentity>Current</_CheckBoxIdentity>
						{/*<_ButtonContainer>Edit</_ButtonContainer>*/}
					</_Li>
					{identity.map((item) => {
						if (item.key !== currentResourceListKey) return;
						return (
							<_Li
								b_color={borderColor[theme]}
								key={item.id}
								// back={
								// 	accountCheckList.includes(item.id)
								// 		? serverFolderBackColor[theme]
								// 		: formColor[theme]
								// }
							>
								<_Name>{item.identityName}</_Name>
								<_UserNameType>{item.user}</_UserNameType>
								<_UserNameType>{item.type}</_UserNameType>
								<_CheckBoxIdentity>
									<input
										type={'checkbox'}
										checked={item.checked}
										onChange={handleCheck(item)}
									/>
								</_CheckBoxIdentity>
								{/*<_ButtonContainer>*/}
								{/*	<IconButton>*/}
								{/*		<span className='material-icons button_large'>*/}
								{/*			edit*/}
								{/*		</span>*/}
								{/*	</IconButton>*/}
								{/*	<IconButton>*/}
								{/*		<span className='material-icons button_midium'>*/}
								{/*			delete*/}
								{/*		</span>*/}
								{/*	</IconButton>*/}
								{/*</_ButtonContainer>*/}
							</_Li>
						);
					})}
				</_AccountListUl>
			</_ContentContainer>
			{/*<AccountContextMenu />*/}
		</_Container>
	);
};

export default IdentitiesSpace;
