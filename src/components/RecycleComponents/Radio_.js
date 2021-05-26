import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {GREEN_COLOR} from '../../styles/global';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: ${(props) => props?.height};

	.pretty.p-default.p-round {
		z-index: 0;
	}

	.pretty.p-default input:checked ~ .state label:after {
		background-color: ${GREEN_COLOR} !important;
	}
	.pretty.p-default input:disabled ~ .state label:after {
		background-color: white !important;
	}
`;

const Radio_ = ({radioName, options, value, setValue, disabled}) => {
	let height = `${(options.length * 2 - 1) * 16}px`;
	return (
		<_Container height={height}>
			{options.map((op, index) => {
				return (
					<div key={index} className='pretty p-default p-round'>
						<input
							type='radio'
							name={radioName}
							value={op.value}
							disabled={disabled}
							onChange={(e) => setValue(e.target.value)}
							checked={value === op.value}
						/>
						<div className='state'>
							<label>{op.label}</label>
						</div>
					</div>
				);
			})}
		</_Container>
	);
};

Radio_.propTypes = {
	options: PropTypes.array.isRequired,
	radioName: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
};

export default Radio_;
