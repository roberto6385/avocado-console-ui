import React from 'react';
import {useDropzone} from 'react-dropzone';
import {SFTPBody} from '../../styles/cards';

// eslint-disable-next-line react/prop-types
const Dropzone = ({children, onDrop, accept}) => {
	const {getRootProps} = useDropzone({
		onDrop,
		accept,
	});
	return (
		<SFTPBody direction='column' width={'200px'} {...getRootProps()}>
			{children}
		</SFTPBody>
	);
};

export default Dropzone;
