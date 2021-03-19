import React from 'react';
import styled from 'styled-components';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';

const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
`;
const HistoryNav = ({index, ws, uuid}) => {
	const fileUpload = (e) => {
		e.preventDefault();
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			for await (const key of Object.keys(files)) {
				console.log(files[key]);
				// const newName = await sameFileCheck(files[key])
				// 지금은 덮어쓰는 중!
				// await commandPut(ws, uuid, fileObj?.path, files[key], dispatch)
			}
			// commandLs(ws, uuid, fileObj?.path, dispatch)
		};
		document.body.removeChild(uploadInput);
	};
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

HistoryNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryNav;
