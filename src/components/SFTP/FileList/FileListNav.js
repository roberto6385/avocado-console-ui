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
import {NavItem} from '../../../styles/sftp';
import {GRAY_COLOR, HIGHLIGHT_COLOR} from '../../../styles/global';
import useSftpCommands from '../../../hooks/useSftpCommands';
import sftp_ws from '../../../ws/sftp_ws';
import {SFTP_SAVE_LIST_MODE} from '../../../reducers/subSftp';

const SearchPath = styled.input`
	flex: 1;
	border-radius: 4px;
	border: 1px solid ${GRAY_COLOR};
	padding: 0px 8px;
	outline: none;
	background: ${HIGHLIGHT_COLOR};
`;

const FileListNav = ({server}) => {
	const {socket, uuid, path} = server;
	const dispatch = useDispatch();
	// const {currentPath} = useSelector((state) => state.sftp);
	// const pathItem = currentPath.find((item) => item.uuid === uuid);
	const [currentPath, setCurrentPath] = useState('');
	const {initialWork} = useSftpCommands({socket, uuid});

	const goHome = (e, nextPath = '/root') => {
		nextPath !== undefined &&
			sftp_ws({
				keyword: 'CommandByCd',
				socket,
				path: nextPath,
			}).then(() => initialWork());
	};

	const goBack = (e) => {
		sftp_ws({
			keyword: 'CommandByPwd',
			socket,
		}).then((response) => {
			if (response !== '/') {
				let tempPath = response.split('/');
				tempPath.pop();
				let nextPath = tempPath.join('/').trim();
				console.log(nextPath);
				goHome(e, nextPath === '' ? '/' : nextPath);
			}
		});
	};
	const searchPath = (e) => {
		e.preventDefault();
		currentPath !== '' && goHome(e, currentPath);
	};

	const handleChange = (e) => {
		const {value} = e.target;
		setCurrentPath(value);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setCurrentPath(path || '');
			// document.activeElement.blur();
			// ESC 누르면 blur event 처리하기
		}
	};

	const dropdownList = () => {
		dispatch({
			type: SFTP_SAVE_LIST_MODE,
			data: {
				uuid,
				mode: 'drop',
			},
		});
	};

	const basicList = () => {
		dispatch({
			type: SFTP_SAVE_LIST_MODE,
			data: {
				uuid,
				mode: 'list',
			},
		});
	};

	useEffect(() => {
		setCurrentPath(path || '');
	}, []);

	return (
		<>
			<NavItem>
				<BsLayoutThreeColumns onClick={dropdownList} />
			</NavItem>
			<NavItem>
				<GoThreeBars onClick={basicList} />
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
					value={currentPath}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					onBlur={() => setCurrentPath(path || '')}
				/>
			</form>
		</>
	);
};

FileListNav.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileListNav;
