import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {CHANGE_NUMBER_OF_COLUMNS, RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu_ from './RecycleComponents/DropdownMenu_';
import {
	IconButton,
	iconColor,
	IconContainer,
	sideColor,
} from '../styles/global';
import {getRevoke} from '../reducers/auth/revoke';
import {
	accountIcon,
	notificationIcon,
	settingIcon,
	windowIcon,
} from '../icons/icons';
import PropTypes from 'prop-types';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${(props) => props?.back};
	height: 100%;
`;

const RightCornerIcons = ({setToggle}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {userTicket} = useSelector((state) => state.userTicket);
	const {theme, tab} = useSelector((state) => state.common);

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
			setToggle(true);
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
		<CornerIcons_Container back={sideColor[theme]}>
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
			{tab.length !== 0 && (
				<DropdownMenu_
					icon={
						<IconContainer color={iconColor[theme]}>
							{windowIcon}
						</IconContainer>
					}
					menu={column_list}
				/>
			)}
			<IconButton>{notificationIcon}</IconButton>
		</CornerIcons_Container>
	);
};

RightCornerIcons.propTypes = {
	setToggle: PropTypes.func.isRequired,
};

export default RightCornerIcons;
