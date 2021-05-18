import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE, EIGHTEEN} from '../../styles/global_design';
const Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const Container_Box = styled.div`
	padding-bottom: ${EIGHTEEN};
`;

const Select_Container = ({title, options}) => {
	return (
		<Container_Box>
			<Span>{title}</Span>
			<Select defaultValue={options[0]} options={options} />
		</Container_Box>
	);
};

Select_Container.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

export default Select_Container;
