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
	IconButton,
	PATH_SEARCH_INPUT_HEIGHT,
	SUB_HEIGHT,
	MINT_COLOR,
	LIGHT_MODE_ICON_COLOR,
	iconColor,
	fontColor,
	borderColor,
	backColor,
} from '../../../styles/global';
import {
	arrowUpwordIcon,
	homeIcon,
	refreshIcon,
	viewColumnIcon,
	viewListIcon,
} from '../../../icons/icons';

const _input = styled.input`
	height: ${PATH_SEARCH_INPUT_HEIGHT};
	width: 100%;
	border-radius: 4px;
	font-size: ${AVOCADO_FONTSIZE};
	border: none;
	padding: 0px 13px;
	outline: none;
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Container = styled.div`
	display: flex;
	align-items: center;
	border-bottom: 1px solid;
	border-color: ${(props) => props?.b_color};
	height: ${SUB_HEIGHT};
`;

const _IconButton = styled(IconButton)`
	color: ${(props) => props?.color || LIGHT_MODE_ICON_COLOR};
	&:hover {
		color: ${(props) => props?.color || LIGHT_MODE_ICON_COLOR};
	}
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
`;

const FileListNav = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
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
		<_Container b_color={borderColor[theme]}>
			<_IconButton onClick={basicList}>
				{viewListIcon(mode === 'list' ? MINT_COLOR : iconColor[theme])}
			</_IconButton>
			<_IconButton onClick={dropdownList}>
				{viewColumnIcon(
					mode === 'drop' ? MINT_COLOR : iconColor[theme],
				)}
			</_IconButton>
			<_IconButton color={iconColor[theme]} onClick={goBack}>
				{arrowUpwordIcon}
			</_IconButton>
			<_Form onSubmit={searchPath} autoComplete='off'>
				<_input
					id='fileListNavInput'
					type='text'
					value={currentPath}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					back={backColor[theme]}
					color={fontColor[theme]}
					onBlur={() => setCurrentPath(path)}
				/>
			</_Form>
			<_IconButton color={iconColor[theme]} onClick={refresh}>
				{refreshIcon}
			</_IconButton>
			<_IconButton color={iconColor[theme]} onClick={goHome}>
				{homeIcon}
			</_IconButton>
		</_Container>
	);
};

FileListNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
