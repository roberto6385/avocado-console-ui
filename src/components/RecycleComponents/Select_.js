import React, {useRef} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FONT_14, FONT_18} from '../../styles/length';
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	greyBackgroundActiveButtonColor,
	greyBackgroundNormalButtonColor,
	iconColor,
	identityHigh,
	L_LOGO,
	logoColor,
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
			background: ${(props) =>
				greyBackgroundNormalButtonColor[props.themeValue]};
		}
		.css-gnk6iv-control {
			box-shadow: 0 0 0 1px #31bbb3;
		}
	}
`;

const Select_ = ({
	title,
	options,
	value,
	setValue,
	width,
	flex,
	back,
	b_color,
	color,
	disabled,
}) => {
	const {theme} = useSelector((state) => state.common);
	const selectRef = useRef(null);
	const colourStyles = {
		// borderColor: '#e3e5e5',
		minHeight: '34px',
		control: (styles, {isFocused, isSelected}) => ({
			...styles,
			display: 'flex',
			alignItems: 'center',
			height: '34px',
			minHeight: '34px',
			lineHeight: '34px',
			width: width,
			borderColor: identityHigh[theme],
			backgroundColor: greyBackgroundNormalButtonColor[theme],
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
					: greyBackgroundNormalButtonColor[theme], // normal
				color: fontColor[theme],
				cursor: isDisabled ? 'not-allowed' : 'default',
				':active': {
					...styles[':active'],
					backgroundColor: greyBackgroundActiveButtonColor[theme], // active back
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
