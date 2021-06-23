import React, {useMemo} from 'react';
import {animation, Item, Separator} from 'react-contexify';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

import {useDispatch, useSelector} from 'react-redux';
import {
	commandLsAction,
	commandReadAction,
	DELETE_WORK_LIST,
	PUSH_READ_LIST,
	searchDeleteListAction,
} from '../../reducers/sftp';
import {OPEN_INPUT_POPUP, OPEN_WARNING_ALERT_POPUP} from '../../reducers/popup';
import {ContextMenu_Avocado} from '../../styles/default';

const FileListContextMenu = ({uuid}) => {
	const {t} = useTranslation('contextMenu');
	const dispatch = useDispatch();
	const {sftp} = useSelector((state) => state.sftp);
	const {theme} = useSelector((state) => state.common);

	const corServer = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);
	const {highlight, path} = corServer;

	const contextDownload = async () => {
		const array = [];
		for await (let value of highlight) {
			array.push({path, file: value});
		}
		dispatch({
			type: PUSH_READ_LIST,
			payload: {uuid, array},
		});
	};

	const contextEdit = () => {
		for (let value of highlight) {
			dispatch(
				commandReadAction({
					...corServer,
					file: value,
					keyword: 'edit',
				}),
			);
		}
	};

	const handleItemClick = async ({event}) => {
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
		<ContextMenu_Avocado
			id={uuid + 'fileList'}
			animation={animation.slide}
			theme_value={theme}
		>
			<Item
				disabled={highlight.length === 0}
				id='download'
				onClick={handleItemClick}
			>
				{t('download')}
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
				{t('edit')}
			</Item>
			<Separator />

			<Item id='new_folder' onClick={handleItemClick}>
				{t('newFolder')}
			</Item>
			<Item
				disabled={highlight.length === 0 || highlight.length !== 1}
				id='rename_work'
				onClick={handleItemClick}
			>
				{t('rename')}
			</Item>
			<Separator />
			<Item
				disabled={highlight.length === 0}
				id='delete_work'
				onClick={handleItemClick}
			>
				{t('delete')}
			</Item>
		</ContextMenu_Avocado>
	);
};

FileListContextMenu.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileListContextMenu;
