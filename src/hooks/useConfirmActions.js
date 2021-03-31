import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {DELETE_SERVER} from '../reducers/common';
import sftp_ws from '../ws/sftp_ws';
import {listConversion} from '../components/SFTP/commands';
import newSftp_ws from '../ws/newSftp_ws';
import useSftpCommands from './useSftpCommands';

const useConfirmActions = (ws, uuid) => {
	const dispatch = useDispatch();
	// const {currentPath, currentText, currentHighlight} = useSelector(
	// 	(state) => state.sftp,
	// );
	const {initialWork} = useSftpCommands({ws, uuid});

	const deleteWorkFunction = useCallback(async (highlightItem) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then(async (response) => {
			const path =
				response.path === '/' ? response.path : response.path + '/';
			for await (const key of highlightItem?.list) {
				if (key.fileType === 'file') {
					await newSftp_ws({
						keyword: 'CommandByRm',
						ws,
						path: path + key.fileName,
					});
				} else {
					await newSftp_ws({
						keyword: 'CommandByRmdir',
						ws,
						path: path + key.fileName,
					});
				}
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: key.fileName,
						path: response.result,
						size: key.fileSize,
						todo: 'rm',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				});
			}
			initialWork();
		});
	}, []);

	const renameWorkFunction = useCallback(async (highlightItem, formValue) => {
		await newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			const path = response === '/' ? response : response + '/';
			newSftp_ws({
				keyword: 'CommandByRename',
				ws,
				path: path + highlightItem.list[0].fileName,
				newPath: path + formValue,
			}).then(() => initialWork());
		});
	}, []);

	const editFileFunction = useCallback(async (curText) => {
		// const curText = currentText.find((item) => item.uuid === uuid);
		const editedFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			await sftp_ws({
				keyword: 'CommandByPut',
				ws,
				uuid,
				path: response.result,
				fileName: editedFile.name,
				uploadFile: editedFile,
			}).then(() => {
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: editedFile.name,
						path: response.result,
						size: editedFile.size,
						todo: 'edit',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				});
				dispatch({
					type: SFTP_SAVE_CURRENT_MODE,
					data: {uuid, mode: 'normal'},
				});
			});
		});
	}, []);

	const newFolderFunction = useCallback((formValue) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			console.log(response);
			const path = response === '/' ? '/' : response + '/';
			newSftp_ws({
				keyword: 'CommandByMkdir',
				ws,
				path: path + formValue,
			}).then(() => initialWork());
		});
	}, []);

	const deleteHistoryFunction = useCallback(() => {
		dispatch({
			type: SFTP_DELETE_HISTORY,
			data: {id: -1, uuid},
		});
	}, []);

	return useMemo(
		() => ({
			deleteWork: (highlightItem) => {
				deleteWorkFunction(highlightItem);
			},

			renameWork: (highlightItem, formValue) => {
				renameWorkFunction(highlightItem, formValue);
			},

			editFile: (ws, uuid, curPath, curText) => {
				editFileFunction(ws, uuid, curPath, curText);
			},

			newFolder: (formValue) => {
				newFolderFunction(formValue);
			},

			deleteHistory: (uuid) => {
				deleteHistoryFunction();
			},

			deleteServer: () => {
				dispatch({type: DELETE_SERVER});
			},
		}),
		[dispatch],
	);
};

export default useConfirmActions;
