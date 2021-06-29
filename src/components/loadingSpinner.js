import React from 'react';
import Loading from '../images/loading.gif';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const Img = styled.img`
	width: ${(props) => props?.size}px;
	height: ${(props) => props?.size}px;
`;

const Container = styled.div`
	z-index: 999;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const LoadingSpinner = ({size = 30}) => {
	return (
		<Container>
			<p style={{color: 'transparent'}}>loading</p>
			<Img size={size} src={Loading} alt='' />
		</Container>
	);
};
LoadingSpinner.propTypes = {
	size: PropTypes.number,
};

export default LoadingSpinner;
