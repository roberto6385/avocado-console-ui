import React, {useCallback, useState} from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import {PropTypes} from 'prop-types';
import {useDispatch} from 'react-redux';
import {ADD_HISTORY, commandGetAction} from '../../../reducers/sftp';
import {OPEN_CONFIRM_POPUP} from '../../../reducers/popup';

const FileListContextMenu = ({server}) => {
	const {uuid, highlight, path, mode} = server;

	const [keyword, setKeyword] = useState('');
	const dispatch = useDispatch();
	// const {downloadWork} = useSftpCommands({ws: socket, uuid});

	const MENU_ID = uuid + 'fileList';
	const contextDownload = () => {
		// downloadWork(currentlistMode?.mode, highlightItem?.list)
		for (let value of highlight) {
			dispatch(
				commandGetAction({
					...server,
					file: mode === 'list' ? value : value.item,
					keyword: 'get',
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: server.uuid,
					name: mode === 'list' ? value.name : value.item.name,
					size: mode === 'list' ? value.size : value.item.size,
					todo: 'get',
					progress: 0,
				},
			});
		}
	};

	const contextEdit = () => {
		for (let value of highlight) {
			dispatch(
				commandGetAction({
					...server,
					file: mode === 'list' ? value : value.item,
					keyword: 'edit',
				}),
			);
		}
	};

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
				dispatch({
					type: OPEN_CONFIRM_POPUP,
					data: {key: 'sftp_new_folder', uuid: server.uuid},
				});
				break;
			case 'rename_work':
				if (
					mode === 'drop' &&
					path === `${highlight[0].path}/${highlight[0].item.name}`
				) {
					alert('현재 경로의 폴더 이름은 변경할 수 없습니다.');
				} else {
					dispatch({
						type: OPEN_CONFIRM_POPUP,
						data: {
							key: 'sftp_rename_file_folder',
							uuid: server.uuid,
						},
					});
				}
				break;
			case 'delete_work':
				dispatch({
					type: OPEN_CONFIRM_POPUP,
					data: {key: 'sftp_delete_file_folder', uuid: server.uuid},
				});
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
		</>
	);
};

FileListContextMenu.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileListContextMenu;
