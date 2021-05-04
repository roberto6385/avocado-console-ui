import React from 'react';
import styled from 'styled-components';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import PropTypes from 'prop-types';

const _Dropdown = styled(DropdownButton)`
	#dropdown-basic-button {
		border: none;
		padding: 0;
		margin: 0px 8px;
		background-color: transparent;
		::after {
			content: none;
		}
	}
	.dropdown-menu.show {
		padding: 4px 0px;
	}
`;

const _Item = styled(Dropdown.Item)`
	font-size: 12px;
	padding: 4px 12px;
`;
const _Divider = styled(Dropdown.Divider)`
	margin: 6px;
`;

const Avocado_Dropdown = ({icon, menu}) => {
	return (
		<_Dropdown id='dropdown-basic-button' title={icon}>
			{menu.map((item, index) => {
				return item.title === 'divider' ? (
					<_Divider key={index} />
				) : (
					<_Item key={index} onClick={item.onClick}>
						{item.title}
					</_Item>
				);
			})}
		</_Dropdown>
	);
};

Avocado_Dropdown.propTypes = {
	menu: PropTypes.array.isRequired,
	icon: PropTypes.element.isRequired,
};

export default Avocado_Dropdown;
