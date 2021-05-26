import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {
	CHANGE_MODE,
	commandCdAction,
	commandPwdAction,
} from '../../../reducers/sftp';
import {
	AVOCADO_FONTSIZE,
	BORDER_COLOR,
	IconButton,
	ICON_LIGHT_COLOR,
	LIGHT_BACK_COLOR,
	PATH_SEARCH_INPUT_HEIGHT,
	SUB_HEIGHT,
} from '../../../styles/global_design';

const _input = styled.input`
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	width: 100%;
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	border: none;
	padding: 0px 13px;
	outline: none;
	background: ${LIGHT_BACK_COLOR};
`;

const _Container = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid ${BORDER_COLOR};
	height: ${SUB_HEIGHT};
`;

const _IconButton = styled(IconButton)`
	color: ${ICON_LIGHT_COLOR};
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
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
		<_Container>
			<_IconButton onClick={dropdownList}>
				<span className='material-icons button_large'>view_column</span>
			</_IconButton>
			<_IconButton onClick={basicList}>
				<span className='material-icons button_large'>view_list</span>
			</_IconButton>
			<_IconButton onClick={goBack}>
				<span className='material-icons button_large'>
					arrow_upward
				</span>
			</_IconButton>
			<_Form onSubmit={searchPath}>
				<_input
					id='fileListNavInput'
					type='text'
					value={currentPath}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					back={LIGHT_BACK_COLOR}
					onBlur={() => setCurrentPath(path)}
				/>
			</_Form>
			<_IconButton onClick={refresh}>
				<span className='material-icons button_large'>refresh</span>
			</_IconButton>
			<_IconButton onClick={goHome}>
				<span className='material-icons button_large'>home</span>
			</_IconButton>
		</_Container>
	);
};

FileListNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
