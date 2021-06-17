import React from 'react';
import styled from 'styled-components';
import PropTypes, {symbol} from 'prop-types';
import {GREEN_COLOR} from '../../styles/global';
import {FONT_14} from '../../styles/length';
import {useSelector} from 'react-redux';
import {activeColor} from '../../styles/color';
//
// const _Input = styled.input`
// 	height: ${(props) => props.size};
// 	width: ${(props) => props.size};
// `;
// const _LabelContainer = styled.div`
// 	display: flex;
// 	align-items: center;
// 	margin: 0.2px;
// 	label:before {
// 		font-size: 15px !important;
// 	}
// 	label:after {
// 		font-size: 15px !important;
// 	}
// `;
//
// const _Label = styled.label`
// 	font-size: ${FONT_14};
// 	::bofore,
// 	::after {
// 		font-size: 15px;
// 		background: red;
// 	}
// `;
//
// const _Svg = styled.svg`
// 	border-radius: 4px;
// 	background: ${GREEN_COLOR};
// 	font-size: 15px !important;
// `;
//

const _Container = styled.div`
	margin: 0px 8px;
`;

const Checkbox_ = ({title, value, setValue}) => {
	const {theme} = useSelector((state) => state.common);

	return (
		<_Container className='pretty p-icon p-curve p-jelly'>
			<input
				type='checkbox'
				onChange={(e) => setValue(e.target.checked)}
				checked={value}
			/>
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
		</_Container>
	);
};

Checkbox_.propTypes = {
	title: PropTypes.string,
	value: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
};

export default Checkbox_;
