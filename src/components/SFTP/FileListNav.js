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
import {NavItem, PathSpan} from '../../styles/sftp';

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
