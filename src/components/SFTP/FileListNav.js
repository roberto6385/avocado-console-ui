import React from 'react';
import styled from 'styled-components';
import {
	BsLayoutThreeColumns,
	GoThreeBars,
	GoArrowLeft,
	MdHome,
} from 'react-icons/all';

const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
`;
const FileListNav = () => {
	const goHome = () => {};

	const goBack = () => {};

	return (
		<>
			<NavItem>
				<BsLayoutThreeColumns />
			</NavItem>
			<NavItem>
				<GoThreeBars />
			</NavItem>
			<NavItem onClick={goHome}>
				<MdHome />
			</NavItem>
			<NavItem onClick={goBack}>
				<GoArrowLeft />
			</NavItem>
			<span style={{fontSize: '14px'}}>경로</span>
		</>
	);
};

export default FileListNav;
