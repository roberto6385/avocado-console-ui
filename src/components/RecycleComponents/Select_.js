import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {AVOCADO_FONTSIZE, EIGHTEEN} from '../../styles/global';

const _Span = styled.span`
	padding-bottom: 6px;
	font-size: ${AVOCADO_FONTSIZE};
`;

const _Container = styled.div`
	padding-bottom: ${EIGHTEEN};
	margin: 0px 8px;
	flex: ${(props) => props.flex};
`;

// 테마 변경 부분에서 하단 선택 부분 구조
// 현재 select된 값은 외부에서 구분한 뒤 css를 수정해야 할 듯 합니다.
// 우선 hover, custom color는 주석처리 했습니다.

// <div className=" css-26l3qy-menu">
// 	<div className=" css-4ljt47-MenuList">
// 		<div className=" css-yt9ioa-option" id="react-select-45-option-0" tabIndex="-1">라이트 모드</div>
// 		<div className=" css-9gakcf-option" id="react-select-45-option-1" tabIndex="-1">다크 모드</div>
// 	</div>
// </div>

const _Select = styled(Select)`
	width: ${(props) => props.width};

	margin-top: 6px;

	.css-26l3qy-menu {
		z-index: 10;
		color: ${(props) => props.color};
		background: ${(props) => props.back};

		.css-4ljt47-MenuList {
			// background: ${(props) => props.back};
			div {
				color: ${(props) => props.color};
				// &:hover {
				// 	background: ${(props) => props.b_color};
				// }
			}
		}

		// 드롭메뉴 z-index 속성 추가.
	}
	.css-1pahdxg-control {
		height: 34px;
		min-height: 34px !important;
		background: ${(props) => props.back};
		border-color: ${(props) => props.b_color};
	}
	.css-yk16xz-control {
		z-index: 3;
		background: ${(props) => props.back};
		border-color: ${(props) => props.b_color};
		height: 34px;
		min-height: 34px !important;
		&:hover {
			border-color: ${(props) => props.b_color};
		}
	}
	.css-g1d714-ValueContainer {
		top: -2px;
		padding: 0px 8px;
		.css-1uccc91-singleValue {
			color: ${(props) => props.color};
		}
	}

	.css-1hb7zxy-IndicatorsContainer {
		position: relative;
		height: 34px;
		span {
			display: none !important;
		}
		div {
			height: 34px;
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
}) => {
	return (
		<_Container flex={flex}>
			<_Span>{title}</_Span>
			<_Select
				b_color={b_color}
				color={color}
				value={options.find((op) => {
					return op.value === value;
				})}
				options={options}
				onChange={(e) => setValue(e.value)}
				width={width}
				back={back}
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
};

export default Select_;
