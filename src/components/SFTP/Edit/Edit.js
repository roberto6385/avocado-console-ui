import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import EditNav from './EditNav';
import EditContents from './EditContents';
import {FlexBox, SFTPBody} from '../../../styles/sftp';

const Edit = ({uuid}) => {
	return (
		<FlexBox>
			<Card.Header>
				<EditNav uuid={uuid} />
			</Card.Header>
			<SFTPBody>
				<EditContents uuid={uuid} />
			</SFTPBody>
		</FlexBox>
	);
};

Edit.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default Edit;
