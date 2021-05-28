import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {CHANGE_NUMBER_OF_COLUMNS, RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu_ from './RecycleComponents/DropdownMenu_';
import {IconButton, LIGHT_BACK_COLOR} from '../styles/global';
import {getRevoke} from '../reducers/auth/revoke';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${LIGHT_BACK_COLOR};
	height: 100%;
`;

const RightCornerIcons = () => {
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

	const changeColumn = useCallback(
		(cols) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				data: {cols: cols},
			});
		},
		[],
	);

	const changePath = useCallback(
		(path) => () => {
			history.push(path);
		},
		[],
	);

	const openSideMenu = useCallback(
		(key) => () => {
			dispatch({type: RIGHT_SIDE_KEY, payload: key});
			const sideMenu = document.querySelector('#right_side_menu');
			sideMenu.classList.add('active');
		},
		[dispatch],
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

	const column_list = [
		{onClick: changeColumn(1), title: 'No Columns'},
		{onClick: changeColumn(2), title: '2 Columns'},
		{onClick: changeColumn(3), title: '3 Columns'},
		{onClick: changeColumn(4), title: '4 Columns'},
		{onClick: changeColumn(5), title: '5 Columns'},
	];

	const account_list = [
		{
			onClick: openSideMenu('Account'),
			title: 'Account',
		},
		{onClick: logout(), title: 'Logout'},
	];

	return (
		<CornerIcons_Container>
			<DropdownMenu_
				icon={
					<span className='material-icons button_large'>person</span>
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
			<DropdownMenu_
				icon={
					<span className='material-icons button_large'>
						grid_view
					</span>
				}
				menu={column_list}
			/>
			<IconButton>
				<span className='material-icons button_large'>
					notifications
				</span>
			</IconButton>
		</CornerIcons_Container>
	);
};

export default RightCornerIcons;
