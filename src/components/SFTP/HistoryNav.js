import React from 'react';
import styled from 'styled-components';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';

const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
`;
const HistoryNav = () => {
	const fileUpload = () => {};

	const historyDelete = () => {};

	return (
		<>
			<NavItem>
				<BsArrowClockwise />
			</NavItem>
			<NavItem>
				<BsCheck />
			</NavItem>
			<NavItem id='btn-upload' onClick={fileUpload}>
				<MdFileUpload />
			</NavItem>
			<NavItem>
				<MdPause />
			</NavItem>
			<NavItem onClick={historyDelete}>
				<MdDelete />
			</NavItem>
		</>
	);
};

export default HistoryNav;
