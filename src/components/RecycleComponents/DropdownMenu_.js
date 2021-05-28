import React from 'react';
import styled from 'styled-components';
import {Dropdown} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {
	GRAY_ACTIVE_COLOR,
	GRAY_COLOR,
	GRAY_HOVER_COLOR,
} from '../../styles/global';

const _Dropdown = styled(Dropdown)`
	line-height: 0px;
	button {
		line-height: 0px !important;
		border: none !important;
		padding: 0;
		margin: 0px 8px;
		outline: none !important;
		background-color: transparent !important;
		color: ${GRAY_COLOR} !important;
		font-size: 18px;
		::after {
			content: none;
		}
		&:hover {
			color: ${GRAY_HOVER_COLOR} !important;
		}
		&:active {
			color: ${GRAY_ACTIVE_COLOR} !important;
		}
	}
	.dropdown-menu {
		line-height: initial !important;
		padding: 4px 0px;
		.dropdown-divider {
			padding: 0px;
			margin: 0px;
		}
	}
	.dropdown-menu.show {
		top: 5px !important;
	}
`;

const _Item = styled(Dropdown.Item)`
	font-size: 12px;
	padding: 8px 12px;
`;
const _Divider = styled(Dropdown.Divider)`
	margin: 6px;
`;

const DropdownMenu_ = ({icon, menu}) => {
	return (
		<_Dropdown>
			<Dropdown.Toggle split id='dropdown-split-basic'>
				{icon}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{menu.map((v, i) => {
					return v.title === 'divider' ? (
						<_Divider key={i} />
					) : (
						<_Item id={v.title} key={i} onClick={v.onClick}>
							{v.title}
						</_Item>
					);
				})}
			</Dropdown.Menu>
		</_Dropdown>
	);
};

DropdownMenu_.propTypes = {
	menu: PropTypes.array.isRequired,
	icon: PropTypes.element.isRequired,
};

export default DropdownMenu_;
