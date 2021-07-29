import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {disabledButtonFontColor, L_GREEN_NORMAL} from '../../styles/color';

const _Container = styled.div`
	padding: 0px 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 0px 8px;
	height: ${(props) => props?.height};

	.pretty.p-default.p-round {
		display: table;
		width: fit-content;
		z-index: 0;
	}

	.pretty.p-default input:checked ~ .state label:after {
		background-color: ${L_GREEN_NORMAL} !important;
	}
	.pretty.p-default input:disabled ~ .state label:after {
		background-color: ${disabledButtonFontColor[1]} !important;
	}
`;

const Radio_ = ({radioName, options, value, setValue, disabled}) => {
	const {current: height} = useRef(`${(options.length * 2 - 1) * 16}px`);

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
