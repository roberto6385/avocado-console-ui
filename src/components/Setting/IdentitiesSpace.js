import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	FONT_COLOR,
	GREEN_COLOR,
	IconButton,
	LIGHT_BACKGROUND_COLOR,
	ROBOTO,
	SUB_HEIGHT,
	THIRD_HEIGHT,
} from '../../styles/global';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {
	OPEN_ADD_ACCOUT_FORM_POPUP,
	OPEN_ADD_SERVER_FORM_POPUP,
	OPEN_CONFIRM_POPUP,
} from '../../reducers/popup';
import {
	ACCOUT_CHECKLIST,
	ACCOUT_CONTROL_ID,
	CHANGE_CURRENT_RESOURCE_KEY,
} from '../../reducers/common';
import {useContextMenu} from 'react-contexify';
import AccountContextMenu from '../ContextMenu/AccountContextMenu';

const _Container = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	background: ${LIGHT_BACKGROUND_COLOR};
`;

const _Title = styled.div`
	margin: 0px 16px;
	display: flex;
	align-items: center;
	height: ${SUB_HEIGHT};
	border-bottom: 1px solid ${BORDER_COLOR};
`;

const _ContentContainer = styled.div`
	display: flex;
	flex: 1;
	margin: 0px 8px;
`;

const _Li = styled.li`
	height: ${THIRD_HEIGHT};
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${BORDER_COLOR};
	font-family: ${ROBOTO};
	font-size: ${AVOCADO_FONTSIZE};
	letter-spacing: 0.14px;
	background: ${(props) => props.back};

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
const _ButtonContainer = styled(_Name)`
	justify-content: center;
	padding: 0;
	// max-width: 126px;
	min-width: 100px;
	flex: 2;
`;

const _AccountListUl = styled.ul`
	border: 1px solid ${BORDER_COLOR};
	background: white;
	flex: 1;
	margin: 16px 8px;
`;
const _ResourceListUl = styled.ul`
	border: 1px solid ${BORDER_COLOR};
	flex: 1;
	background: white;
	// width: 600px;
	margin: 16px 8px;
`;

const Checkbox = ({onChange}) => {
	return (
		<div className='pretty p-svg p-curve'>
			<input type='checkbox' onChange={onChange} />
			<div className='state p-success'>
				<svg className='svg svg-icon' viewBox='0 0 20 20'>
					<path
						d='M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z'
						style={{stroke: 'white', fill: 'white'}}
					/>
				</svg>
				<label />
			</div>
		</div>
	);
};

Checkbox.propTypes = {
	onChange: PropTypes.func,
};

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
	const {
		account,
		server,
		accountCheckList,
		currentResourceListKey,
		nav,
	} = useSelector((state) => state.common);
	const dispatch = useDispatch();

	const {show} = useContextMenu({
		id: 'account',
	});

	const newServer = useCallback(() => {
		dispatch({
			type: OPEN_ADD_SERVER_FORM_POPUP,
			data: {type: 'add'},
		});
	}, [dispatch]);

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

	const checkManager = useCallback(
		(id) => (e) => {
			const {checked} = e.target;
			const prevCheck = accountCheckList.slice();
			if (checked) {
				prevCheck.push(id);
				dispatch({
					type: ACCOUT_CHECKLIST,
					payload: {check: prevCheck},
				});
			} else {
				const nextCheck = prevCheck.filter((item) => item !== id);
				dispatch({
					type: ACCOUT_CHECKLIST,
					payload: {
						check: nextCheck,
					},
				});
			}
		},
		[dispatch, accountCheckList],
	);

	const contextMenuOpen = useCallback(
		(id) => (e) => {
			e.preventDefault();
			console.log(id);
			dispatch({type: ACCOUT_CONTROL_ID, payload: {id}});
			show(e);
			e.stopPropagation();
		},
		[dispatch],
	);

	const deleteAccount = useCallback(() => {
		if (accountCheckList.length !== 0) {
			dispatch({
				type: OPEN_CONFIRM_POPUP,
				data: {
					key: 'delete_account',
				},
			});
		}
	}, [dispatch, accountCheckList]);

	useEffect(() => {
		dispatch({
			type: CHANGE_CURRENT_RESOURCE_KEY,
			payload: {key: server[0].key},
		});
	}, []);

	return (
		<_Container>
			<_Title>Identities</_Title>
			<_ContentContainer>
				<_ResourceListUl>
					<_Li className={'weight_bold'}>
						<_ResourceName>Resource List</_ResourceName>
						<IconButton color={FONT_COLOR} onClick={newServer}>
							<span className='material-icons button_large'>
								add
							</span>
						</IconButton>
					</_Li>
					<_Li className={'weight_bold'}>
						<_ResourceName>Name</_ResourceName>
						<_AddressName>Address</_AddressName>
						<_ProtocolPortName>Protocol </_ProtocolPortName>
						<_ProtocolPortName>Port</_ProtocolPortName>
						<_ProtocolPortName>Note</_ProtocolPortName>
					</_Li>
					{server.map((item) => {
						return (
							<_ResourceLi
								key={item.id}
								onClick={selectResourceList(item)}
								back={
									item.key === currentResourceListKey
										? LIGHT_BACKGROUND_COLOR
										: 'white'
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
								<_ProtocolPortName>Note</_ProtocolPortName>
							</_ResourceLi>
						);
					})}
				</_ResourceListUl>
				<_AccountListUl>
					<_Li className={'weight_bold'}>
						<_Name>[ Cloud Server ] Account List</_Name>
						<div>
							<IconButton
								color={FONT_COLOR}
								onClick={onClickVisibleAddAccountForm}
							>
								<span className='material-icons button_large'>
									add
								</span>
							</IconButton>

							<IconButton onClick={deleteAccount}>
								<span className='material-icons button_large'>
									delete
								</span>
							</IconButton>
						</div>
					</_Li>
					<_Li
						className={'weight_bold'}
						onContextMenu={contextMenuOpen(-1)}
					>
						<Checkbox index={-1} onChange={checkManager(-1)} />
						<_Name>Name</_Name>
						<_UserNameType>User Name</_UserNameType>
						<_UserNameType>Type</_UserNameType>
						{/*<_ButtonContainer>Edit</_ButtonContainer>*/}
					</_Li>
					{account.map((item) => {
						if (item.key !== currentResourceListKey) return;
						return (
							<_Li
								key={item.id}
								back={
									accountCheckList.includes(item.id)
										? LIGHT_BACKGROUND_COLOR
										: 'white'
								}
								onContextMenu={contextMenuOpen(item.id)}
							>
								<Checkbox onChange={checkManager(item.id)} />
								<_Name>{item.name}</_Name>
								<_UserNameType>{item.username}</_UserNameType>
								<_UserNameType>{item.type}</_UserNameType>
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
			<AccountContextMenu />
		</_Container>
	);
};

export default IdentitiesSpace;
