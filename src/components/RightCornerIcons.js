import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FaTh, AiTwotoneSetting, HiUserCircle} from 'react-icons/all';

import {CHANGE_NUMBER_OF_COLUMNS, RIGHT_SIDE_KEY} from '../reducers/common';
import DropdownMenu from './DropdownMenu';
import {PrevIconButton} from '../styles/buttons';
import {FlexBox} from '../styles/divs';
import {LIGHT_BACK_COLOR, RIGHT_SIDE_WIDTH} from '../styles/global_design';
import styled from 'styled-components';

const CornerIcons_Container = styled.div`
	display: flex;
	align-items: center;
	background: ${LIGHT_BACK_COLOR};
	height: 100%;
`;

const RightCornerIcons = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const changeColumn = useCallback(
		(cols, max) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				data: {cols: cols, max: max},
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

	const openPreferences = useCallback(
		(key) => () => {
			const sideMenu = document.querySelector('#right_side_menu');
			dispatch({type: RIGHT_SIDE_KEY, payload: key});
			sideMenu.classList.add('active');
		},
		[dispatch],
	);

	const setting_list = [
		{onClick: changePath('/account'), title: 'Edit Setting'},
		{
			onClick: openPreferences('Preferences'),
			title: 'Preferences',
		},
		{
			onClick: openPreferences('Identities'),
			title: 'Identities',
		},
		{title: 'divider'},
		{onClick: () => console.log('Logout Action'), title: 'Logout'},
	];
	const column_list = [
		{onClick: changeColumn(1, 1), title: 'No Columns'},
		{onClick: changeColumn(2, 4), title: '2 Columns'},
		{onClick: changeColumn(3, 3), title: '3 Columns'},
		{onClick: () => console.log('4 Columns'), title: '4 Columns'},
		{onClick: () => console.log('5 Columns'), title: '5 Columns'},
	];

	return (
		<CornerIcons_Container>
			<PrevIconButton onClick={openPreferences('Account')}>
				<HiUserCircle />
			</PrevIconButton>
			<DropdownMenu icon={<AiTwotoneSetting />} menu={setting_list} />
			<DropdownMenu icon={<FaTh />} menu={column_list} />
		</CornerIcons_Container>
	);
};

export default RightCornerIcons;
