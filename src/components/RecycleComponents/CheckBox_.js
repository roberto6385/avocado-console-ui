import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
	checkIcon,
	checkOutlineIcon,
	indeterminateIcon,
} from '../../icons/icons';

const Container = styled.div`
	z-index: 0;
	opacity: ${(props) => props?.opacity && '0.24'};
`;

const InputContainer = styled.div`
	svg {
		fill: ${(props) => props?.color || '#757575'}};
	}
`;

const CheckBox_ = ({
	title = '',
	value,
	handleCheck,
	indeterminate = false, // 체크박스 하위 항목중 일부 체크 시
	disabled = false,
}) => {
	const theme = useSelector((state) => state.common.theme);

	return (
		<Container
			opacity={disabled}
			className='pretty p-svg p-curve p-plain p-toggle p-thick'
		>
			<input
				type='checkbox'
				onChange={handleCheck}
				checked={value}
				disabled={disabled}
			/>
			{indeterminate ? (
				<InputContainer color={'#757575'} className='state p-on'>
					{indeterminateIcon}
					<label>{title}</label>
				</InputContainer>
			) : (
				<InputContainer color={'#178082'} className='state p-on'>
					{checkIcon}
					<label>{title}</label>
				</InputContainer>
			)}
			<InputContainer color={'#757575'} className='state p-off'>
				{checkOutlineIcon}
				<label>{title}</label>
			</InputContainer>
		</Container>
	);
};

CheckBox_.propTypes = {
	title: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	handleCheck: PropTypes.func.isRequired,
	indeterminate: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default CheckBox_;
