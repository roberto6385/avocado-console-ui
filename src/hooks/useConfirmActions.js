import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_TEXT,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {DELETE_SERVER} from '../reducers/common';
import newSftp_ws from '../ws/newSftp_ws';
import useSftpCommands from './useSftpCommands';

const useConfirmActions = (ws, uuid) => {
	const dispatch = useDispatch();
	const {initialWork} = useSftpCommands({ws, uuid});

	const deleteWorkFunction = useCallback(async (highlightItem) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		})
			.then(async (response) => {
				const path = response === '/' ? response : response + '/';
				for await (const key of highlightItem?.list) {
					console.log(path + key.fileName);
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
			})
			.then(() => initialWork());
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
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then(async (response) => {
			await newSftp_ws({
				keyword: 'CommandByPut',
				ws,
				path: response,
				uploadFile: editedFile,
			}).then(() => {
				dispatch({
					type: SFTP_SAVE_CURRENT_TEXT,
					data: {
						uuid,
						text: curText?.text,
						name: editedFile.name,
					},
				});
				dispatch({
					type: SFTP_SAVE_COMPARE_TEXT,
					data: {
						uuid,
						text: curText?.text,
						name: editedFile.name,
					},
				});
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

			editFile: async (curText) => {
				await editFileFunction(curText);
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
