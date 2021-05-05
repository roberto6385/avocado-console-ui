import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {BaseCard} from '../../../styles/cards';

const History = ({uuid}) => {
	return (
		<BaseCard width='200px'>
			<HistoryNav uuid={uuid} />
			<HistoryContents uuid={uuid} />
		</BaseCard>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
