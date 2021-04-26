import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {HistoryBody, HistoryBox} from '../../../styles/sftp';

const History = ({uuid}) => {
	return (
		<HistoryBox>
			<Card.Header>
				<HistoryNav uuid={uuid} />
			</Card.Header>
			<HistoryBody>
				<HistoryContents uuid={uuid} />
			</HistoryBody>
		</HistoryBox>
	);
};

History.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default History;
