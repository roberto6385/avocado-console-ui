import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE} from '../../styles/global';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Container = styled.div`
	display: flex;
	flex: ${(props) => props?.flex};
	flex-direction: column;
	padding-bottom: 18px;
	margin: 0px 8px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const Input_ = ({title, children, flex}) => {
	return (
		<_Container flex={flex}>
			<_Span>{title}</_Span>
			{children}
		</_Container>
	);
};

Input_.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
	flex: PropTypes.number,
};

export default Input_;
