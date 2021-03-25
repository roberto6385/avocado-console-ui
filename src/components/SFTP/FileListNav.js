import React, {useEffect, useState} from 'react';
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
import {DEEP_GRAY_COLOR, GRAY_COLOR} from '../../styles/global';

const SearchPath = styled.input`
	flex: 1;
	border-radius: 4px;
	border: 1px solid ${GRAY_COLOR};
	padding: 0px 8px;
	outline: none;
	background: ${DEEP_GRAY_COLOR};
`;

const FileListNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const [path, setPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		sendCommandByCd(ws, uuid, nextPath, dispatch);
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
	const searchPath = (e) => {
		e.preventDefault();
		path !== '' && goHome(e, path);
	};

	const input = document.getElementById('fileListNavInput');
	input?.addEventListener('focusout', () => {
		setPath(pathItem?.path || '');
	});

	const handleChange = (e) => {
		console.log(e.nativeEvent);
		const {value} = e.target;
		setPath(value);
	};

	const EscapeKey = (e) => {
		console.log(e.keyCode);
		if (e.keyCode === 27) {
			setPath(pathItem?.path || '');
		}
	};

	useEffect(() => {
		setPath(pathItem?.path || '');
	}, [pathItem]);

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
			<form
				style={{display: 'flex', width: '100%'}}
				onSubmit={searchPath}
			>
				<SearchPath
					id='fileListNavInput'
					type='text'
					value={path}
					onChange={handleChange}
					onKeyDown={EscapeKey}
				/>
			</form>
		</>
	);
};

FileListNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
