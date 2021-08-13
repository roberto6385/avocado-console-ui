import React, {useCallback} from 'react';
import {animation, Item} from 'react-contexify';
import {CHANGE_NUMBER_OF_COLUMNS} from '../../reducers/common';
import {useDispatch} from 'react-redux';
import {DropDownMenu} from '../../styles/components/contextMenu';

const SplitTerminalViewContextMenu = () => {
	const dispatch = useDispatch();

	const onClickChangeTerminalView = useCallback(
		(cols) => () => {
			dispatch({
				type: CHANGE_NUMBER_OF_COLUMNS,
				payload: {cols: cols},
			});
		},
		[],
	);

	return (
		<DropDownMenu id={'column'} animation={animation.slide}>
			<Item onClick={onClickChangeTerminalView(1)}>No Columns</Item>
			<Item onClick={onClickChangeTerminalView(2)}>2 Columns</Item>
			<Item onClick={onClickChangeTerminalView(3)}>3 Columns</Item>
			<Item onClick={onClickChangeTerminalView(4)}>4 Columns</Item>
			<Item onClick={onClickChangeTerminalView(5)}>5 Columns</Item>
		</DropDownMenu>
	);
};

export default SplitTerminalViewContextMenu;
