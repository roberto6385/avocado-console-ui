import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import styled from 'styled-components';
import {NAV_HEIGHT} from '../../styles/global';
import EditNav from './EditNav';
import EditContents from './EditContents';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
	display: flex;
	overflow: hidden;
`;

const FlexBox = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	.card-header {
		display: flex;
		align-items: center;
		position: relative;
		height: ${NAV_HEIGHT};
	}
`;

const Edit = ({index, socket}) => {
	return (
		<FlexBox>
			<Card.Header>
				<EditNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<SFTPBody>
				<EditContents
					id={`sftp ${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SFTPBody>
		</FlexBox>
	);
};

Edit.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default Edit;
