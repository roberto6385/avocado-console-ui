import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import '../styles/resize.css';
import {
	IconButton,
	LIGHT_BACK_COLOR,
	MAIN_HEIGHT,
	LIGHT_BACKGROUND_COLOR,
	PrimaryButton,
	RIGHT_SIDE_WIDTH,
} from '../styles/global_design';
import styled from 'styled-components';
import {RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu_ from './RecycleComponents/DropdownMenu_';
import {useHistory} from 'react-router-dom';
import AsideContainer from './Setting/AsideContainer';
import {getRevoke} from '../reducers/auth/revoke';

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
	background: ${LIGHT_BACK_COLOR};
`;

const _Body = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	background: ${LIGHT_BACKGROUND_COLOR};
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

const MainPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const {userTicket} = useSelector((state) => state.userTicket);

	const logout = useCallback(
		() => () => {
			dispatch(
				getRevoke({Authorization: 'Bearer ' + userTicket.access_token}),
			);
		},
		[userTicket, dispatch],
	);

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
			<_Header>
				<DropdownMenu_
					icon={
						<span className='material-icons button_large'>
							person
						</span>
					}
					menu={account_list}
				/>
				<DropdownMenu_
					icon={
						<span className='material-icons button_large'>
							settings
						</span>
					}
					menu={setting_list}
				/>
				<IconButton>
					<span className='material-icons button_large'>
						notifications
					</span>
				</IconButton>
			</_Header>
			<_Body>
				<_Contents>
					<span>Hello! Start Avocado</span>
					<span>
						Select a server to start a session via SSH, SFTP, RDP,
						VNC or Telnet. Or
					</span>
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
