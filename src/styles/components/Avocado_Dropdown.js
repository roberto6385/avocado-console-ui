import React from 'react';
import styled from 'styled-components';
import {Dropdown} from 'react-bootstrap';
import PropTypes from 'prop-types';

const _Dropdown = styled(Dropdown)`
	line-height: 0px;
	button {
		line-height: 0px !important;
		border: none !important;
		padding: 0;
		margin: 0px 8px;
		outline: none !important;
		background-color: transparent !important;
		color: black !important;
		font-size: 18px;
		::after {
			content: none;
		}
	}
	div {
		line-height: initial !important;
		padding: 4px 0px;
		.dropdown-divider {
			padding: 0px;
			margin: 0px;
		}
	}
`;

const _Item = styled(Dropdown.Item)`
	font-size: 12px;
	padding: 8px 12px;
`;
const _Divider = styled(Dropdown.Divider)`
	margin: 6px;
`;

const Avocado_Dropdown = ({icon, menu}) => {
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
						<_Item key={i} onClick={v.onClick}>
							{v.title}
						</_Item>
					);
				})}
			</Dropdown.Menu>
		</_Dropdown>
	);
};

Avocado_Dropdown.propTypes = {
	menu: PropTypes.array.isRequired,
	icon: PropTypes.element.isRequired,
};

export default Avocado_Dropdown;
