import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {ColBox, RowBox} from '../../../styles/divs';

const History = ({uuid}) => {
	return (
		<RowBox minWidth={'250px'}>
			<ColBox width={'100%'}>
				<HistoryNav uuid={uuid} />
				<HistoryContents uuid={uuid} />
			</ColBox>
		</RowBox>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
