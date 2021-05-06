import React from 'react';
import {PropTypes} from 'prop-types';
import EditNav from './EditNav';
import EditContents from './EditContents';
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
