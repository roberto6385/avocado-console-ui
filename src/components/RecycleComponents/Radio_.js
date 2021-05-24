import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100px;
`;

const Radio_ = ({radioName, options, value, setValue, disabled}) => {
	return (
		<_Container>
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
