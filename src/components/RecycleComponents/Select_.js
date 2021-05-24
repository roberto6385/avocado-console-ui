import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE, EIGHTEEN} from '../../styles/global_design';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Container = styled.div`
	padding-bottom: ${EIGHTEEN};
`;

const _Select = styled(Select)`
	width: 268px;
	margin-top: 6px;
	.css-yk16xz-control {
		height: 34px;
		min-height: 34px !important;
	}
	.css-g1d714-ValueContainer {
		top: -2px;
	}
	.css-1hb7zxy-IndicatorsContainer {
		position: relative;
		height: 34px;
		span {
			display: none !important;
		}
		div {
			height: 34px;
		}
	}
	.css-1pahdxg-control {
		height: 34px;
		min-height: 34px !important;
	}
`;

const Select_ = ({title, options, value, setValue}) => {
	return (
		<_Container>
			<_Span>{title}</_Span>
			<_Select
				value={options.find((op) => {
					return op.value === value;
				})}
				options={options}
				onChange={(e) => setValue(e.value)}
			/>
		</_Container>
	);
};

Select_.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default Select_;
