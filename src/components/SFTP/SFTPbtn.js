import React, {useEffect} from 'react';
import {BiTransferAlt} from 'react-icons/bi';
import {PropTypes} from 'prop-types';
import SSHContainer from '../SSHT/SSHTContainer';

const SFTPbtn = ({data}) => {
	useEffect(() => {
		console.log(data);
	});

	return (
		<button
			style={{background: 'transparent', outline: 'none', border: 'none'}}
		>
			<BiTransferAlt style={{fontSize: '21px'}} />
		</button>
	);
};

SFTPbtn.propTypes = {
	data: PropTypes.object.isRequired,
};

export default SFTPbtn;
