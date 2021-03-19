import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const DropzoneBox = styled.div`
	height: 100%;
`;

// eslint-disable-next-line react/prop-types
const Dropzone = ({children, onDrop, accept}) => {
	const {getRootProps} = useDropzone({
		onDrop,
		accept,
	});
	return <DropzoneBox {...getRootProps()}>{children}</DropzoneBox>;
};

export default Dropzone;
