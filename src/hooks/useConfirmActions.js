import React, {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {DELETE_SERVER} from '../reducers/common';
import {sendCommandByLs} from '../components/SFTP/commands/sendCommandLs';
import {sendCommandByMkdir} from '../components/SFTP/commands/sendCommandMkdir';
import {sendCommandByRm} from '../components/SFTP/commands/sendCommandRm';
import {sendCommandByRename} from '../components/SFTP/commands/sendCommandRename';
import {sendCommandByPut} from '../components/SFTP/commands/sendCommandPut';
import {sendCommandByGet} from '../components/SFTP/commands/sendCommandGet';

const useConfirmActions = () => {
	const dispatch = useDispatch();
	// const {currentPath, currentText, currentHighlight} = useSelector(
	// 	(state) => state.sftp,
	// );

	const deleteWorkFunction = useCallback(
		async (ws, uuid, curPath, highlightItem) => {
			for await (const key of highlightItem?.list) {
				await sendCommandByRm(
					ws,
					uuid,
					curPath?.path + '/' + key.fileName,
					key.fileType,
				);
				await sendCommandByLs(ws, uuid, curPath?.path, dispatch);
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: key.fileName,
						path: curPath?.path,
						size: key.fileSize,
						todo: 'rm',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				});
				dispatch({
					type: SFTP_SAVE_CURRENT_HIGHLIGHT,
					data: {uuid, list: []},
				});
			}
		},
		[],
	);

	const renameWorkFunction = useCallback(
		async (ws, uuid, curPath, highlightItem, formValue) => {
			const path = curPath?.path === '/' ? '/' : curPath?.path + '/';
			await sendCommandByRename(
				ws,
				uuid,
				path + highlightItem?.list[0].fileName,
				path + formValue,
			);

			await sendCommandByLs(ws, uuid, curPath?.path, dispatch);

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

	const newFolderFunction = useCallback(
		async (ws, uuid, curPath, formValue) => {
			const path = curPath?.path === '/' ? '/' : curPath?.path + '/';
			await sendCommandByMkdir(ws, uuid, path + formValue);
			await sendCommandByLs(ws, uuid, curPath?.path, dispatch);

			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		},
		[],
	);

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
