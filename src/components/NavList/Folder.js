import React, {useCallback, useEffect, useRef, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useContextMenu} from 'react-contexify';
import {
	IoMdFolder,
	IoMdFolderOpen,
	RiArrowDropDownFill,
	RiArrowDropRightFill,
} from 'react-icons/all';
import {useDispatch, useSelector} from 'react-redux';
import Server from './Server';
import {
	CHANGE_SERVER_FOLDER_NAME,
	SET_CLICKED_SERVER,
	SORT_SERVER_AND_FOLDER,
} from '../../reducers/common';
import FolderContextMenu from '../ContextMenu/FolderContextMenu';
import useInput from '../../hooks/useInput';
import {Folder_Server_Nav_Item} from '../../styles/navs';
import {BaseForm, BaseInput} from '../../styles/forms';

import {
	GREEN_COLOR,
	SERVER_HOVER_COLOR,
	IconButton,
	ICON_LIGHT_COLOR,
	Avocado_span,
	MIDDLE_FONTSIZE,
	LIGHT_MODE_BACK_COLOR,
	AVOCADO_FONTSIZE,
} from '../../styles/global_design';
import Collapse_Container from '../container/Collapse_Container';

const Folder = ({open, data, indent}) => {
	const dispatch = useDispatch();
	const {clicked_server} = useSelector((state) => state.common);

	const renameRef = useRef(null);
	const [openTab, setOpenTab] = useState(false);
	const [openRename, setOpenRename] = useState(false);
	const [renameValue, onChangeRenameValue, setRenameValue] = useInput('');

	const onCLickFolder = useCallback(() => {
		if (clicked_server === data.key) {
			dispatch({type: SET_CLICKED_SERVER, data: null});
		} else {
			dispatch({type: SET_CLICKED_SERVER, data: data.key});
		}
	}, [clicked_server, data, dispatch]);

	const onClickOpen = useCallback(() => {
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
		[data, dispatch],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			if (renameValue !== data.name)
				dispatch({
					type: CHANGE_SERVER_FOLDER_NAME,
					data: {key: data.key, name: renameValue},
				});
			setOpenRename(false);
		},
		[data, renameValue],
	);

	const EscapeKey = useCallback((e) => {
		if (e.keyCode === 27) setOpenRename(false);
	}, []);

	const prevPutItem = useCallback(() => {
		dispatch({type: SET_CLICKED_SERVER, data: data.key});
	}, [data]);

	const nextPutItem = useCallback(
		(e) => {
			e.stopPropagation();

			data.type === 'folder' &&
				dispatch({
					type: SORT_SERVER_AND_FOLDER,
					data: {next: data, indent: parseInt(indent)},
				});
		},
		[data, indent],
	);
	//when re-name form is open, fill in pre-value and focus and select it
	useEffect(() => {
		const fillInForm = async () => {
			if (openRename) {
				await setRenameValue(data.name);
				await renameRef.current.focus();
				await renameRef.current.select();
			}
		};
		fillInForm();
	}, [openRename, renameRef, data]);

	useEffect(() => {
		setOpenTab(open);
	}, [open]);

	return (
		<React.Fragment>
			<Folder_Server_Nav_Item
				onClick={onCLickFolder}
				draggable='true'
				onDragStart={prevPutItem}
				onDrop={nextPutItem}
				onContextMenu={contextMenuOpen}
				border={
					clicked_server === data.key
						? `2px solid ${GREEN_COLOR}`
						: undefined
				}
				back={
					clicked_server === data.key
						? SERVER_HOVER_COLOR
						: LIGHT_MODE_BACK_COLOR
				}
				left={(indent * 6 + 6).toString() + 'px'}
			>
				<Avocado_span
					size={MIDDLE_FONTSIZE}
					color={
						clicked_server === data.key
							? GREEN_COLOR
							: ICON_LIGHT_COLOR
					}
				>
					{clicked_server === data.key ? (
						<IoMdFolder />
					) : (
						<IoMdFolderOpen />
					)}
				</Avocado_span>
				<Avocado_span flex={1} size={AVOCADO_FONTSIZE}>
					{openRename ? (
						<BaseForm onSubmit={handleSubmit} onBlur={handleSubmit}>
							<BaseInput
								ref={renameRef}
								type='text'
								value={renameValue}
								onChange={onChangeRenameValue}
								onKeyDown={EscapeKey}
							/>
						</BaseForm>
					) : (
						data.name
					)}
				</Avocado_span>
				<IconButton onClick={onClickOpen}>
					{openTab ? (
						<RiArrowDropDownFill />
					) : (
						<RiArrowDropRightFill />
					)}
				</IconButton>
			</Folder_Server_Nav_Item>
			{data.contain.length !== 0 && (
				<Collapse_Container open={openTab}>
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
				</Collapse_Container>
			)}
			<FolderContextMenu data={data} setOpenRename={setOpenRename} />
		</React.Fragment>
	);
};

Folder.propTypes = {
	open: PropTypes.bool.isRequired,
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default Folder;
