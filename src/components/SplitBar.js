import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {CHANGE_NUMBER_OF_COLUMNS} from '../reducers/common';
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
			<BsSquareFill
				style={{margin: '10px 5px'}}
				onClick={changeColumn(1, 1)}
			/>
			<FaThLarge
				style={{margin: '10px 5px'}}
				onClick={changeColumn(2, 4)}
			/>
			<FaTh style={{margin: '10px 5px'}} onClick={changeColumn(3, 3)} />
		</SplitButtonContainer>
	);
};

export default SplitBar;
