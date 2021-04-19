import React, {useCallback, useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from '../../Popup/ConfirmPopup';
import {toEditMode} from '../commands';
import useSftpCommands from '../../../hooks/useSftpCommands';

const FileListContextMenu = ({server}) => {
	const {socket, uuid, highlight, path, mode} = server;

	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	// const dispatch = useDispatch();
	// const {downloadWork} = useSftpCommands({ws: socket, uuid});

	const MENU_ID = uuid + 'fileList';
	const contextDownload = () => {
		// downloadWork(currentlistMode?.mode, highlightItem?.list)
	};

	const contextEdit = (e) => {};

	const handleItemClick = ({event}) => {
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
	};
	return (
		<>
			<Menu
				id={MENU_ID}
				animation={animation.slide}
				style={{fontSize: '14px'}}
			>
				<Item
					disabled={highlight[0] === null || undefined}
					id='Download'
					onClick={handleItemClick}
				>
					Download
				</Item>
				<Item
					disabled={highlight[0] === null || highlight.length !== 1}
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
					disabled={highlight[0] === null || highlight.length !== 1}
					id='rename_work'
					onClick={handleItemClick}
				>
					Rename
				</Item>
				<Separator />
				<Item
					disabled={highlight[0] === null || undefined}
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
				server={server}
			/>
		</>
	);
};

FileListContextMenu.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileListContextMenu;
