import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';

const _Container = styled.div`
	outline: none;
	flex: 1;
`;
// eslint-disable-next-line react/prop-types
const Dropzone = ({children, onDrop, accept}) => {
	const {getRootProps} = useDropzone({
		onDrop,
		accept,
	});
	return (
		<_Container className={'hello'} {...getRootProps()}>
			{children}
		</_Container>
	);
};

export default Dropzone;
