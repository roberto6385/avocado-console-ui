import React from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from './Dropzone';

const HistoryContents = ({index, ws, uuid}) => {
	return (
		<Dropzone onDrop={(file) => console.log(file)}>
			HistoryContents
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
