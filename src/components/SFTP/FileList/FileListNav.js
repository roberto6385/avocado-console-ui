import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	BsLayoutThreeColumns,
	GoThreeBars,
	MdHome,
	GoArrowUp,
	IoMdRefresh,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {GRAY_COLOR, light_Background} from '../../../styles/global';
import {
	CHANGE_MODE,
	commandCdAction,
	commandPwdAction,
} from '../../../reducers/sftp';
import {PrevIconButton} from '../../../styles/buttons';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	IconButton,
	ICON_LIGHT_COLOR,
	LIGHT_BACK_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
	SUB_HEIGHT,
} from '../../../styles/global_design';

const SearchPath = styled.input`
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	flex: 1;
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	border: none;
	padding: 0px 13px;
	outline: none;
	background: ${LIGHT_BACK_COLOR};
`;

const FileListNav_Container = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${BORDER_COLOR};
	height: ${SUB_HEIGHT};
`;

const FileList_Button = styled(IconButton)`
	color: ${ICON_LIGHT_COLOR};
`;

const FileListNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {path, mode} = corServer;

	const dispatch = useDispatch();
	const [currentPath, setCurrentPath] = useState('');

	const pathInput = document.getElementById('fileListNavInput');

	const goHome = (e, nextPath = '/root') => {
		console.log(nextPath);
		nextPath !== undefined &&
			dispatch(commandCdAction({...corServer, newPath: nextPath})) &&
			pathInput.blur();
	};

	const goBack = (e) => {
		if (path !== '/') {
			console.log(path);
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
			pathInput.blur();
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

	const refresh = useCallback(() => {
		dispatch(commandPwdAction(corServer));
	}, [corServer, dispatch]);

	useEffect(() => {
		setCurrentPath(path);
	}, [corServer]);

	return (
		<FileListNav_Container>
			<FileList_Button onClick={dropdownList}>
				<span className='material-icons'>view_column</span>
			</FileList_Button>
			<FileList_Button onClick={basicList}>
				<span className='material-icons'>view_list</span>
			</FileList_Button>
			<FileList_Button onClick={goBack}>
				<span className='material-icons'>arrow_upward</span>
			</FileList_Button>
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
					back={light_Background}
					onBlur={() => setCurrentPath(path)}
				/>
			</form>
			<FileList_Button onClick={refresh}>
				<span className='material-icons'>refresh</span>
			</FileList_Button>
			<FileList_Button onClick={goHome}>
				<span className='material-icons'>home</span>
			</FileList_Button>
		</FileListNav_Container>
	);
};

FileListNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
