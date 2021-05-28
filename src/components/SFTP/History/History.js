import React from 'react';
import PropTypes from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import styled from 'styled-components';
import {LIGHT_MODE_BORDER_COLOR, SIDE_WIDTH} from '../../../styles/global';

const _Container = styled.div`
	min-width: ${SIDE_WIDTH};
	width: ${SIDE_WIDTH};
	border-left: 1px solid ${LIGHT_MODE_BORDER_COLOR};
`;

const History = ({uuid}) => {
	return (
		<_Container>
			<HistoryNav uuid={uuid} />
			<HistoryContents uuid={uuid} />
		</_Container>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
