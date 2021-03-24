import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import HistoryContents from './HistoryContents';
import HistoryNav from './HistoryNav';
import {NAV_HEIGHT} from '../../styles/global';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
	border-left: 1px solid rgba(0, 0, 0, 0.3);
`;

const HistoryBox = styled.div`
	min-width: 220px;
	display: flex;
	flex-direction: column;
	.card-header {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: ${NAV_HEIGHT};
	}
`;

const History = ({index, socket}) => {
	return (
		<HistoryBox>
			<Card.Header>
				<HistoryNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<SFTPBody>
				<HistoryContents
					id={`sftp ${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SFTPBody>
		</HistoryBox>
	);
};

History.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default History;
