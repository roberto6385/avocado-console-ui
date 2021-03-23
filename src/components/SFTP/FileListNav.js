import React from 'react';
import styled from 'styled-components';
import {
	BsLayoutThreeColumns,
	GoThreeBars,
	GoArrowLeft,
	MdHome,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {sendCommandByCd} from './commands/sendCommandCd';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';

const NavItem = styled.button`
	background: transparent;
	border: none;
	font-size: 18px;
	cursor: pointer;
	line-height: 0;
`;

const PathSpan = styled.span`
	font-size: 14px;
	margin: 0px 4px;
`;
const FileListNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);

	const goHome = () => {
		sendCommandByCd(ws, uuid, '/home', dispatch);

		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const goBack = () => {
		if (pathItem?.path !== '/') {
			let tempPath = pathItem.path.split('/');
			tempPath.pop();
			let nextPath = tempPath.join('/').trim();
			sendCommandByCd(
				ws,
				uuid,
				nextPath === '' ? '/' : nextPath,
				dispatch,
			);
		}
	};

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
			<PathSpan>{pathItem?.path}</PathSpan>
		</>
	);
};

FileListNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
