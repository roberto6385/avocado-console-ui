import React from 'react';
import Loading from '../images/loading.gif';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const _Img = styled.img`
	width: ${(props) => props?.size}px;
	height: ${(props) => props?.size}px;
`;

const _Container = styled.div`
	z-index: 999;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const LoadingSpinner = ({size = 30}) => {
	return (
		<_Container>
			<p style={{color: 'transparent'}}>loading</p>
			<_Img size={size} src={Loading} alt='' />
		</_Container>
	);
};
LoadingSpinner.propTypes = {
	size: PropTypes.number,
};

export default LoadingSpinner;
