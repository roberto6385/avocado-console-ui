import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE, EIGHTEEN} from '../../styles/global';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Container = styled.div`
	padding-bottom: ${EIGHTEEN};
	margin: 0px 8px;
	flex: ${(props) => props.flex};
`;

const _Select = styled(Select)`
	width: ${(props) => props.width};
	margin-top: 6px;
	.css-26l3qy-menu {
		z-index: 10;
		// 드롭메뉴 z-index 속성 추가.
	}
	.css-yk16xz-control {
		height: 34px;
		min-height: 34px !important;
	}
	.css-g1d714-ValueContainer {
		top: -2px;
		padding: 0px 8px;
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

const Select_ = ({title, options, value, setValue, width, flex}) => {
	return (
		<_Container flex={flex}>
			<_Span>{title}</_Span>
			<_Select
				value={options.find((op) => {
					return op.value === value;
				})}
				options={options}
				onChange={(e) => setValue(e.value)}
				width={width}
			/>
		</_Container>
	);
};

Select_.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	flex: PropTypes.string,
	width: PropTypes.string,
};

export default Select_;
