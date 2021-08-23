import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

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
import useInput from '../../../hooks/useInput';
import {sftpSelector} from '../../../reducers/renewal';

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
	const {data} = useSelector(sftpSelector.all);

	const {
		path = '',
		socket,
		mode,
	} = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	const [currentPath, onChangeCurrentPath, setCurrentPath] = useInput('');

	const onClickMoveToRootPath = useCallback(
		(e, nextPath = '/root') => {
			const pathInput = document.getElementById('file-list-nav-input');
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

	const onClickMovetoParentRath = useCallback(
		(e) => {
			if (path !== '/') {
				console.log(path);
				let tempPath = path.split('/');
				tempPath.pop();
				console.log(tempPath);
				let nextPath = tempPath.join('/').trim();
				onClickMoveToRootPath(e, nextPath === '' ? '/' : nextPath);
			}
		},
		[onClickMoveToRootPath, path],
	);
	const onSubmitChangePath = useCallback(
		(e) => {
			e.preventDefault();
			currentPath !== ''
				? onClickMoveToRootPath(e, currentPath)
				: setCurrentPath(path);
		},
		[currentPath, onClickMoveToRootPath, path, setCurrentPath],
	);

	const onBlurChangePath = useCallback(() => {
		setCurrentPath(path);
	}, [path, setCurrentPath]);

	const onKeyDownChangePath = useCallback(
		(e) => {
			const pathInput = document.getElementById('file-list-nav-input');

			if (e.keyCode === 27) {
				setCurrentPath(path);
				pathInput.blur();
			}
		},
		[path, setCurrentPath],
	);

	const onClickChangeToDropListStyle = useCallback(() => {
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

	const onClickChangeToFileListStyle = useCallback(() => {
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

	const onClickRefreshList = useCallback(() => {
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
	}, [uuid, path, setCurrentPath]);

	return (
		<_Container>
			<HoverButton
				margin={'13px 5px 13px 16px'}
				onClick={onClickMovetoParentRath}
			>
				{arrowUpwordIcon}
			</HoverButton>
			<SftpMainIcon
				type={mode === 'list' ? 'main' : undefined}
				margin={'13px 5px'}
				onClick={onClickChangeToFileListStyle}
			>
				{viewListIcon}
			</SftpMainIcon>
			<SftpMainIcon
				type={mode === 'drop' ? 'main' : undefined}
				margin={'13px 16px 13px 5px'}
				onClick={onClickChangeToDropListStyle}
			>
				{viewColumnIcon}
			</SftpMainIcon>
			<_Form onSubmit={onSubmitChangePath} autoComplete='off'>
				<SearchTextBox
					ref={inputRef}
					id='file-list-nav-input'
					onClick={() => inputRef.current?.select()}
					type='text'
					value={currentPath}
					onChange={onChangeCurrentPath}
					onKeyDown={onKeyDownChangePath}
					onBlur={onBlurChangePath}
				/>
			</_Form>
			<HoverButton
				margin={'13px 5px 13px 16px'}
				onClick={onClickRefreshList}
			>
				{refreshIcon}
			</HoverButton>
			<HoverButton
				margin={'13px 16px 13px 5px'}
				onClick={onClickMoveToRootPath}
			>
				{homeIcon}
			</HoverButton>
		</_Container>
	);
};

FileToolbar.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileToolbar;
