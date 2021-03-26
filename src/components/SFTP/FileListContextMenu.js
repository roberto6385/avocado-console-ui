import React, {useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {SFTP_SAVE_CURRENT_HIGHLIGHT} from '../../reducers/sftp';
import ConfirmPopup from '../ConfirmPopup';
import {toEditMode} from './commands';
import usePostMessage from './hooks/usePostMessage';

const FileListContextMenu = ({ws, uuid}) => {
	const {currentHighlight, currentPath} = useSelector((state) => state.sftp);
	const highlightItem = currentHighlight.find((item) => item.uuid === uuid);
	const [open, setOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();

	const MENU_ID = uuid + 'fileList';
	const contextDownload = () => {
		usePostMessage({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			for await (const key of highlightItem?.list) {
				await usePostMessage({
					keyword: 'CommandByGet',
					ws,
					uuid,
					path: response.result,
					fileName: key.fileName,
				});
			}
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		});
	};

	const contextEdit = (e) => {
		const item = highlightItem?.list[0];
		console.log(item);
		toEditMode(e, ws, uuid, pathItem?.path, item, dispatch);
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
						highlightItem?.list.length === 0 ||
						highlightItem?.list[0].fileName === '..'
					}
					id='Download'
					onClick={handleItemClick}
				>
					Download
				</Item>
				<Item
					disabled={
						highlightItem?.list.length !== 1 ||
						highlightItem?.list[0].fileType === 'directory'
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
						highlightItem?.list.length !== 1 ||
						highlightItem?.list[0].fileName === '..'
					}
					id='rename_work'
					onClick={handleItemClick}
				>
					Rename
				</Item>
				<Separator />
				<Item
					disabled={
						highlightItem?.list.length === 0 ||
						highlightItem?.list[0].fileName === '..'
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
