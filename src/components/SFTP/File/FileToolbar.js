import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {CD_REQUEST, CHANGE_MODE, PWD_REQUEST} from '../../../reducers/sftp';

import {
	arrowUpwordIcon,
	homeIcon,
	refreshIcon,
	viewColumnIcon,
	viewListIcon,
} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import {SearchTextBox} from '../../../styles/components/textBox';
import {SftpMainIcon} from '../../../styles/components/sftp/icons';

const _Container = styled.div`
	display: flex;
	flex: 1;
	overflow: scroll;
	align-items: center;
	height: 50px;
`;

const _Form = styled.form`
	display: flex;
	flex: 1;
`;

const FileToolbar = ({uuid}) => {
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const {
		path: sftp_pathState,
		socket: sftp_socketState,
		etc: sftp_etcState,
	} = useSelector((state) => state.sftp, shallowEqual);

	const {path} = useMemo(
		() => sftp_pathState.find((it) => it.uuid === uuid),
		[sftp_pathState, uuid],
	);
	const {socket} = useMemo(
		() => sftp_socketState.find((it) => it.uuid === uuid),
		[sftp_socketState, uuid],
	);
	const {mode} = useMemo(
		() => sftp_etcState.find((it) => it.uuid === uuid),
		[sftp_etcState, uuid],
	);

	const [currentPath, setCurrentPath] = useState('');

	const movedHome = useCallback(
		(e, nextPath = '/root') => {
			const pathInput = document.getElementById('fileListNavInput');
			console.log(nextPath);
			nextPath !== undefined &&
				dispatch({
					type: CD_REQUEST,
					payload: {
						socket: socket,
						uuid: uuid,
						path: path,
						cd_path: nextPath,
					},
				}) &&
				pathInput.blur();
		},
		[dispatch, path, socket, uuid],
	);

	const movedBack = useCallback(
		(e) => {
			if (path !== '/') {
				console.log(path);
				let tempPath = path.split('/');
				tempPath.pop();
				console.log(tempPath);
				let nextPath = tempPath.join('/').trim();
				movedHome(e, nextPath === '' ? '/' : nextPath);
			}
		},
		[movedHome, path],
	);
	const searchPath = useCallback(
		(e) => {
			e.preventDefault();
			currentPath !== ''
				? movedHome(e, currentPath)
				: setCurrentPath(path);
		},
		[currentPath, movedHome, path],
	);

	const handleChange = useCallback((e) => {
		const {value} = e.target;
		setCurrentPath(value);
	}, []);

	const EscapeKey = useCallback(
		(e) => {
			const pathInput = document.getElementById('fileListNavInput');

			if (e.keyCode === 27) {
				setCurrentPath(path);
				pathInput.blur();
			}
		},
		[path],
	);

	const viewDropList = useCallback(() => {
		mode !== 'drop' &&
			dispatch({
				type: CHANGE_MODE,
				payload: {
					uuid,
					mode: 'drop',
					currentMode: mode,
				},
			});
	}, [dispatch, mode, uuid]);

	const viewList = useCallback(() => {
		mode !== 'list' &&
			dispatch({
				type: CHANGE_MODE,
				payload: {
					uuid,
					mode: 'list',
					currentMode: mode,
				},
			});
	}, [dispatch, mode, uuid]);

	const refresh = useCallback(() => {
		dispatch({
			type: PWD_REQUEST,
			payload: {
				socket: socket,
				uuid: uuid,
				pwd_path: null,
			},
		});
	}, [dispatch, socket, uuid]);

	useEffect(() => {
		uuid && setCurrentPath(path);
	}, [uuid, path]);

	return (
		<_Container>
			<HoverButton margin={'13px 5px 13px 16px'} onClick={movedBack}>
				{arrowUpwordIcon}
			</HoverButton>
			<SftpMainIcon
				type={mode === 'list' ? 'main' : undefined}
				margin={'13px 5px'}
				onClick={viewList}
			>
				{viewListIcon}
			</SftpMainIcon>
			<SftpMainIcon
				type={mode === 'drop' ? 'main' : undefined}
				margin={'13px 16px 13px 5px'}
				onClick={viewDropList}
			>
				{viewColumnIcon}
			</SftpMainIcon>
			<_Form onSubmit={searchPath} autoComplete='off'>
				<SearchTextBox
					ref={inputRef}
					id='fileListNavInput'
					onClick={() => inputRef.current?.select()}
					type='text'
					value={currentPath}
					onChange={handleChange}
					onKeyDown={EscapeKey}
					onBlur={() => setCurrentPath(path)}
				/>
			</_Form>
			<HoverButton margin={'13px 5px 13px 16px'} onClick={refresh}>
				{refreshIcon}
			</HoverButton>
			<HoverButton margin={'13px 16px 13px 5px'} onClick={movedHome}>
				{homeIcon}
			</HoverButton>
		</_Container>
	);
};

FileToolbar.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileToolbar;
