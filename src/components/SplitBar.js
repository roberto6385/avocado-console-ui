import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BsSquareFill, FaTh, FaThLarge} from 'react-icons/all';

import {CHANGE_NUMBER_OF_COLUMNS} from '../reducers/common';
import {MAIN_COLOR} from '../styles/global';
import {IconButton, SplitButtonContainer} from '../styles/common';

const SplitBar = () => {
	const dispatch = useDispatch();
	const {cols} = useSelector((state) => state.common);

	const changeColumn = useCallback(
		(cols, max) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				data: {cols: cols, max: max},
			});
		},
		[dispatch],
	);

	return (
		<SplitButtonContainer>
			<IconButton onClick={changeColumn(1, 1)}>
				<BsSquareFill style={cols === 1 && {color: MAIN_COLOR}} />
			</IconButton>
			<IconButton onClick={changeColumn(2, 4)}>
				<FaThLarge style={cols === 2 && {color: MAIN_COLOR}} />
			</IconButton>
			<IconButton onClick={changeColumn(3, 3)}>
				<FaTh style={cols === 3 && {color: MAIN_COLOR}} />
			</IconButton>
		</SplitButtonContainer>
	);
};

export default SplitBar;
