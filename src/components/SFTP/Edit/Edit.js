import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import EditNav from './EditNav';
import EditContents from './EditContents';
import {FlexBox, SFTPBody} from '../../../styles/sftp';

const Edit = ({server}) => {
	const {socket, uuid} = server;
	return (
		<FlexBox>
			<Card.Header>
				<EditNav ws={socket} uuid={uuid} />
			</Card.Header>
			<SFTPBody>
				<EditContents uuid={uuid} />
			</SFTPBody>
		</FlexBox>
	);
};

Edit.propTypes = {
	server: PropTypes.object.isRequired,
};

export default Edit;
