import React from 'react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const _Container = styled.div`
	height: 100%;
	outline: none;
	overflow: scroll;
	flex: 1;
`;

const Dropzone = ({children, onDrop}) => {
	const {getRootProps} = useDropzone({
		onDrop,
	});

	return <_Container {...getRootProps()}>{children}</_Container>;
};

Dropzone.propTypes = {
	children: PropTypes.element,
	onDrop: PropTypes.func,
};

export default Dropzone;
