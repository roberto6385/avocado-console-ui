import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import styled from 'styled-components';
import {SIDE_WIDTH} from '../../../styles/global_design';

const History_Container = styled.div`
	min-width: ${SIDE_WIDTH};
	width: ${SIDE_WIDTH};
`;

const History = ({uuid}) => {
	return (
		<History_Container>
			<HistoryNav uuid={uuid} />
			<HistoryContents uuid={uuid} />
		</History_Container>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
