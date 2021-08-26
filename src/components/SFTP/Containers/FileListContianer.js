import React, {useCallback, useEffect, useMemo, useState} from 'react';
import FileList from '../File/FileList';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {useContextMenu} from 'react-contexify';
import {settingSelector} from '../../../reducers/setting';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import {
	compareFiles,
	compareTypes,
	pathFormatter,
	sortingUtil,
} from '../../../utils/sftp';

const FileListContianer = ({uuid, resourceId}) => {
	const dispatch = useDispatch();
	const {language} = useSelector(settingSelector.all);
	const {sftp} = useSelector(sftpSelector.all);

	const {show} = useContextMenu({
		id: uuid + '-file-list-context-menu',
	});

	const [sortedFiles, setSortedFiles] = useState([]);

	const handleChangePath = useCallback(
		(item) => () => {
			const {socket, path} = sftp.find((v) => v.uuid === uuid);

			if (item.type === 'directory') {
				dispatch(
					sftpAction.commandCd({
						socket: socket,
						uuid: uuid,
						path: pathFormatter(path, item.name),
					}),
				);
			}
		},
		[dispatch, sftp, uuid],
	);

	const onClickDownloadFile = useCallback(
		(item) => () => {
			const {path, download} = sftp.find((v) => v.uuid === uuid);

			if (item.type === 'directory') return;

			dispatch(
				sftpAction.addList({
					uuid: uuid,
					type: types.download,
					value: {path: path, file: item},
				}),
			);

			dispatch(
				sftpAction.addHistory({
					uuid: uuid,
					history: {
						name: item.name,
						size: item.size,
						type: types.download,
					},
				}),
			);

			if (!download.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: resourceId,
						type: types.download,
					}),
				);
			}
		},
		[dispatch, resourceId, sftp, uuid],
	);

	const onClickEditFile = useCallback(
		(item) => (e) => {
			e.stopPropagation();
			console.log(item);
			if (item.type !== 'directory') {
				//todo Edit
			}
		},
		[],
	);

	const openFileListContextMenu = useCallback(
		(item = null) =>
			(e) => {
				const {selected} = sftp.find((v) => v.uuid === uuid);

				e.preventDefault();
				if (item) {
					if (item.name === '..') return;
					let result = selected.files.slice();
					if (result.length === 0 || result.length === 1) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: [item],
							}),
						);
					}
				}
				show(e);
			},
		[dispatch, sftp, show, uuid],
	);

	const handleSelectFile = useCallback(
		(item) => (e) => {
			const {selected} = sftp.find((v) => v.uuid === uuid);

			if (item.name === '..') return;

			let result = selected.files.slice();
			if (e.metaKey) {
				if (result.find((v) => v.name === item.name)) {
					result = result.filter((v) => v.name !== item.name);
				} else {
					result.push(item);
				}
			} else if (e.shiftKey) {
				if (result.length === 0) {
					const files = sortedFiles.filter(
						(v) => v.name !== '..' && v.name !== '.',
					);
					console.log(files);
					const index = files.findIndex((v) => v.name === item.name);
					result = files.slice(0, index + 1);
				} else {
					result = compareFiles(
						sortedFiles,
						item,
						result[0],
						compareTypes.name,
					);
				}
			} else {
				result = [item];
			}
			dispatch(
				sftpAction.setSelectedFile({
					uuid: uuid,
					result: result,
				}),
			);
		},
		[dispatch, sftp, sortedFiles, uuid],
	);

	useEffect(() => {
		const {files, path, sort} = sftp.find((v) => v.uuid === uuid);

		if (files[path]) {
			setSortedFiles(
				sortingUtil({
					array: files[path],
					type: sort.type,
					asc: sort.asc,
				}),
			);
		}
	}, [sftp, uuid]);

	return (
		<FileList
			uuid={uuid}
			highlight={sftp.find((v) => v.uuid === uuid).selected.files}
			path={sftp.find((v) => v.uuid === uuid).path}
			language={language}
			list={sortedFiles}
			onContextMenu={openFileListContextMenu}
			onSelectFile={handleSelectFile}
			onDownload={onClickDownloadFile}
			onEdit={onClickEditFile}
			onChangePath={handleChangePath}
		/>
	);
};

FileListContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
	resourceId: PropTypes.string.isRequired,
};

export default FileListContianer;
