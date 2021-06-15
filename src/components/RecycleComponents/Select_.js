import React, {useRef} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FONT_14, FONT_18} from '../../styles/length';
import {
	borderColor,
	D_GREEN_ACTIVE,
	fileListHighColor,
	fontColor,
	identityHigh,
	inputBack,
	selectActiveColor,
	selectHoverColor,
} from '../../styles/color';
import {useSelector} from 'react-redux';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${FONT_14};
`;

const _Container = styled.div`
	padding-bottom: ${FONT_18};
	margin: 0px 8px;
	flex: ${(props) => props.flex};
`;

const _Select = styled(Select)`
	max-width: 500px;
	div {
		border-color: ${(props) => borderColor[props.themeValue]};
		transition: initial;
		&:hover {
			border-color: ${(props) => borderColor[props.themeValue]};
		}
		span {
			display: none;
		}
		.css-g1d714-ValueContainer {
			height: 34px;
			position: initial !important;
			line-height: 34px;
		}
		.css-tlfecz-indicatorContainer {
			height: 34px;
			position: initial !important;
		}
		.css-4ljt47-MenuList {
			width: 100%;
			background: ${(props) => inputBack[props.themeValue]};
		}
	}
	// outline 부분
	&:focus {
		background: red;
	}

	// .css-gnk6iv-control {
	// 	box-shadow: 0 0 0 1px ${D_GREEN_ACTIVE} !important;
	// 	outline: none;
	// }
	// .css-16ceq5b-control {
	// 	box-shadow: 0 0 0 1px ${D_GREEN_ACTIVE} !important;
	// 	outline: none;
	// }
`;

const Select_ = ({title, options, value, setValue, width, flex, disabled}) => {
	const {theme} = useSelector((state) => state.common);
	const selectRef = useRef(null);
	const colourStyles = {
		// borderColor: '#e3e5e5',
		minHeight: '34px',
		control: (styles, {isDisabled}) => ({
			...styles,
			display: 'flex',
			alignItems: 'center',
			height: '34px',
			minHeight: '34px',
			lineHeight: '34px',
			width: width,
			borderColor: identityHigh[theme],
			backgroundColor: inputBack[theme],
			// cursor: isDisabled ? 'not-allowed' : 'pointer',
		}), // 일반 back
		option: (styles, {isDisabled, isFocused, isSelected}) => {
			return {
				...styles,
				backgroundColor: isDisabled
					? null
					: isSelected
					? fileListHighColor[theme] //selected
					: isFocused
					? selectHoverColor[theme] //hover
					: inputBack[theme], // normal
				color: fontColor[theme],
				cursor: isDisabled ? 'not-allowed' : 'pointer',
				maxWidth: width,
				margin: 'auto',
				':active': {
					...styles[':active'],
					backgroundColor: selectActiveColor[theme], // active back
				},
			};
		},
		// input: (styles) => ({...styles, borderColor: 'black'}),
		// placeholder: styles => ({ ...styles, ...dot() }),
		singleValue: (styles) => ({
			...styles,
			color: fontColor[theme],
		}), // font color
	};

	const handleChange = (e) => {
		setValue(e.value);
		selectRef.current?.blur();
	};

	return (
		<_Container flex={flex}>
			<_Span>{title}</_Span>
			<_Select
				ref={selectRef}
				value={options.find((op) => {
					return op.value === value;
				})}
				isSearchable={false}
				options={options}
				onChange={handleChange}
				isDisabled={disabled}
				styles={colourStyles}
				themeValue={theme}
				// 선택된 border color, 기본 border color
				// hover color, focus color
			/>
		</_Container>
	);
};

Select_.propTypes = {
	title: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	setValue: PropTypes.func.isRequired,
	flex: PropTypes.number,
	width: PropTypes.string,
	back: PropTypes.string,
	b_color: PropTypes.string,
	color: PropTypes.string,
	disabled: PropTypes.bool,
};

export default Select_;
