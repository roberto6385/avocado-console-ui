import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
	LIGHT_MODE_MINT_COLOR,
	LIGHT_MODE_ICON_COLOR,
	iconColor,
	fontColor,
	borderColor,
	inputColor,
} from '../../../styles/global';
import {
	arrowUpwordIcon,
	homeIcon,
	refreshIcon,
	viewColumnIcon,
	viewListIcon,
} from '../../../icons/icons';
import {HEIGHT_50} from '../../../styles/length';

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
	height: ${HEIGHT_50};
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
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {path, mode} = corServer;

	const dispatch = useDispatch();
	const [currentPath, setCurrentPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		const pathInput = document.getElementById('fileListNavInput');
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
		currentPath !== '' ? goHome(e, currentPath) : setCurrentPath(path);
	};

	const handleChange = (e) => {
		const {value} = e.target;
		setCurrentPath(value);
	};

	const EscapeKey = (e) => {
		const pathInput = document.getElementById('fileListNavInput');

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

	const refresh = useCallback(async () => {
		uuid && (await dispatch(commandPwdAction(corServer)));
	}, [uuid, corServer, dispatch]);

	useEffect(() => {
		uuid && setCurrentPath(path);
	}, [uuid, corServer]);

	// useEffect(async () => {
	// 	uuid && (await dispatch(commandPwdAction(corServer)));
	// }, []);

	return (
		<_Container b_color={borderColor[theme]}>
			<_IconButton onClick={basicList}>
				{viewListIcon(
					mode === 'list' ? LIGHT_MODE_MINT_COLOR : iconColor[theme],
				)}
			</_IconButton>
			<_IconButton onClick={dropdownList}>
				{viewColumnIcon(
					mode === 'drop' ? LIGHT_MODE_MINT_COLOR : iconColor[theme],
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
					back={inputColor[theme]}
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

export default React.memo(FileListNav);
