import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {
	CHANGE_MODE,
	commandCdAction,
	commandLsAction,
	commandPwdAction,
	INITIAL_FILELIST,
} from '../../../reducers/sftp';
import {IconButton} from '../../../styles/global';
import {
	arrowUpwordIcon,
	homeIcon,
	refreshIcon,
	viewColumnIcon,
	viewListIcon,
} from '../../../icons/icons';
import {FONT_14, HEIGHT_34, HEIGHT_50} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fontColor,
	iconColor,
	filelistInputBack,
	tabColor,
} from '../../../styles/color';

const _input = styled.input`
	height: ${HEIGHT_34};
	width: 100%;
	border-radius: 4px;
	font-size: ${FONT_14};
	border: none;
	padding: 0px 13px;
	outline: none;
	background: ${(props) => props.back};
	color: ${(props) => props.color};
`;

const _Container = styled.div`
	display: flex;
	align-items: center;
	background: ${(props) => props?.back};
	border-bottom: 1px solid;
	border-color: ${(props) => props?.bcolor};
	height: ${HEIGHT_50};
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
`;

const FileListNav = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);
	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {path, mode} = corServer;
	const [currentPath, setCurrentPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		const pathInput = document.getElementById('fileListNavInput');
		console.log(nextPath);
		nextPath !== undefined &&
			dispatch(
				commandCdAction({
					socket: corServer.socket,
					uuid: uuid,
					path: corServer.path,
					cd_path: nextPath,
				}),
			) &&
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
		dispatch(
			commandPwdAction({
				socket: corServer.socket,
				uuid: uuid,
				pwd_path: corServer.path,
			}),
		);
	}, [uuid, corServer, dispatch]);

	useEffect(() => {
		uuid && setCurrentPath(path);
	}, [uuid, corServer]);

	return (
		<_Container back={tabColor[theme]} bcolor={borderColor[theme]}>
			<IconButton
				margin={'0px 0px 0px 10px'}
				color={iconColor[theme]}
				onClick={goBack}
			>
				{arrowUpwordIcon}
			</IconButton>
			<IconButton onClick={basicList}>
				{viewListIcon(
					mode === 'list' ? activeColor[theme] : iconColor[theme],
				)}
			</IconButton>
			<IconButton margin={'0px 10px 0px 0px'} onClick={dropdownList}>
				{viewColumnIcon(
					mode === 'drop' ? activeColor[theme] : iconColor[theme],
				)}
			</IconButton>
			<_Form onSubmit={searchPath} autoComplete='off'>
				<_input
					id='fileListNavInput'
					type='text'
					value={currentPath}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					back={filelistInputBack[theme]}
					color={fontColor[theme]}
					onBlur={() => setCurrentPath(path)}
				/>
			</_Form>
			<IconButton
				margin={'0px 0px 0px 10px'}
				color={iconColor[theme]}
				onClick={refresh}
			>
				{refreshIcon}
			</IconButton>
			<IconButton
				margin={'0px 10px 0px 0px'}
				color={iconColor[theme]}
				onClick={goHome}
			>
				{homeIcon}
			</IconButton>
		</_Container>
	);
};

FileListNav.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default React.memo(FileListNav);
