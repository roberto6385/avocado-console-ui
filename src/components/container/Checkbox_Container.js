import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import {GREEN_COLOR, AVOCADO_FONTSIZE} from '../../styles/global_design';

const Container = styled.div`
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

const Label = styled.label`
	font-size: ${AVOCADO_FONTSIZE};
	::bofore,
	::after {
		font-size: 15px;
	}
`;

const Svg = styled.svg`
	border-radius: 4px;
	background: ${GREEN_COLOR};
	font-size: 15px !important;
`;

const Checkbox_Container = ({title, value, setValue}) => {
	return (
		<div className='pretty p-svg p-curve'>
			<input
				type='checkbox'
				checked={value}
				onChange={(e) => setValue(e.target.checked)}
			/>
			<Container className='state p-success'>
				<Svg className='svg svg-icon' viewBox='0 0 20 20'>
					<path
						d='M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z'
						style={{stroke: 'white', fill: 'white'}}
					/>
				</Svg>
				<Label>{title}</Label>
			</Container>
		</div>
	);
};

Checkbox_Container.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default Checkbox_Container;
