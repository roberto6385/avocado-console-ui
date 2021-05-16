import React from 'react';
import * as PropTypes from 'prop-types';

const SSH_SFTP = ({uuid}) => {
	return (
		<div>
			ssh / sftp container
			<p>{uuid}</p>
		</div>
	);
};

SSH_SFTP.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SSH_SFTP;
