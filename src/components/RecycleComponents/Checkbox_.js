import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {activeColor} from '../../styles/color';
import checkbox from '../../json/components/checkbox.json';

const Container = styled.div`
	z-index: 0;
`;

const _I = styled.i`
	background: ${(props) => activeColor[props.theme_value]};
	border-radius: 4px;
`;

const Checkbox_ = ({title = '', theme_value, value, handleCheck}) => {
	const theme = useSelector((state) => state.common.theme);

	return (
		<Container className='pretty p-icon p-curve'>
			<input type='checkbox' onChange={handleCheck} checked={value} />
			<div className='state p-success'>
				<_I
					className='icon material-icons'
					theme_value={
						theme_value === undefined ? theme : theme_value
					}
					//TODO color={checkbox.i.background[theme]}
				>
					done
				</_I>
				<label>{title}</label>
			</div>
		</Container>
	);
};

Checkbox_.propTypes = {
	title: PropTypes.string,
	theme_value: PropTypes.number,
	value: PropTypes.bool.isRequired,
	handleCheck: PropTypes.func.isRequired,
};

export default Checkbox_;
