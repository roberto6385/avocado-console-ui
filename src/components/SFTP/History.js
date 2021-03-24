import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {HistoryBody, HistoryBox} from '../../styles/sftp';

const History = ({index, socket}) => {
	return (
		<HistoryBox>
			<Card.Header>
				<HistoryNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<HistoryBody>
				<HistoryContents
					id={`sftp ${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</HistoryBody>
		</HistoryBox>
	);
};

History.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default History;
