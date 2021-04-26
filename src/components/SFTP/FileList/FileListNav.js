import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	BsLayoutThreeColumns,
	GoThreeBars,
	GoArrowLeft,
	MdHome,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
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

const FileListNav = ({server}) => {
	const {uuid, path} = server;
	const dispatch = useDispatch();
	const [currentPath, setCurrentPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		nextPath !== undefined &&
			dispatch(commandCdAction({...server, newPath: nextPath}));
	};

	const goBack = (e) => {
		if (path !== '/') {
			let tempPath = path.split('/');
			tempPath.pop();
			let nextPath = tempPath.join('/').trim();
			console.log(nextPath);
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
		dispatch({
			type: CHANGE_MODE,
			payload: {
				uuid,
				mode: 'drop',
			},
		});
	};

	const basicList = () => {
		dispatch({
			type: CHANGE_MODE,
			payload: {
				uuid,
				mode: 'list',
			},
		});
	};

	useEffect(() => {
		setCurrentPath(path);
	}, [server]);

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
	server: PropTypes.object.isRequired,
};

export default FileListNav;
