import React from 'react';
import PropTypes from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import styled from 'styled-components';
import {borderColor, SIDE_WIDTH} from '../../../styles/global';
import {useSelector} from 'react-redux';

const _Container = styled.div`
	min-width: ${SIDE_WIDTH};
	width: ${SIDE_WIDTH};
	border-left: 1px solid;
	border-color: ${(props) => props.b_color};
`;

const History = ({uuid}) => {
	const {theme} = useSelector((state) => state.common);
	return (
		<_Container b_color={borderColor[theme]}>
			<HistoryNav uuid={uuid} />
			<HistoryContents uuid={uuid} />
		</_Container>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
