import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../icons/icons';

const Container = styled.div`
	z-index: 0;
	opacity: ${(props) => (props.opacity === 'true' ? 0.24 : 1)};
`;

const InputContainer = styled.div`
	svg {
		fill: ${(props) =>
			(props.type === 'indeterminate' &&
				props.theme.basic.pages.checkBoxs.normalStyle.default.font
					.color) ||
			(props.type === 'check' &&
				props.theme.basic.pages.checkBoxs.normalStyle.check.font
					.color) ||
			(props.type === 'checkout' &&
				props.theme.basic.pages.checkBoxs.normalStyle.default.font
					.color)}};
		
	}
`;

const CheckBox = ({
	title = '',
	value,
	onChangeCheck = () => {},
	indeterminate = false, // 체크박스 하위 항목중 일부 체크 시
	disabled = false,
}) => {
	return (
		<Container
			opacity={disabled.toString()}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type='checkbox'
				onChange={onChangeCheck}
				checked={value}
				disabled={disabled}
			/>
			{indeterminate ? (
				<InputContainer type={'indeterminate'} className='state p-on'>
					{indeterminateIcon}
					<label>{title}</label>
				</InputContainer>
			) : (
				<InputContainer type={'check'} className='state p-on'>
					{checkIcon}
					<label>{title}</label>
				</InputContainer>
			)}
			<InputContainer type={'checkout'} className='state p-off'>
				{checkOutlineIcon}
				<label>{title}</label>
			</InputContainer>
		</Container>
	);
};

CheckBox.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
	onChangeCheck: PropTypes.func,
	indeterminate: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default CheckBox;
