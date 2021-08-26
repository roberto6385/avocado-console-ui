import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

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
import {sftpAction, sftpSelector} from '../../../reducers/renewal';

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
	const {sftp} = useSelector(sftpSelector.all);

	const [currentPath, onChangeCurrentPath, setCurrentPath] = useInput('');

	const onClickMoveToRootPath = useCallback(
		(e, nextPath = '/root') => {
			const {socket} = sftp.find((v) => v.uuid === uuid);
			console.log(socket);
			const pathInput = document.getElementById('file-list-nav-input');
			nextPath !== undefined &&
				dispatch(
					sftpAction.commandCd({
						socket: socket,
						uuid: uuid,
						path: nextPath,
					}),
				) &&
				pathInput.blur();
		},
		[dispatch, sftp, uuid],
	);

	const onClickMovetoParentRath = useCallback(
		(e) => {
			const {path} = sftp.find((v) => v.uuid === uuid);

			if (path !== '/') {
				console.log(path);
				let tempPath = path.split('/');
				tempPath.pop();
				console.log(tempPath);
				let nextPath = tempPath.join('/').trim();
				onClickMoveToRootPath(e, nextPath === '' ? '/' : nextPath);
			}
		},
		[onClickMoveToRootPath, sftp, uuid],
	);
	const onSubmitChangePath = useCallback(
		(e) => {
			e.preventDefault();
			const {path} = sftp.find((v) => v.uuid === uuid);
			currentPath !== ''
				? onClickMoveToRootPath(e, currentPath)
				: setCurrentPath(path);
		},
		[currentPath, onClickMoveToRootPath, setCurrentPath, sftp, uuid],
	);

	const onBlurChangePath = useCallback(() => {
		const {path} = sftp.find((v) => v.uuid === uuid);
		setCurrentPath(path);
	}, [setCurrentPath, sftp, uuid]);

	const onKeyDownChangePath = useCallback(
		(e) => {
			const pathInput = document.getElementById('file-list-nav-input');
			const {path} = sftp.find((v) => v.uuid === uuid);
			if (e.keyCode === 27) {
				setCurrentPath(path);
				pathInput.blur();
			}
		},
		[setCurrentPath, sftp, uuid],
	);

	const onClickChangeMode = useCallback(
		(type) => () => {
			const {mode} = sftp.find((v) => v.uuid === uuid);
			if (type === mode) return;
			dispatch(
				sftpAction.setMode({
					uuid,
					mode: type,
				}),
			);
		},
		[dispatch, sftp, uuid],
	);

	const onClickRefreshList = useCallback(() => {
		const {socket} = sftp.find((v) => v.uuid === uuid);

		dispatch(
			sftpAction.commandPwd({
				socket: socket,
				uuid: uuid,
			}),
		);
	}, [dispatch, sftp, uuid]);

	useEffect(() => {
		const {path} = sftp.find((v) => v.uuid === uuid);
		uuid && setCurrentPath(path);
	}, [uuid, setCurrentPath, sftp]);

	return (
		<_Container>
			<HoverButton
				margin={'13px 5px 13px 16px'}
				onClick={onClickMovetoParentRath}
			>
				{arrowUpwordIcon}
			</HoverButton>
			<SftpMainIcon
				type={
					sftp.find((v) => v.uuid === uuid).mode === 'list'
						? 'main'
						: undefined
				}
				margin={'13px 5px'}
				onClick={onClickChangeMode('list')}
			>
				{viewListIcon}
			</SftpMainIcon>
			<SftpMainIcon
				type={
					sftp.find((v) => v.uuid === uuid).mode === 'drop'
						? 'main'
						: undefined
				}
				margin={'13px 16px 13px 5px'}
				onClick={onClickChangeMode('drop')}
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
