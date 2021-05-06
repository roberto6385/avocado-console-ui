import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {ColBox} from '../../../styles/divs';

const History = ({uuid}) => {
	return (
		<ColBox flex={1}>
			<HistoryNav uuid={uuid} />
			<HistoryContents uuid={uuid} />
		</ColBox>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
