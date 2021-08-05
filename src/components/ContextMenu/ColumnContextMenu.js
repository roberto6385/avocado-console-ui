import React, {useCallback} from 'react';
import {animation, Item} from 'react-contexify';
import {CHANGE_NUMBER_OF_COLUMNS} from '../../reducers/common';
import {useDispatch} from 'react-redux';
import {DropDownMenu} from '../../styles/components/contextMenu';

const ColumnContextMenu = () => {
	const dispatch = useDispatch();

	const changeColumn = useCallback(
		(cols) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				data: {cols: cols},
			});
		},
		[],
	);

	return (
		<DropDownMenu id={'column'} animation={animation.slide}>
			<Item id='NoColumn' onClick={changeColumn(1)}>
				No Columns
			</Item>
			<Item id='2Columns' onClick={changeColumn(2)}>
				2 Columns
			</Item>
			<Item id='3Columns' onClick={changeColumn(3)}>
				3 Columns
			</Item>
			<Item id='4Columns' onClick={changeColumn(4)}>
				4 Columns
			</Item>
			<Item id='5Columns' onClick={changeColumn(5)}>
				5 Columns
			</Item>
		</DropDownMenu>
	);
};

export default ColumnContextMenu;
