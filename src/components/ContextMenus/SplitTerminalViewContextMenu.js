import React, {useCallback} from 'react';
import {animation, Item} from 'react-contexify';
import {useDispatch} from 'react-redux';
import {DropDownMenu} from '../../styles/components/contextMenu';
import {tabBarAction} from '../../reducers/tabBar';

const SplitTerminalViewContextMenu = () => {
	const dispatch = useDispatch();

	const onClickChangeTerminalView = useCallback(
		(cols) => () => {
			dispatch(tabBarAction.setColumn(cols));
		},
		[dispatch],
	);

	return (
		<DropDownMenu
			id={'split-terminal-view-context-menu'}
			animation={animation.slide}
		>
			<Item onClick={onClickChangeTerminalView(1)}>No Columns</Item>
			<Item onClick={onClickChangeTerminalView(2)}>2 Columns</Item>
			<Item onClick={onClickChangeTerminalView(3)}>3 Columns</Item>
			<Item onClick={onClickChangeTerminalView(4)}>4 Columns</Item>
			<Item onClick={onClickChangeTerminalView(5)}>5 Columns</Item>
		</DropDownMenu>
	);
};

export default SplitTerminalViewContextMenu;
