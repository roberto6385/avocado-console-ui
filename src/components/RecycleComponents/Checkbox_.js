import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {GREEN_COLOR, AVOCADO_FONTSIZE} from '../../styles/global';

const _LabelContainer = styled.div`
	display: flex;
	align-items: center;
	margin: 0.2px;
	label:before {
		font-size: 15px !important;
	}
	label:after {
		font-size: 15px !important;
	}
`;

const _Label = styled.label`
	font-size: ${AVOCADO_FONTSIZE};
	::bofore,
	::after {
		font-size: 15px;
	}
`;

const _Svg = styled.svg`
	border-radius: 4px;
	background: ${GREEN_COLOR};
	font-size: 15px !important;
`;

const _Container = styled.div`
	padding: 7px 8px;
	.pretty.p-curve .state label:after,
	.pretty.p-curve .state label:before {
		border-radius: 20%;
		background: white;
		border: 1px solid;
	}
	.pretty.p-default.p-round {
		z-index: 0;
	}
`;

const Checkbox_ = ({title, value, setValue}) => {
	return (
		<_Container>
			<div className='pretty p-svg p-curve'>
				<input
					type='checkbox'
					checked={value}
					onChange={(e) => setValue(e.target.checked)}
				/>
				<_LabelContainer className='state p-success'>
					<_Svg className='svg svg-icon' viewBox='0 0 20 20'>
						<path
							d='M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z'
							style={{stroke: 'white', fill: 'white'}}
						/>
					</_Svg>
					<_Label>{title}</_Label>
				</_LabelContainer>
			</div>
		</_Container>
	);
};

Checkbox_.propTypes = {
	title: PropTypes.string,
	value: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default Checkbox_;
