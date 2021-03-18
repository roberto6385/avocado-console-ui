import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {CHANGE_NUMBER_OF_VISIBLE_TAB} from '../reducers/common';
import {BsSquareFill, FaTh, FaThLarge} from 'react-icons/all';
import {NAV_HEIGHT} from '../styles/global';

const SplitButtonContainer = styled.div`
	height: ${NAV_HEIGHT};
	display: flex;
	align-items: center;
`;

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
		<SplitButtonContainer>
			<BsSquareFill
				style={{margin: '10px 5px'}}
				onClick={changeColumn(1, 12)}
				// icon={faWindowMaximize}
			/>
			<FaThLarge
				style={{margin: '10px 5px'}}
				onClick={changeColumn(4, 6)}
			/>
			<FaTh style={{margin: '10px 5px'}} onClick={changeColumn(3, 4)} />
		</SplitButtonContainer>
	);
};

export default SplitBar;
