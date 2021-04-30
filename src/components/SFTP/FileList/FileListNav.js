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
import {CHANGE_MODE, commandCdAction} from '../../../reducers/sftp';

const SearchPath = styled.input`
	flex: 1;
	border-radius: 4px;
	border: 1px solid ${GRAY_COLOR};
	padding: 0px 8px;
	outline: none;
	background: ${HIGHLIGHT_COLOR};
`;

const FileListNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {path, mode} = corServer;

	const dispatch = useDispatch();
	const [currentPath, setCurrentPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		nextPath !== undefined &&
			dispatch(commandCdAction({...corServer, newPath: nextPath}));
	};

	const goBack = (e) => {
		if (path !== '/') {
			let tempPath = path.split('/');
			tempPath.pop();
			console.log(tempPath);
			let nextPath = tempPath.join('/').trim();
			goHome(e, nextPath === '' ? '/' : nextPath);
		}
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
			setCurrentPath(path);
		}
	};

	const dropdownList = () => {
		mode !== 'drop' &&
			dispatch({
				type: CHANGE_MODE,
				payload: {
					uuid,
					mode: 'drop',
					currentMode: mode,
				},
			});
	};

	const basicList = () => {
		mode !== 'list' &&
			dispatch({
				type: CHANGE_MODE,
				payload: {
					uuid,
					mode: 'list',
					currentMode: mode,
				},
			});
	};

	useEffect(() => {
		setCurrentPath(path);
	}, [corServer]);

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
					onBlur={() => setCurrentPath(path)}
				/>
			</form>
		</>
	);
};

FileListNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
