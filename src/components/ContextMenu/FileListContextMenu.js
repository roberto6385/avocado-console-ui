import React from 'react';
import {animation, Item, Menu, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY,
	commandGetAction,
	commandLsAction,
	DELETE_WORK_LIST,
} from '../../reducers/sftp';
import {OPEN_INPUT_POPUP, OPEN_WARNING_ALERT_POPUP} from '../../reducers/popup';

const FileListContextMenu = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {highlight, path} = corServer;

	const dispatch = useDispatch();

	const MENU_ID = uuid + 'fileList';
	const contextDownload = () => {
		for (let value of highlight) {
			dispatch(
				commandGetAction({
					...corServer,
					file: value,
					keyword: 'get',
				}),
			);
			dispatch({
				type: ADD_HISTORY,
				payload: {
					uuid: uuid,
					name: value.name,
					size: value.size,
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
					...corServer,
					file: value,
					keyword: 'edit',
				}),
			);
		}
	};

	const handleItemClick = ({event}) => {
		switch (event.currentTarget.id) {
			case 'download':
				contextDownload();
				break;
			case 'edit':
				contextEdit(event);
				break;
			case 'new_folder':
				dispatch({
					type: OPEN_INPUT_POPUP,
					data: {key: 'sftp_new_folder', uuid: uuid},
				});
				break;
			case 'rename_work':
				dispatch({
					type: OPEN_INPUT_POPUP,
					data: {
						key: 'sftp_rename_file_folder',
						uuid: uuid,
					},
				});
				break;
			case 'delete_work':
				dispatch({
					type: DELETE_WORK_LIST,
					payload: {
						uuid: uuid,
						list: highlight,
						path: path,
					},
				});

				for (let item of highlight) {
					console.log(item);
					if (
						item.type === 'directory' &&
						item.name !== '..' &&
						item.name !== '.'
					) {
						console.log(path);
						console.log(item.name);
						dispatch(
							commandLsAction({
								...corServer,
								newPath: `${path}/${item.name}`,
								keyword: 'pathFinder',
							}),
						);
					}
				}
				dispatch({
					type: OPEN_WARNING_ALERT_POPUP,
					data: {
						key: 'sftp_delete_file_folder',
						uuid: uuid,
					},
				});
				break;
			default:
				return;
		}
	};
	return (
		<Menu
			id={MENU_ID}
			animation={animation.slide}
			style={{fontSize: '14px'}}
		>
			<Item
				disabled={highlight.length === 0}
				id='download'
				onClick={handleItemClick}
			>
				Download
			</Item>
			<Item
				disabled={
					highlight.length === 0 ||
					highlight.length !== 1 ||
					highlight.slice().find((item) => item.type === 'directory')
				}
				id='edit'
				onClick={handleItemClick}
			>
				Edit
			</Item>
			<Separator />

			<Item id='new_folder' onClick={handleItemClick}>
				New Folder
			</Item>
			<Item
				disabled={highlight.length === 0 || highlight.length !== 1}
				id='rename_work'
				onClick={handleItemClick}
			>
				Rename
			</Item>
			<Separator />
			<Item
				disabled={highlight.length === 0}
				id='delete_work'
				onClick={handleItemClick}
			>
				Delete
			</Item>
		</Menu>
	);
};

FileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContextMenu;
