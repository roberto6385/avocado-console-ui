import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_MODE,
} from '../reducers/sftp';
import {DELETE_SERVER} from '../reducers/common';
import {sendCommandByLs} from '../components/SFTP/commands/sendCommandLs';
import {sendCommandByMkdir} from '../components/SFTP/commands/sendCommandMkdir';
import {sendCommandByRename} from '../components/SFTP/commands/sendCommandRename';
import {sendCommandByPut} from '../components/SFTP/commands/sendCommandPut';
import {sendCommandByGet} from '../components/SFTP/commands/sendCommandGet';
import usePostMessage from '../components/SFTP/hooks/usePostMessage';
import {listConversion} from '../components/SFTP/commands';

const useConfirmActions = (ws, uuid) => {
	const dispatch = useDispatch();
	// const {currentPath, currentText, currentHighlight} = useSelector(
	// 	(state) => state.sftp,
	// );

	const deleteWorkFunction = useCallback(async (curPath, highlightItem) => {
		usePostMessage({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			const path =
				response.result === '/'
					? response.result
					: response.result + '/';
			for await (const key of highlightItem?.list) {
				if (key.fileType === 'file') {
					await usePostMessage({
						keyword: 'CommandByRm',
						ws,
						uuid,
						path: path + key.fileName,
					});
				} else {
					await usePostMessage({
						keyword: 'CommandByRmdir',
						ws,
						uuid,
						path: path + key.fileName,
					});
				}
			}
			await usePostMessage({
				keyword: 'CommandByLs',
				ws,
				uuid,
				path: response.result,
			})
				.then((response) => listConversion(response.result))
				.then((response) =>
					dispatch({
						type: SFTP_SAVE_CURRENT_LIST,
						data: {uuid, list: response},
					}),
				)
				.then(() =>
					dispatch({
						type: SFTP_SAVE_CURRENT_HIGHLIGHT,
						data: {uuid, list: []},
					}),
				);
		});
	}, []);

	const renameWorkFunction = useCallback(
		async (curPath, highlightItem, formValue) => {
			await usePostMessage({
				keyword: 'CommandByPwd',
				ws,
				uuid,
			}).then((response) => {
				const path =
					response.result === '/'
						? response.result
						: response.result + '/';
				usePostMessage({
					keyword: 'CommandByRename',
					ws,
					uuid,
					path: path + highlightItem?.list[0].fileName,
					newPath: path + formValue,
				}).then(() =>
					usePostMessage({
						keyword: 'CommandByLs',
						ws,
						uuid,
						path: response.result,
					})
						.then((response) => listConversion(response.result))
						.then((response) =>
							dispatch({
								type: SFTP_SAVE_CURRENT_LIST,
								data: {uuid, list: response},
							}),
						),
				);
			});
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		},
		[],
	);

	const editFileFunction = useCallback(async (ws, uuid, curPath, curText) => {
		// const curText = currentText.find((item) => item.uuid === uuid);
		const editedFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		console.log(editedFile);
		sendCommandByPut(
			'edit',
			editedFile,
			ws,
			uuid,
			curPath?.path,
			editedFile.name,
			dispatch,
		)
			.then(() =>
				sendCommandByGet(
					'edit',
					ws,
					uuid,
					curPath?.path,
					editedFile.name,
					dispatch,
				),
			)
			.then(() => sendCommandByLs(ws, uuid, curPath?.path, dispatch))
			.then(() =>
				dispatch({
					type: SFTP_SAVE_CURRENT_MODE,
					data: {uuid, mode: 'normal'},
				}),
			);
	}, []);

	const newFolderFunction = useCallback(async (curPath, formValue) => {
		await usePostMessage({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then((response) => {
			const path =
				response.result === '/'
					? response.result
					: response.result + '/';
			usePostMessage({
				keyword: 'CommandByMkdir',
				ws,
				uuid,
				path: path + formValue,
			}).then(() =>
				usePostMessage({
					keyword: 'CommandByLs',
					ws,
					uuid,
					path: response.result,
				})
					.then((response) => listConversion(response.result))
					.then((response) =>
						dispatch({
							type: SFTP_SAVE_CURRENT_LIST,
							data: {uuid, list: response},
						}),
					),
			);
		});
		dispatch({
			type: SFTP_SAVE_CURRENT_HIGHLIGHT,
			data: {uuid, list: []},
		});
	}, []);

	return useMemo(
		() => ({
			deleteWork: (ws, uuid, curPath, highlightItem) => {
				deleteWorkFunction(ws, uuid, curPath, highlightItem);
			},

			renameWork: (ws, uuid, curPath, highlightItem, formValue) => {
				renameWorkFunction(ws, uuid, curPath, highlightItem, formValue);
			},

			editFile: (ws, uuid, curPath, curText) => {
				editFileFunction(ws, uuid, curPath, curText);
			},

			newFolder: (ws, uuid, curPath, formValue) => {
				newFolderFunction(ws, uuid, curPath, formValue);
			},

			deleteHistory: (uuid) => {
				dispatch({
					type: SFTP_DELETE_HISTORY,
					data: {id: -1, uuid},
				});
			},

			deleteServer: () => {
				dispatch({type: DELETE_SERVER});
			},
		}),
		[dispatch],
	);
};

export default useConfirmActions;
