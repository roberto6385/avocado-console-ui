import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import '../styles/resize.css';
import {
	IconButton,
	MAIN_HEIGHT,
	PrimaryButton,
	RIGHT_SIDE_WIDTH,
	sideColor,
	IconContainer,
	iconColor,
	backColor,
	fontColor,
} from '../styles/global';
import styled from 'styled-components';
import {RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu_ from './RecycleComponents/DropdownMenu_';
import {useHistory} from 'react-router-dom';
import AsideContainer from './Setting/AsideContainer';
import {getRevoke} from '../reducers/auth/revoke';
import {accountIcon, notificationIcon, settingIcon} from '../icons/icons';

const _Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;

const _Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: ${MAIN_HEIGHT};
	width: 100%;
	background: ${(props) => props.back};
`;

const _Body = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	background: ${(props) => props?.back};
	position: relative;
	#right_side_menu {
		width: 0px;
		max-width: ${RIGHT_SIDE_WIDTH};
		display: none;
	}
	#right_side_menu.active {
		display: block;
		width: ${RIGHT_SIDE_WIDTH};
	}
`;

const _Contents = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 130px;
`;

const _Span = styled.span`
	color: ${(props) => props?.color};
`;

const MainPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {userTicket} = useSelector((state) => state.userTicket);
	const {theme} = useSelector((state) => state.common);

	const logout = useCallback(
		() => () => {
			dispatch(
				getRevoke({Authorization: 'Bearer ' + userTicket.access_token}),
			);
		},
		[userTicket, dispatch],
	);

	// 삭제 ㄴㄴ
	//
	// const refresh = useCallback(() => {
	// 	dispatch(
	// 		getRefreshTicket({
	// 			Authorization: 'Basic ' + encodeData,
	// 			refresh_token: userTicket.refresh_token,
	// 		}),
	// 	);
	// }, [userTicket, dispatch, encodeData]);
	//
	// const verify = useCallback(() => {
	// 	dispatch(
	// 		getVerify({
	// 			Authorization: 'Bearer ' + userTicket.access_token,
	// 		}),
	// 	);
	// }, [userTicket, dispatch]);
	//
	// const findActiveToken = useCallback(() => {
	// 	dispatch(
	// 		findToken({
	// 			offset: 0, //레코드 넘버
	// 			limit: 20, // 조회할 데이터 개수
	// 		}),
	// 	);
	// }, [encodeData, userTicket]);

	const onClickVisibleForm = useCallback(() => {
		dispatch({type: OPEN_ADD_SERVER_FORM_POPUP, data: {type: 'add'}});
	}, []);

	const openSideMenu = useCallback(
		(key) => () => {
			dispatch({type: RIGHT_SIDE_KEY, payload: key});
			const sideMenu = document.querySelector('#right_side_menu');
			sideMenu.classList.add('active');
		},
		[dispatch],
	);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const setting_list = [
		{onClick: changePath('/account'), title: 'Edit Setting'},
		{
			onClick: openSideMenu('Preferences'),
			title: 'Preferences',
		},
		{
			onClick: openSideMenu('Identities'),
			title: 'Identities',
		},
	];
	const account_list = [
		{
			onClick: openSideMenu('Account'),
			title: 'Account',
		},
		{onClick: logout(), title: 'Logout'},
	];

	return (
		<_Container>
			<_Header back={sideColor[theme]}>
				<DropdownMenu_
					icon={
						<IconContainer color={iconColor[theme]}>
							{accountIcon}
						</IconContainer>
					}
					menu={account_list}
				/>
				<DropdownMenu_
					icon={
						<IconContainer color={iconColor[theme]}>
							{settingIcon}
						</IconContainer>
					}
					menu={setting_list}
				/>
				<IconButton>{notificationIcon}</IconButton>
			</_Header>
			<_Body back={backColor[theme]}>
				<_Contents>
					<_Span color={fontColor[theme]}>Hello! Start Avocado</_Span>
					<_Span color={fontColor[theme]}>
						Select a server to start a session via SSH, SFTP, RDP,
						VNC or Telnet. Or
					</_Span>
					<PrimaryButton onClick={onClickVisibleForm}>
						Add Server
					</PrimaryButton>
				</_Contents>
				<AsideContainer />
			</_Body>
		</_Container>
	);
};

export default MainPage;
