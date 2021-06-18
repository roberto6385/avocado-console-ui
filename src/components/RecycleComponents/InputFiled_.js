import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const _Container = styled.div`
	display: flex;
	flex: ${(props) => props?.flex};
	flex-direction: column;
	margin-bottom: 16px;
`;

const _Title = styled.div`
	margin: 0 10px 2px 0;
	letter-spacing: 0.1px;
`;

const InputFiled_ = ({title, children, flex}) => {
	return (
		<_Container flex={flex}>
			{title && <_Title>{title}</_Title>}
			{children}
		</_Container>
	);
};

InputFiled_.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired,
	flex: PropTypes.number,
};

export default InputFiled_;
