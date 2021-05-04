import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {FaTh, AiTwotoneSetting, HiUserCircle} from 'react-icons/all';

import {CHANGE_NUMBER_OF_COLUMNS} from '../reducers/common';
import {MAIN_COLOR} from '../styles/global';
import {SplitButtonContainer} from '../styles/common';
import Avocado_Dropdown from '../styles/components/Avocado_Dropdown';
import {UserButton} from '../styles/components/Avocado_Button';

const SplitBar = () => {
	const dispatch = useDispatch();
	// const {cols} = useSelector((state) => state.common);

	const changeColumn = useCallback(
		(cols, max) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				data: {cols: cols, max: max},
			});
		},
		[],
	);

	const setting_list = [
		{onClick: () => console.log('some action!'), title: 'Edit Setting'},
		{onClick: () => console.log('some action!'), title: 'Preferences'},
		{onClick: () => console.log('some action!'), title: 'Identities'},
		{title: 'divider'},
		{onClick: () => console.log('some action!'), title: 'Logout'},
	];
	const column_list = [
		{onClick: changeColumn(1, 1), title: 'No Columns'},
		{onClick: changeColumn(2, 4), title: '2 Columns'},
		{onClick: changeColumn(3, 3), title: '3 Columns'},
		{onClick: () => console.log('4 Columns'), title: '4 Columns'},
		{onClick: () => console.log('5 Columns'), title: '5 Columns'},
	];

	return (
		<SplitButtonContainer>
			<UserButton>
				<HiUserCircle />
			</UserButton>
			<Avocado_Dropdown
				icon={<AiTwotoneSetting style={{color: MAIN_COLOR}} />}
				menu={setting_list}
			/>
			<Avocado_Dropdown
				icon={<FaTh style={{color: MAIN_COLOR}} />}
				menu={column_list}
			/>
		</SplitButtonContainer>
	);
};

export default SplitBar;
