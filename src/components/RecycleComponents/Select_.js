import React, {useCallback, useMemo, useRef} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
	borderColor,
	D_GREEN_ACTIVE,
	fontColor,
	identityHigh,
	inputBack,
	popupSelectSelectedColor,
	popupSelectColor,
	popupSelectHoverColor,
	selectSelectedColor,
	selectColor,
	selectHoverColor,
	selectInputColor,
} from '../../styles/color';
import {useSelector} from 'react-redux';

const _Title = styled.div`
	margin: 0 10px 2px 0;
	letter-spacing: 0.1px;
	line-height: 1.5;
`;

const _Container = styled.div`
	margin-bottom: 16px;
	flex: ${(props) => props.flex};
`;

const _Select = styled(Select)`
	max-width: 500px;
	div {
		border-color: ${(props) => borderColor[props.theme_value]};
		transition: initial;
		&:hover {
			border-color: ${(props) => borderColor[props.theme_value]};
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
			// background: ${(props) => inputBack[props.theme_value]};
			background: ${(props) =>
				!props.popup
					? selectColor[props.theme_value]
					: popupSelectColor[props.theme_value]};
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
	disabled,
	popup,
}) => {
	const {theme} = useSelector((state) => state.common);
	const selectRef = useRef(null);
	const val = useMemo(
		() => options.find((op) => op.value === value),
		[options, value],
	);
	const colourStyles = {
		// borderColor: '#e3e5e5',
		minHeight: '34px',
		control: (styles, {isFocused}) => ({
			...styles,
			display: 'flex',
			alignItems: 'center',
			height: '34px',
			minHeight: '34px',
			lineHeight: '34px',
			width: width,
			borderColor: identityHigh[theme],
			backgroundColor: selectInputColor[theme],
			boxShadow: `0 0 0 1px ${
				isFocused ? D_GREEN_ACTIVE : 'transparent'
			} !important`,

			// cursor: isDisabled ? 'not-allowed' : 'pointer',
		}), // 일반 back
		option: (styles, {isDisabled, isFocused, isSelected}) => {
			return {
				...styles,
				backgroundColor: !popup
					? isDisabled
						? null
						: isSelected
						? selectSelectedColor[theme] //selected
						: isFocused
						? selectHoverColor[theme] //hover
						: selectColor[theme] // normal
					: isDisabled
					? null
					: isSelected
					? popupSelectSelectedColor[theme] //selected
					: isFocused
					? popupSelectHoverColor[theme] //hover
					: popupSelectColor[theme], // normal

				color: fontColor[theme],
				cursor: isDisabled ? 'not-allowed' : 'pointer',
				maxWidth: width,
				margin: 'auto',
				':active': {
					...styles[':active'],
					backgroundColor: !popup
						? selectColor[theme]
						: popupSelectColor[theme], // active back
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

	const handleChange = useCallback(
		(e) => {
			setValue(e.value);
			selectRef.current?.blur();
		},
		[selectRef],
	);

	return (
		<_Container flex={flex}>
			<_Title>{title}</_Title>
			<_Select
				ref={selectRef}
				value={val}
				isSearchable={false}
				options={options}
				onChange={handleChange}
				isDisabled={disabled}
				styles={colourStyles}
				theme_value={theme}
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
	popup: PropTypes.bool,
};

export default Select_;
