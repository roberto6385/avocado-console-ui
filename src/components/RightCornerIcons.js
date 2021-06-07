import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import {CHANGE_NUMBER_OF_COLUMNS, RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu_ from './RecycleComponents/DropdownMenu_';
import {
	backColor,
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
import {OPEN_ALERT_POPUP} from '../reducers/popup';
import {useTranslation} from 'react-i18next';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${(props) => props?.back};
	height: 100%;
`;

const RightCornerIcons = ({toggle, setToggle}) => {
	const {t} = useTranslation('rightCornerIcons');
	const dispatch = useDispatch();
	const history = useHistory();
	const {userTicket} = useSelector((state) => state.userTicket);
	const {theme, tab, rightSideKey} = useSelector((state) => state.common);

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
			if (toggle && rightSideKey === key) {
				setToggle(false);
			} else {
				dispatch({type: RIGHT_SIDE_KEY, payload: key});
				setToggle(true);
			}
		},
		[dispatch, rightSideKey, toggle],
	);

	const setting_list = [
		{onClick: changePath('/account'), title: t('editSetting')},
		{title: 'divider'},
		{
			onClick: openSideMenu('Preferences'),
			title: t('preferences'),
		},
		{
			onClick: openSideMenu('Identities'),
			title: t('identities'),
		},
		{title: 'divider'},
		{onClick: logout(), title: t('logout')},
	];

	const column_list = [
		{onClick: changeColumn(1), title: 'No Columns'},
		{onClick: changeColumn(2), title: '2 Columns'},
		{onClick: changeColumn(3), title: '3 Columns'},
		{onClick: changeColumn(4), title: '4 Columns'},
		{onClick: changeColumn(5), title: '5 Columns'},
	];

	// const account_list = [
	// 	{
	// 		onClick: openSideMenu('Account'),
	// 		title: 'Account',
	// 	},
	// ];

	const onClickNotification = useCallback(() => {
		dispatch({
			type: OPEN_ALERT_POPUP,
			data: 'developing',
		});
	}, []);

	return (
		<CornerIcons_Container back={sideColor[theme]}>
			<IconButton onClick={openSideMenu('Account')}>
				{accountIcon}
			</IconButton>

			{/*<DropdownMenu_*/}
			{/*	icon={*/}
			{/*		<IconContainer color={iconColor[theme]}>*/}
			{/*			{accountIcon}*/}
			{/*		</IconContainer>*/}
			{/*	}*/}
			{/*	menu={account_list}*/}
			{/*/>*/}
			<DropdownMenu_
				icon={
					<IconContainer color={iconColor[theme]}>
						{settingIcon}
					</IconContainer>
				}
				menu={setting_list}
			/>
			<IconButton onClick={onClickNotification}>
				{notificationIcon}
			</IconButton>
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
		</CornerIcons_Container>
	);
};

RightCornerIcons.propTypes = {
	setToggle: PropTypes.func.isRequired,
	toggle: PropTypes.bool.isRequired,
};

export default RightCornerIcons;
