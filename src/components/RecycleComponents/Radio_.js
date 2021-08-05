import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {radioIcon, unCheckedRadioIcon} from '../../icons/icons';

const _Container = styled.div`
	z-index: 0;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const InputContainer = styled.div`
	svg {
		fill: ${(props) =>
			props.type === 'on'
				? props.theme.basic.pages.radios.normalStyle.check.font.color
				: props.theme.basic.pages.radios.normalStyle.default.font
						.color}};
	}
`;

const Radio_ = ({radioName, options, value, setValue, disabled}) => {
	// const {current: height} = useRef(`${(options.length * 2 - 1) * 16}px`);

	return (
		<div>
			{options.map((op, index) => {
				return (
					<_Container
						opacity={disabled.toString()}
						key={index}
						className='pretty p-svg p-curve p-plain p-toggle p-thick'
					>
						<input
							type='radio'
							name={radioName}
							value={op.value}
							disabled={disabled}
							onChange={(e) => setValue(e.target.value)}
							checked={value === op.value}
						/>

						<InputContainer type={'on'} className='state p-on'>
							{radioIcon}
							<label>{op.label}</label>
						</InputContainer>
						<InputContainer type={'off'} className='state p-off'>
							{unCheckedRadioIcon}
							<label>{op.label}</label>
						</InputContainer>
					</_Container>
				);
			})}
		</div>
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
