import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import EditNav from './EditNav';
import EditContents from './EditContents';
import {FlexBox, SFTPBody} from '../../../styles/sftp';

const Edit = ({server}) => {
	return (
		<FlexBox>
			<Card.Header>
				<EditNav server={server} />
			</Card.Header>
			<SFTPBody>
				<EditContents server={server} />
			</SFTPBody>
		</FlexBox>
	);
};

Edit.propTypes = {
	server: PropTypes.object.isRequired,
};

export default Edit;
