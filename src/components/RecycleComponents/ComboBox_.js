import React, {useCallback, useMemo, useRef} from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const _Title = styled.div`
	margin: 0 10px 2px 0;
	letter-spacing: 0.1px;
	line-height: 1.5;
`;

const _Container = styled.div`
	margin-bottom: 16px;
	flex: ${(props) => props.flex};
`;

const _Selection = styled(Select)`
	.Select__control {
		transition: initial;
		width: ${(props) => props.width};
		display: flex;
		flex: 1;
		align-items: center;
		height: 34px;
		min-height: 34px !important;
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.control.backgroundColor};
		border: 1px solid;
		border-color: ${(props) =>
			props.theme.basic.pages.comboBoxs.control.border.color};
		border-radius: 4px;
		cursor: pointer;

		.Select__value-container--has-value {
			position: absolute;
			right: 0px;
			top: -1px;
			height: 34px;
			width: 100%;
		}
		.Select__indicators {
			position: absolute;
			right: 0px;
			top: -1px;
			height: 34px;
			svg {
				color: ${(props) =>
					props.isDisabled
						? props.theme.basic.pages.comboBoxs.options.disabled
								.font.color
						: props.theme.basic.pages.comboBoxs.control.font.color};
			}
		}
	}

	.Select__single-value {
		color: ${(props) =>
			props.theme.basic.pages.comboBoxs.control.font.color};
	}
	.Select__single-value--is-disabled {
		color: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.disabled.font.color};
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.disabled.backgroundColor};
		outline: none;
	}

	.Select__control:hover {
		border-color: ${(props) =>
			props.theme.basic.pages.comboBoxs.control.border.color};
	}

	.Select__control--is-focused {
		box-shadow: 0 0 0 1px
			${(props) =>
				props.theme.basic.pages.comboBoxs.control.focused.border.color};
		outline: none;
	}

	.Select__indicator-separator {
		display: none;
	}

	.Select__option {
		cursor: pointer;
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.menuList.backgroundColor
				.normalStyle};
	}
	.Select__option:hover {
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.hover.backgroundColor};
	}
	.Select__option--is-selected {
		color: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.font.color};
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.selected.backgroundColor};
	}
	.Select__menu-list {
		border-radius: 4px;
		color: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.font.color};
		background: ${(props) =>
			props.theme.basic.pages.comboBoxs.menuList.backgroundColor
				.normalStyle};
	}
	.Select__menu {
		color: ${(props) =>
			props.theme.basic.pages.comboBoxs.options.font.color};
		max-width: ${(props) => props.width};
	}
`;

const ComboBox_ = ({
	title,
	options,
	value,
	setValue,
	width,
	flex,
	disabled,
}) => {
	const selectedItemRef = useRef(null);
	const selectedValue = useMemo(
		() => options.find((op) => op.value === value),
		[options, value],
	);

	const onChnageSelectedItem = useCallback(
		(e) => {
			setValue(e.value);
			selectedItemRef.current?.blur();
		},
		[setValue],
	);

	return (
		<_Container flex={flex}>
			<_Title>{title}</_Title>
			<_Selection
				ref={selectedItemRef}
				classNamePrefix='Select'
				isSearchable={false}
				options={options}
				value={{value: selectedValue.value, label: selectedValue.label}}
				onChange={onChnageSelectedItem}
				isDisabled={disabled}
				width={width}
			/>
		</_Container>
	);
};

ComboBox_.propTypes = {
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

export default ComboBox_;
