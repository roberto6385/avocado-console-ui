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
import {
	listConversion,
	sendCommandByLs,
	sendCommandByPut,
	sendCommandByPwd,
} from './commands';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_LIST} from '../../reducers/sftp';

const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
`;
const HistoryNav = ({index, ws, uuid}) => {
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();

	const upload = (e) => {
		sendCommandByPut(e, ws, uuid, pathItem?.path);
		sendCommandByPwd(ws, uuid, dispatch)
			.then((result) => sendCommandByLs(ws, uuid, result))
			.then((result) => listConversion(result))
			.then((result) =>
				dispatch({
					type: SFTP_SAVE_CURRENT_LIST,
					data: {uuid, list: result},
				}),
			);
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
			<NavItem id='btn-upload' onClick={upload}>
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
