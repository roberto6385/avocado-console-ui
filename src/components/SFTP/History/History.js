import React from 'react';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {BaseCard, MainHeader, SFTPHistoryBody} from '../../../styles/cards';

const History = ({uuid}) => {
	return (
		<BaseCard>
			<MainHeader>
				<HistoryNav uuid={uuid} />
			</MainHeader>
			<SFTPHistoryBody>
				<HistoryContents uuid={uuid} />
			</SFTPHistoryBody>
		</BaseCard>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
