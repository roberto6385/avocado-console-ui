import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {HistoryBody, HistoryBox} from '../../../styles/sftp';

const History = ({server}) => {
	return (
		<HistoryBox>
			<Card.Header>
				<HistoryNav server={server} />
			</Card.Header>
			<HistoryBody>
				<HistoryContents server={server} />
			</HistoryBody>
		</HistoryBox>
	);
};

History.propTypes = {
	server: PropTypes.object.isRequired,
};

export default History;
