import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import Server from './Server';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import useInput from '../../../hooks/useInput';
import Collapse_ from '../../RecycleComponents/Collapse_';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import {OPEN_ALERT_POPUP} from '../../../reducers/popup';
import {
	activeColor,
	iconColor,
	navColor,
	navHighColor,
} from '../../../styles/color';
import styled from 'styled-components';
import {Icon, IconButton} from '../../../styles/components/icon';
import {
	NavigationBarItemForm,
	NavigationBarInput,
	NavigationBarTitle,
} from '../../../styles/components/navigationBar';

const FolderItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 34px;
	padding: 0px 16px 0px 8px;
	padding-left: ${(props) => props?.left};
	border-left: 2px solid;
	border-color: ${(props) =>
		props.clicked
			? activeColor[props.theme_value]
			: navColor[props.theme_value]};
	background-color: ${(props) =>
		props.clicked
			? navHighColor[props.theme_value]
			: navColor[props.theme_value]};
`;

const isValidFolderName = (folderArray, name) => {
	let pass = true;

	for (let i of folderArray) {
		if (i.type === 'folder') {
			if (i.name === name) return false;
			else if (i.contain.length > 0) {
				pass = pass && isValidFolderName(i.contain, name);
			}
		}
	}
	return pass;
};

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {nav, clicked_server, theme, createdFolderInfo} = useSelector(
		(state) => state.common,
		shallowEqual,
	);

	const [openTab, setOpenTab] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');
	const renameRef = useRef(null);

	const onCLickFolder = useCallback(() => {
		if (clicked_server === data.key) {
			dispatch({type: SET_CLICKED_SERVER, data: null});
		} else {
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
		}
	}, [clicked_server, data.key, dispatch]);

	const onClickOpenFolder = useCallback(() => {
		setOpenTab(!openTab);
	}, [openTab]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
			show(e);
		},
		[data.key, dispatch, show],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			if (renameValue === '') return;

			console.log(data.name);
			if (isValidFolderName(nav, renameValue.trim())) {
				dispatch({
					type: CHANGE_SERVER_FOLDER_NAME,
					data: {key: data.key, name: renameValue.trim()},
				});

				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, data: null});
			} else {
				console.log(renameValue);
				// 현재 중복이름으로 변경 후 esc가 아닌
				// 마우스 클릭으로 포커스를 변경하면 중복검사를 실행하는 문제있음
				if (renameValue !== data.name) {
					dispatch({
						type: OPEN_ALERT_POPUP,
						data: 'folder_name_duplicate',
					});
				} else {
					setOpenRename(false);
					dispatch({type: SET_CLICKED_SERVER, data: null});
				}
			}

			// if (renameValue !== data.name) {
			// 	dispatch({
			// 		type: CHANGE_SERVER_FOLDER_NAME,
			// 		data: {key: data.key, name: renameValue},
			// 	});
			// }
		},
		[data.key, data.name, dispatch, nav, renameValue],
	);

	const EscapeKey = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, data: null});
			}
		},
		[dispatch],
	);

	const prevPutItem = useCallback(() => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data.key, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_SERVER_AND_FOLDER,
					data: {next: data, indent: parseInt(indent)},
				});
		},
		[data, dispatch, indent],
	);

	const handleBlur = useCallback(() => {
		setOpenRename(false);
		renameRef.current = null;
		dispatch({type: SET_CLICKED_SERVER, data: null});
	}, [dispatch]);

	//when re-name form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (openRename) {
				await setRenameValue(data.name);
				await renameRef.current?.focus();
				await renameRef.current?.select();
			}
		};
		fillInForm();
	}, [openRename, renameRef, data, setRenameValue]);

	useEffect(() => {
		setOpenTab(open);
	}, [open]);

	useEffect(() => {
		if (data.key === clicked_server) {
			setOpenTab(true);
		}
		if (data === createdFolderInfo) {
			dispatch({type: SET_CLICKED_SERVER, data: createdFolderInfo.key});
			setOpenRename(true);
		}
	}, [clicked_server, createdFolderInfo, data, dispatch]);

	return (
		<React.Fragment>
			<FolderItem
				onClick={onCLickFolder}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				theme_value={theme}
				clicked={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					color={
						clicked_server === data.key
							? activeColor[theme]
							: iconColor[theme]
					}
				>
					{folderIcon}
				</Icon>

				<NavigationBarTitle theme_value={theme}>
					{openRename ? (
						<NavigationBarItemForm
							onSubmit={handleSubmit}
							onBlur={handleSubmit}
						>
							<NavigationBarInput
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
								onBlur={handleBlur}
								theme_value={theme}
							/>
						</NavigationBarItemForm>
					) : (
						data.name
					)}
				</NavigationBarTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickOpenFolder}
					color={iconColor[theme]}
				>
					{openTab ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</FolderItem>
			{data.contain.length !== 0 && (
				<Collapse_ open={openTab}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<Folder
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
								/>
							) : (
								<Server
									key={i.key}
									data={i}
									indent={indent + 1}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
			{/*<FolderContextMenu data={data} setOpenRename={setOpenRename} />*/}
		</React.Fragment>
	);
};

Folder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
