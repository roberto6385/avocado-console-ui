import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {radioIcon, unCheckedRadioIcon} from '../../icons/icons';

const _Container = styled.div`
	z-index: 0;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const _Option = styled.div`
	svg {
		fill: ${(props) =>
			props.type === 'on'
				? props.theme.basic.pages.radios.normalStyle.check.font.color
				: props.theme.basic.pages.radios.normalStyle.default.font
						.color}};
	}
`;

const Radio = ({options, value, setValue, disabled}) => {
	return (
		<div>
			{options.map((v, index) => {
				return (
					<_Container
						opacity={disabled.toString()}
						key={index}
						className='pretty p-svg p-curve p-plain p-toggle p-thick'
					>
						<input
							type='radio'
							value={v.value}
							disabled={disabled}
							onChange={(e) => setValue(e.target.value)}
							checked={value === v.value}
						/>

						<_Option type={'on'} className='state p-on'>
							{radioIcon}
							<label>{v.label}</label>
						</_Option>
						<_Option type={'off'} className='state p-off'>
							{unCheckedRadioIcon}
							<label>{v.label}</label>
						</_Option>
					</_Container>
				);
			})}
		</div>
	);
};

Radio.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
};

export default Radio;
