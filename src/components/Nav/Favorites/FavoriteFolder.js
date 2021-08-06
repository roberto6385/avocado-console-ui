import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

import {
	CHANGE_FAVORITES_FOLDER_NAME,
	LOCAL_SAVE_FAVORITES,
	SET_CLICKED_SERVER,
	SORT_FAVORITES_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import useInput from '../../../hooks/useInput';
import Collapse_ from '../../RecycleComponents/Collapse_';
import {arrowDownIcon, arrowRightIcon, folderIcon} from '../../../icons/icons';
import {OPEN_CONFIRM_DIALOG_BOX} from '../../../reducers/dialogBoxs';
import FavoriteServer from './FavoriteServer';
import FolderContextMenu from '../../ContextMenu/FolderContextMenu';
import {Icon, IconButton} from '../../../styles/components/icon';
import styled from 'styled-components';
import {
	NavigationItemTitle,
	NavigationItem,
} from '../../../styles/components/navigationBar';
import {Input} from '../../../styles/components/input';
import {isValidFolderName} from '../functions';

const Input_ = styled(Input)`
	height: 24px;
`;

const FavoriteFolder = ({open, data, indent, temp}) => {
	const dispatch = useDispatch();
	const {clicked_server, createdFolderInfo, temp_favorites, favorites_key} =
		useSelector((state) => state.common, shallowEqual);
	const renameRef = useRef(null);
	const [openTab, setOpenTab] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onCLickFolder = useCallback(() => {
		if (clicked_server === data.key) {
			dispatch({type: SET_CLICKED_SERVER, payload: null});
		} else {
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
		}
	}, [clicked_server, data.key, dispatch]);

	const onClickOpen = useCallback(() => {
		setOpenTab(!openTab);
	}, [openTab]);

	const {show} = useContextMenu({
		id: data.key + 'folder',
	});

	const contextMenuOpen = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({type: SET_CLICKED_SERVER, payload: data.key});
			show(e);
		},
		[data.key, dispatch, show],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			if (renameValue === '') return;

			console.log(data.name);
			if (isValidFolderName(temp_favorites, renameValue.trim())) {
				dispatch({
					type: CHANGE_FAVORITES_FOLDER_NAME,
					payload: {key: data.key, name: renameValue.trim(), temp},
				});

				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else {
				console.log(renameValue);
				// 현재 중복이름으로 변경 후 esc가 아닌
				// 마우스 클릭으로 포커스를 변경하면 중복검사를 실행하는 문제있음
				if (renameValue !== data.name) {
					dispatch({
						type: OPEN_CONFIRM_DIALOG_BOX,
						payload: 'folder_name_duplicate',
					});
				} else {
					setOpenRename(false);
					dispatch({type: SET_CLICKED_SERVER, payload: null});
				}
			}

			dispatch({type: LOCAL_SAVE_FAVORITES});
		},
		[renameValue, data.name, data.key, temp_favorites, dispatch, temp],
	);

	const handleKeyDown = useCallback(
		(e) => {
			if (e.keyCode === 27) {
				setOpenRename(false);
				dispatch({type: SET_CLICKED_SERVER, payload: null});
			} else if (e.keyCode === 13) {
				handleSubmit(e);
			}
		},
		[dispatch, handleSubmit],
	);

	const prevPutItem = useCallback(() => {
		console.log('prev put item');
		dispatch({type: SET_CLICKED_SERVER, payload: data.key});
	}, [data.key, dispatch]);

	const nextPutItem = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('favorite folder next put item');

			data.type === 'folder' &&
				dispatch({
					type: SORT_FAVORITES_SERVER_AND_FOLDER,
					payload: {next: data, indent: parseInt(indent)},
				});
			dispatch({type: LOCAL_SAVE_FAVORITES});
		},
		[data, dispatch, indent],
	);

	const handleBlur = useCallback(() => {
		setOpenRename(false);
		renameRef.current = null;
		dispatch({type: SET_CLICKED_SERVER, payload: null});
	}, [dispatch]);

	const handleDragOver = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);
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
			dispatch({
				type: SET_CLICKED_SERVER,
				payload: createdFolderInfo.key,
			});
			setOpenRename(true);
		}
	}, [clicked_server, createdFolderInfo, data, dispatch]);

	useEffect(() => {
		renameRef.current?.focus();
		if (data.key === favorites_key) {
			setOpenRename(true);
		}
	}, [data, favorites_key]);

	return (
		<React.Fragment>
			<NavigationItem
				onClick={onCLickFolder}
				onDoubleClick={() => setOpenRename(true)}
				onContextMenu={contextMenuOpen}
				draggable='true'
				onDragStart={prevPutItem}
				onDragOver={handleDragOver}
				onDrop={nextPutItem}
				selected={clicked_server === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
			>
				<Icon
					margin_right={'12px'}
					size={'sm'}
					itype={clicked_server === data.key ? 'selected' : undefined}
				>
					{folderIcon}
				</Icon>

				<NavigationItemTitle>
					{openRename ? (
						<Input_
							ref={renameRef}
							type='text'
							value={renameValue}
							onChange={onChangeRenameValue}
							onKeyDown={handleKeyDown}
							onBlur={handleBlur}
						/>
					) : (
						data.name
					)}
				</NavigationItemTitle>
				<IconButton
					size={'sm'}
					margin={'0px 0px 0px 12px'}
					onClick={onClickOpen}
				>
					{openTab ? arrowDownIcon : arrowRightIcon}
				</IconButton>
			</NavigationItem>
			{data.contain.length !== 0 && (
				<Collapse_ open={openTab}>
					<React.Fragment>
						{data.contain.map((i) =>
							i.type === 'folder' ? (
								<FavoriteFolder
									key={i.key}
									open={open}
									data={i}
									indent={indent + 1}
									temp={temp}
								/>
							) : (
								<FavoriteServer
									key={i.key}
									data={i}
									indent={indent + 1}
									temp={temp}
								/>
							),
						)}
					</React.Fragment>
				</Collapse_>
			)}
			{!temp && <FolderContextMenu data={data} />}
		</React.Fragment>
	);
};

FavoriteFolder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
	temp: PropTypes.bool.isRequired,
};

export default FavoriteFolder;
