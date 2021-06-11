import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FONT_14} from "../../styles/length";

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${FONT_14};
`;

const _Container = styled.div`
	display: flex;
	flex: ${(props) => props?.flex};
	flex-direction: column;
	padding-bottom: 18px;
	margin: 0px 8px;
	font-size: ${FONT_14};
`;

const Input_ = ({title, children, flex}) => {
	return (
		<_Container flex={flex}>
			{title && <_Span>{title}</_Span>}
			{children}
		</_Container>
	);
};

Input_.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired,
	flex: PropTypes.number,
};

export default Input_;
