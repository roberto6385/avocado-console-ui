import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {activeColor} from '../../styles/color';

const Container = styled.div`
	z-index: 0;
`;

const _I = styled.i`
background: ${(props) => activeColor[props.themeValue]}; ,
borderRadius: '4px',

`;

const Checkbox_ = ({title = '', themeValue, value, handleCheck}) => {
	const {theme} = useSelector((state) => state.common);

	return (
		<Container className='pretty p-icon p-curve'>
			<input type='checkbox' onChange={handleCheck} checked={value} />
			<div className='state p-success'>
				<_I
					className='icon material-icons'
					themeValue={themeValue === undefined ? theme : themeValue}
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
	themeValue: PropTypes.number,
	value: PropTypes.bool.isRequired,
	handleCheck: PropTypes.func.isRequired,
};

export default Checkbox_;
