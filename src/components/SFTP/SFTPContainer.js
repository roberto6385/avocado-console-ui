import React, {useCallback} from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

const SftpContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
`;

const SFTPBody = styled(Card.Body)`
	padding: 0px;
`;

const SFTPContainer = ({index, my_server, socket}) => {
	const {server} = useSelector((state) => state.common);

	const onCLickChangeCurrentTab = useCallback(() => {
		// dispatch({type: CHANGE_CURRENT_TAB, data: id});
	}, []);

	return (
		<SftpContainer>
			<Card.Header style={{position: 'relative'}}>
				네비게이션 버튼들
			</Card.Header>
			<SFTPBody onClick={onCLickChangeCurrentTab}>
				<SSHT
					id={`ssht_${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SFTPBody>
		</SftpContainer>
	);
};

SFTPContainer.propTypes = {
	index: PropTypes.number.isRequired,
	my_server: PropTypes.object.isRequired,
	socket: PropTypes.object.isRequired,
};

export default SFTPContainer;
