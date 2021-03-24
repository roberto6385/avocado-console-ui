import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {CHANGE_NUMBER_OF_COLUMNS} from '../reducers/common';
import {BsSquareFill, FaTh, FaThLarge} from 'react-icons/all';
import {MAIN_COLOR, NAV_HEIGHT} from '../styles/global';

const SplitButtonContainer = styled.div`
	height: ${NAV_HEIGHT};
	display: flex;
	align-items: center;
`;

const IconButton = styled.button`
	background: transparent;
	outline: none;
	border: none;
	&:hover {
		color: ${MAIN_COLOR};
	}
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
			<IconButton onClick={changeColumn(1, 1)}>
				<BsSquareFill />
			</IconButton>
			<IconButton>
				<FaThLarge onClick={changeColumn(2, 4)} />
			</IconButton>
			<IconButton>
				<FaTh onClick={changeColumn(3, 3)} />
			</IconButton>
		</SplitButtonContainer>
	);
};

export default SplitBar;
