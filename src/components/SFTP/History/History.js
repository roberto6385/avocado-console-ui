import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import styled from 'styled-components';
import {BORDER_COLOR, SIDE_WIDTH} from '../../../styles/global_design';

const _Container = styled.div`
	min-width: ${SIDE_WIDTH};
	width: ${SIDE_WIDTH};
	border-left: 1px solid ${BORDER_COLOR};
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
