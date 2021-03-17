import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {CHANGE_NUMBER_OF_VISIBLE_TAB} from '../reducers/common';
import {BsSquareFill, FaTh, FaThLarge} from 'react-icons/all';

const SplitBar = () => {
	const dispatch = useDispatch();

	const changeColumn = useCallback(
		(tabs, cols) => () => {
			// dispatch({
			// 	type: CHANGE_NUMBER_OF_VISIBLE_TAB,
			// 	data: {tabs: tabs, cols: cols},
			// });
		},
		[dispatch],
	);

	return (
		<div style={{float: 'right', marginLeft: '10px', lineHeight: '43px'}}>
			<BsSquareFill
				style={{marginRight: '10px'}}
				onClick={changeColumn(1, 12)}
				// icon={faWindowMaximize}
			/>
			<FaThLarge
				style={{marginRight: '10px'}}
				onClick={changeColumn(4, 6)}
			/>
			<FaTh style={{marginRight: '10px'}} onClick={changeColumn(3, 4)} />
		</div>
	);
};

export default SplitBar;
