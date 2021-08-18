import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const _Container = styled.div`
	outline: none;
	overflow: scroll;
	flex: 1;
`;

const Dropzone = ({children, onDrop}) => {
	const {getRootProps} = useDropzone({
		onDrop,
	});

	return (
		<_Container className={'hello'} {...getRootProps()}>
			{children}
		</_Container>
	);
};

Dropzone.propTypes = {
	children: PropTypes.element,
	onDrop: PropTypes.func,
};

export default Dropzone;
