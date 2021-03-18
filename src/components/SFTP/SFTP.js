import React from 'react';
import {PropTypes} from 'prop-types';

const SFTP_Body = ({index, ws, uuid}) => {
	return <div>SFTP_Body</div>;
};

SFTP_Body.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default SFTP_Body;
