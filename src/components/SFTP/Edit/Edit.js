import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import EditNav from './EditNav';
import EditContents from './EditContents';
import {FlexBox, SFTPBody} from '../../../styles/sftp';

const Edit = ({index, socket}) => {
	return (
		<FlexBox>
			<Card.Header>
				<EditNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<SFTPBody>
				<EditContents index={index} ws={socket.ws} uuid={socket.uuid} />
			</SFTPBody>
		</FlexBox>
	);
};

Edit.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default Edit;
