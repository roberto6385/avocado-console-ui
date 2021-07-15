import React from 'react';
import PropTypes from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {borderColor, tabColor} from '../../../styles/color';
import {WIDTH_256} from '../../../styles/length';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	min-width: ${WIDTH_256};
	width: ${WIDTH_256};
	border-left: 1px solid;
	border-color: ${(props) => props.bcolor};
	background: ${(props) => props.back};
`;

const History = ({uuid}) => {
	const theme = useSelector((state) => state.common.theme);

	return (
		// <_Container back={tabColor[theme]} bcolor={borderColor[theme]}>
		<HistoryContents uuid={uuid} />
		// </_Container>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
