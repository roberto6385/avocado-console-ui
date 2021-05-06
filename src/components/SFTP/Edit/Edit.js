import React from 'react';
import {PropTypes} from 'prop-types';
import {Card} from 'react-bootstrap';
import EditNav from './EditNav';
import EditContents from './EditContents';
import {FlexBox} from '../../../styles/sftp';
import {SFTPBody} from '../../../styles/cards';
import {ColBox} from '../../../styles/divs';

const Edit = ({uuid}) => {
	return (
		<ColBox>
			<EditNav uuid={uuid} />
			<EditContents uuid={uuid} />
		</ColBox>
	);
};

Edit.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default Edit;
