import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE} from '../../styles/global_design';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Container = styled.div`
	display: flex;
	width: ${(props) => props?.width};
	flex-direction: column;
	padding-bottom: 18px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const Input_Container = ({title, children, width = '100%'}) => {
	return (
		<_Container width={width}>
			<_Span>{title}</_Span>
			{children}
		</_Container>
	);
};

Input_Container.propTypes = {
	title: PropTypes.string.isRequired,
	width: PropTypes.string,
	children: PropTypes.element.isRequired,
};

export default Input_Container;
