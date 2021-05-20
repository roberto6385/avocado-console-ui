import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE} from '../../styles/global_design';
const Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const Container_Box = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 18px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const Input_Container = ({title, children}) => {
	return (
		<Container_Box>
			<Span>{title}</Span>
			{children}
		</Container_Box>
	);
};

Input_Container.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};

export default Input_Container;
