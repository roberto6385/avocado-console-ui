import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import HistoryContents from './HistoryContents';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
`;

const HistoryBox = styled.div`
	//	나중에 이 부분에서 히스토리 min-width 주면 돼
	// flex: 1;
	display: flex;
	flex-direction: column;
`;

const History = ({index, socket}) => {
	return (
		<HistoryBox>
			<Card.Header style={{position: 'relative'}}>
				히스토리 버튼들
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
