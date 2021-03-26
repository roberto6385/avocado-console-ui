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
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
} from '../../reducers/sftp';
import {NavItem} from '../../styles/sftp';
import {DEEP_GRAY_COLOR, GRAY_COLOR} from '../../styles/global';
import usePostMessage from './hooks/usePostMessage';
import {listConversion} from './commands';

const SearchPath = styled.input`
	flex: 1;
	border-radius: 4px;
	border: 1px solid ${GRAY_COLOR};
	padding: 0px 8px;
	outline: none;
	background: ${DEEP_GRAY_COLOR};
`;

const FileListNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const {currentPath} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const [path, setPath] = useState('');

	const goHome = (e, nextPath = '/root') => {
		// sendCommandByCd(ws, uuid, nextPath, dispatch);

		usePostMessage({
			keyword: 'CommandByCd',
			ws,
			uuid,
			path: nextPath,
		}).then(() =>
			usePostMessage({
				keyword: 'CommandByPwd',
				ws,
				uuid,
			}).then((response) => {
				dispatch({
					type: SFTP_SAVE_CURRENT_PATH,
					data: {uuid, path: response.result},
				});
				usePostMessage({
					keyword: 'CommandByLs',
					ws,
					uuid,
					path: response.result,
				})
					.then((response) => listConversion(response.result))
					.then((response) =>
						dispatch({
							type: SFTP_SAVE_CURRENT_LIST,
							data: {uuid, list: response},
						}),
					);
			}),
		);
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	};

	const goBack = (e) => {
		if (pathItem?.path !== '/') {
			let tempPath = pathItem.path.split('/');
			tempPath.pop();
			let nextPath = tempPath.join('/').trim();
			goHome(e, nextPath === '' ? '/' : nextPath);
		}
	};
	const searchPath = (e) => {
		e.preventDefault();
		path !== '' && goHome(e, path);
	};

	const input = document.getElementById('fileListNavInput');
	input?.addEventListener('focusout', () => {
		setPath(pathItem?.path || '');
	});

	const handleChange = (e) => {
		const {value} = e.target;
		setPath(value);
	};

	const EscapeKey = (e) => {
		if (e.keyCode === 27) {
			setPath(pathItem?.path || '');
		}
	};

	useEffect(() => {
		setPath(pathItem?.path || '');
	}, [pathItem]);

	return (
		<>
			<NavItem>
				<BsLayoutThreeColumns />
			</NavItem>
			<NavItem>
				<GoThreeBars />
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
					value={path}
					onChange={handleChange}
					onKeyDown={EscapeKey}
				/>
			</form>
		</>
	);
};

FileListNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListNav;
