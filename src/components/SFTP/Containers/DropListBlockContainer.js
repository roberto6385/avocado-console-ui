import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {compareFiles, compareTypes, sortingUtil} from '../../../utils/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import DropListBlock from '../File/DropListBlock';
import {useContextMenu} from 'react-contexify';
import {tabBarSelector} from '../../../reducers/tabBar';

const DropListBlockContainer = ({uuid, blockPath}) => {
	const dispatch = useDispatch();
	const [sortedFiles, setSortedFiles] = useState([]);
	const [prevPath, setPrevPath] = useState('');
	const {terminalTabs} = useSelector(tabBarSelector.all);

	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);

	const {show} = useContextMenu({
		id: uuid + '-file-list-context-menu',
	});

	const openFileListContextMenu = useCallback(
		(item = null, path = null) =>
			(e) => {
				e.preventDefault();
				console.log(path);
				if (path) {
					dispatch(
						sftpAction.commandCd({
							socket: sftp.socket,
							uuid: uuid,
							path: path,
						}),
					);
				}
				if (item) {
					if (item.name === '..') return;
					let result = sftp.selected.files.slice();
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
			if (item.type === 'directory') return;

			dispatch(
				sftpAction.addList({
					uuid: uuid,
					type: types.download,
					value: {path: sftp.path, file: item},
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

			if (!sftp.download.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: types.download,
					}),
				);
			}
		},
		[dispatch, sftp, terminalTab, uuid],
	);

	const handleSelectItem = useCallback(
		(item) => (e) => {
			if (sftp.path === blockPath) {
				if (item.type === 'directory') {
					if (e.metaKey) {
						if (sftp.selected.files.length === 0) {
							dispatch(
								sftpAction.commandCd({
									socket: sftp.socket,
									uuid: uuid,
									path:
										blockPath === '/'
											? blockPath + item.name
											: `${blockPath}/${item.name}`,
								}),
							);
						} else {
							let result = sftp.selected.files.slice();

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
									sftp.selected.files.length !== 0
										? sftp.selected.files.slice().shift()
										: sortedFiles[0],
									compareTypes.name,
								),
							}),
						);
					} else {
						dispatch(
							sftpAction.commandCd({
								socket: sftp.socket,
								uuid: uuid,
								path:
									blockPath === '/'
										? blockPath + item.name
										: `${blockPath}/${item.name}`,
							}),
						);
					}
				} else {
					if (e.metaKey) {
						let result = sftp.selected.files.slice();

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
									sftp.selected.files.length !== 0
										? sftp.selected.files.slice().shift()
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
				const formerItem = sftp.files[blockPath].find(
					(v) => v.name === prevPath,
				);
				if (e.metaKey) {
					dispatch(
						sftpAction.commandCd({
							socket: sftp.socket,
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
							socket: sftp.socket,
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
							socket: sftp.socket,
							uuid: uuid,
							path:
								item.type === 'file'
									? blockPath
									: blockPath === '/'
									? blockPath + item.name
									: `${blockPath}/${item.name}`,
						}),
					);
				}
			}
		},
		[blockPath, dispatch, prevPath, sftp, sortedFiles, uuid],
	);

	useEffect(() => {
		setSortedFiles(
			sortingUtil({
				array: sftp.files[blockPath],
				type: sftp.sort.type,
				asc: sftp.sort.asc,
			}),
		);
	}, [blockPath, sftp.files, sftp.sort.asc, sftp.sort.type]);

	useEffect(() => {
		const index = blockPath === '/' ? 1 : blockPath.split('/').length;
		setPrevPath(sftp.path.split('/')[index]);
	}, [blockPath, sftp.path]);

	return (
		<DropListBlock
			sortedFiles={sortedFiles}
			blockPath={blockPath}
			onSelectItem={handleSelectItem}
			prevPath={prevPath}
			onContextMenu={openFileListContextMenu}
			onDownload={onClickDownloadFile}
			currentPath={sftp.path}
			selectedFiles={sftp.selected.files}
		/>
	);
};

DropListBlockContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	blockPath: PropTypes.string.isRequired,
};

export default DropListBlockContainer;
