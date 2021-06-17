import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {activeColor} from '../../styles/color';

const Container = styled.div`
	z-index: 0;
`;

const Checkbox_ = ({title = '', value, handleCheck}) => {
	const {theme} = useSelector((state) => state.common);

	return (
		<Container className='pretty p-icon p-curve'>
			<input type='checkbox' onChange={handleCheck} checked={value} />
			<div className='state p-success'>
				<i
					className='icon material-icons'
					style={{
						background: activeColor[theme],
						borderRadius: '4px',
					}}
				>
					done
				</i>
				<label>{title}</label>
			</div>
		</Container>
	);
};

Checkbox_.propTypes = {
	title: PropTypes.string,
	value: PropTypes.bool.isRequired,
	handleCheck: PropTypes.func.isRequired,
};

export default Checkbox_;
