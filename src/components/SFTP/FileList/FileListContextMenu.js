import React, {useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from '../../Popup/ConfirmPopup';
import {toEditMode} from '../commands';
import useSftpCommands from '../../../hooks/useSftpCommands';

const FileListContextMenu = ({server}) => {
	const {socket, uuid} = server;
	const {
		currentHighlight,
		currentPath,
		droplistHighlight,
		listMode,
	} = useSelector((state) => state.subSftp);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const dropdownHLList = droplistHighlight.find((item) => item.uuid === uuid);
	const currentlistMode = listMode.find((item) => item.uuid === uuid);

	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const {downloadWork} = useSftpCommands({ws: socket, uuid});

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
			? toEditMode(
					e,
					socket,
					uuid,
					pathItem?.path,
					item,
					dispatch,
					'list',
			  )
			: toEditMode(
					e,
					socket,
					uuid,
					dropItem.path,
					dropItem?.item,
					dispatch,
					'drop',
			  );
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
			case 'sftp_new_folder':
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

				<Item id='sftp_new_folder' onClick={handleItemClick}>
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
				ws={socket}
				uuid={uuid}
			/>
		</>
	);
};

FileListContextMenu.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileListContextMenu;
