import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const Dropzone_Container = styled.div`
	outline: none;
`;
// eslint-disable-next-line react/prop-types
const Dropzone = ({children, onDrop, accept}) => {
	const {getRootProps} = useDropzone({
		onDrop,
		accept,
	});
	return (
		<Dropzone_Container {...getRootProps()}>{children}</Dropzone_Container>
	);
};

export default Dropzone;
