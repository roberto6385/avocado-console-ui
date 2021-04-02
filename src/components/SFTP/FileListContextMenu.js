import React, {useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from '../ConfirmPopup';
import {toEditMode} from './commands';
import useSftpCommands from '../../hooks/useSftpCommands';

const FileListContextMenu = ({ws, uuid}) => {
	const {
		currentHighlight,
		currentPath,
		droplistHighlight,
		listMode,
	} = useSelector((state) => state.sftp);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dropdownHLList = droplistHighlight.find((item) => item.uuid === uuid);
	const currentlistMode = listMode.find((item) => item.uuid === uuid);
	console.log(dropdownHLList?.list);
	console.log(currentlistMode?.mode);

	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const {downloadWork} = useSftpCommands({ws, uuid});

	const MENU_ID = uuid + 'fileList';
	const contextDownload = () => {
		currentlistMode?.mode === 'list'
			? downloadWork(currentlistMode?.mode, highlightItem?.list)
			: downloadWork(currentlistMode?.mode, dropdownHLList?.list);
	};

	const contextEdit = (e) => {
		const item = highlightItem?.list[0];
		const dropItem = dropdownHLList?.list[0];
		currentlistMode?.mode === 'list'
			? toEditMode(e, ws, uuid, pathItem?.path, item, dispatch)
			: toEditMode(e, ws, uuid, dropItem.path, dropItem?.item, dispatch);
	};

	function handleItemClick({event}) {
		setKeyword(event.currentTarget.id);
		switch (event.currentTarget.id) {
			case 'Download':
				contextDownload();
				break;
			case 'Edit':
				contextEdit(event);
				break;
			case 'new_folder':
				setOpen(true);
				break;
			case 'rename_work':
				setOpen(true);
				break;
			case 'delete_work':
				setOpen(true);
				break;
			default:
				return;
		}
	}
	return (
		<>
			<Menu
				id={MENU_ID}
				animation={animation.slide}
				style={{fontSize: '14px'}}
			>
				<Item
					disabled={
						currentlistMode?.mode === 'list'
							? highlightItem?.list.length === 0 ||
							  highlightItem?.list[0]?.fileName === '..'
							: dropdownHLList?.list.length === 0 ||
							  dropdownHLList?.list[0]?.item.fileName === '..'
					}
					id='Download'
					onClick={handleItemClick}
				>
					Download
				</Item>
				<Item
					disabled={
						currentlistMode?.mode === 'list'
							? highlightItem?.list.length !== 1 ||
							  highlightItem?.list[0]?.fileType === 'directory'
							: dropdownHLList?.list.length !== 1 ||
							  dropdownHLList?.list[0]?.item.fileType ===
									'directory'
					}
					id='Edit'
					onClick={handleItemClick}
				>
					Edit
				</Item>
				<Separator />

				<Item id='new_folder' onClick={handleItemClick}>
					New Folder
				</Item>
				<Item
					disabled={
						currentlistMode?.mode === 'list'
							? highlightItem?.list.length !== 1 ||
							  highlightItem?.list[0]?.fileName === '..'
							: dropdownHLList?.list.length !== 1 ||
							  dropdownHLList?.list[0]?.item.fileName === '..'
					}
					id='rename_work'
					onClick={handleItemClick}
				>
					Rename
				</Item>
				<Separator />
				<Item
					disabled={
						currentlistMode?.mode === 'list'
							? highlightItem?.list.length === 0 ||
							  highlightItem?.list[0]?.fileName === '..'
							: dropdownHLList?.list.length === 0 ||
							  dropdownHLList?.list[0]?.item.fileName === '..'
					}
					id='delete_work'
					onClick={handleItemClick}
				>
					Delete
				</Item>
			</Menu>
			<ConfirmPopup
				keyword={keyword}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</>
	);
};

FileListContextMenu.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default FileListContextMenu;
