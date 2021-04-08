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
import newSftp_ws from '../../../ws/sftp_ws';
import {SFTP_SAVE_LIST_MODE} from '../../../reducers/sftp';

const SearchPath = styled.input`
	flex: 1;
	border-radius: 4px;
	border: 1px solid ${GRAY_COLOR};
	padding: 0px 8px;
	outline: none;
	background: ${HIGHLIGHT_COLOR};
`;

const FileListNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const [path, setPath] = useState('');
	const {initialWork} = useSftpCommands({ws, uuid});

	const goHome = (e, nextPath = '/root') => {
		nextPath !== undefined &&
			newSftp_ws({
				keyword: 'CommandByCd',
				ws,
				path: nextPath,
			}).then(() => initialWork());
	};

	const goBack = (e) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
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
		path !== '' && goHome(e, path);
	};

	const handleChange = (e) => {
		const {value} = e.target;
		setPath(value);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setPath(pathItem?.path || '');
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
		setPath(pathItem?.path || '');
	}, [pathItem]);

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
					value={path}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					onBlur={() => setPath(pathItem?.path || '')}
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
