import React from 'react';
import {PropTypes} from 'prop-types';

const HistoryContents = ({index, ws, uuid}) => {
	return <div>HistoryContents</div>;
};
HistoryContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
