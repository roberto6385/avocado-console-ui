import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {OPEN_ADD_SERVER_FORM_POPUP} from '../reducers/popup';
import '../styles/resize.css';
import {
	IconButton,
	LIGHT_BACK_COLOR,
	MAIN_HEIGHT,
	POPUP_SIDE_COLOR,
	Primary_Button,
	RIGHT_SIDE_WIDTH,
} from '../styles/global_design';
import styled from 'styled-components';
import {RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu from './DropdownMenu';
import {useHistory} from 'react-router-dom';
import SideMenuContainer from './container/SideMenuContainer';

const Container = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: ${MAIN_HEIGHT};
	width: 100%;
	background: ${LIGHT_BACK_COLOR};
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	background: ${POPUP_SIDE_COLOR};
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

const Contents = styled.div`
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
		{title: 'divider'},
		{onClick: () => console.log('Logout Action'), title: 'Logout'},
	];

	return (
		<Container>
			<Header>
				<IconButton onClick={openSideMenu('Account')}>
					<span className='material-icons'>person</span>
				</IconButton>
				<DropdownMenu
					icon={<span className='material-icons'>settings</span>}
					menu={setting_list}
				/>
				<IconButton>
					<span className='material-icons'>notifications</span>
				</IconButton>
			</Header>
			<Body>
				<Contents>
					<span>Hello! Start Avocado</span>
					<span>
						Select a server to start a session via SSH, SFTP, RDP,
						VNC or Telnet. Or
					</span>
					<Primary_Button onClick={onClickVisibleForm}>
						Add Server
					</Primary_Button>
				</Contents>
				<SideMenuContainer />
			</Body>
		</Container>
	);
};

export default MainPage;
