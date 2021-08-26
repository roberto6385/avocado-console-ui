import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
	compareFiles,
	compareTypes,
	pathFormatter,
	sortingUtil,
} from '../../../utils/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import DropListBlock from '../File/DropListBlock';
import {useContextMenu} from 'react-contexify';

const DropListBlockContainer = ({uuid, blockPath, resourceId}) => {
	const dispatch = useDispatch();
	const [sortedFiles, setSortedFiles] = useState([]);
	const [prevPath, setPrevPath] = useState('');

	const {sftp} = useSelector(sftpSelector.all);

	const {show} = useContextMenu({
		id: uuid + '-file-list-context-menu',
	});

	const openFileListContextMenu = useCallback(
		(item = null, path = null) =>
			(e) => {
				const {socket, selected} = sftp.find((v) => v.uuid === uuid);
				e.preventDefault();
				console.log(path);
				if (path) {
					dispatch(
						sftpAction.commandCd({
							socket: socket,
							uuid: uuid,
							path: path,
						}),
					);
				}
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

	const handleSelectItem = useCallback(
		(item) => (e) => {
			const {path, selected, socket, files} = sftp.find(
				(v) => v.uuid === uuid,
			);

			if (path === blockPath) {
				if (item.type === 'directory') {
					if (e.metaKey) {
						if (selected.files.length === 0) {
							dispatch(
								sftpAction.commandCd({
									socket: socket,
									uuid: uuid,
									path: pathFormatter(blockPath, item.name),
								}),
							);
						} else {
							let result = selected.files.slice();

							if (result.find((v) => v.name === item.name)) {
								result = result.filter(
									(v) => v.name !== item.name,
								);
							} else {
								result.push(item);
							}
							dispatch(
								sftpAction.setSelectedFile({
									uuid: uuid,
									result: result,
								}),
							);
						}
					} else if (e.shiftKey) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: compareFiles(
									sortedFiles,
									item,
									selected.files.length !== 0
										? selected.files.slice().shift()
										: sortedFiles[0],
									compareTypes.name,
								),
							}),
						);
					} else {
						dispatch(
							sftpAction.commandCd({
								socket: socket,
								uuid: uuid,
								path: pathFormatter(blockPath, item.name),
							}),
						);
					}
				} else {
					if (e.metaKey) {
						let result = selected.files.slice();

						if (result.find((v) => v.name === item.name)) {
							result = result.filter((v) => v.name !== item.name);
						} else {
							result.push(item);
						}
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: result,
							}),
						);
					} else if (e.shiftKey) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: compareFiles(
									sortedFiles,
									item,
									selected.files.length !== 0
										? selected.files.slice().shift()
										: sortedFiles[0],
									compareTypes.name,
								),
							}),
						);
					} else {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: [item],
							}),
						);
					}
				}
			} else {
				const formerItem = files[blockPath].find(
					(v) => v.name === prevPath,
				);
				if (e.metaKey) {
					dispatch(
						sftpAction.commandCd({
							socket: socket,
							uuid: uuid,
							path: blockPath,
						}),
					);
					dispatch(
						sftpAction.setSelectedFile({
							uuid: uuid,
							result: [formerItem, item],
						}),
					);
				} else if (e.shiftKey) {
					dispatch(
						sftpAction.commandCd({
							socket: socket,
							uuid: uuid,
							path: blockPath,
						}),
					);
					dispatch(
						sftpAction.setSelectedFile({
							uuid: uuid,
							result: compareFiles(
								sortedFiles,
								item,
								formerItem,
								compareTypes.name,
							),
						}),
					);
				} else {
					dispatch(
						sftpAction.commandCd({
							socket: socket,
							uuid: uuid,
							path:
								item.type === 'file'
									? blockPath
									: pathFormatter(blockPath, item.name),
						}),
					);
				}
			}
		},
		[blockPath, dispatch, prevPath, sftp, sortedFiles, uuid],
	);

	useEffect(() => {
		const {files, sort} = sftp.find((v) => v.uuid === uuid);

		setSortedFiles(
			sortingUtil({
				array: files[blockPath],
				type: sort.type,
				asc: sort.asc,
			}),
		);
	}, [blockPath, sftp, uuid]);

	useEffect(() => {
		const {path} = sftp.find((v) => v.uuid === uuid);

		const index = blockPath === '/' ? 1 : blockPath.split('/').length;
		setPrevPath(path.split('/')[index]);
	}, [blockPath, sftp, uuid]);

	return (
		<DropListBlock
			sortedFiles={sortedFiles}
			blockPath={blockPath}
			onSelectItem={handleSelectItem}
			prevPath={prevPath}
			onContextMenu={openFileListContextMenu}
			onDownload={onClickDownloadFile}
			currentPath={sftp.find((v) => v.uuid === uuid).path}
			selectedFiles={sftp.find((v) => v.uuid === uuid).selected.files}
		/>
	);
};

DropListBlockContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	blockPath: PropTypes.string.isRequired,
	resourceId: PropTypes.string.isRequired,
};

export default DropListBlockContainer;
