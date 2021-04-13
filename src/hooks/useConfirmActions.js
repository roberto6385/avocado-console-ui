import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {
	SFTP_DELETE_HISTORY,
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_TEXT,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import newSftp_ws from '../ws/sftp_ws';
import useSftpCommands from './useSftpCommands';

const useConfirmActions = (ws, uuid) => {
	const dispatch = useDispatch();
	const {initialWork} = useSftpCommands({ws, uuid});

	const deleteWorkFunction = useCallback(async (mode, highlightItem) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		})
			.then(async (response) => {
				for await (const key of highlightItem?.list) {
					const path =
						mode === 'list'
							? response === '/'
								? response
								: response + '/'
							: key.path === '/'
							? '/'
							: key.path + '/';

					const fileName =
						mode === 'list' ? key.fileName : key.item.fileName;
					const fileType =
						mode === 'list' ? key.fileType : key.item.fileType;
					if (fileType === 'file') {
						await newSftp_ws({
							keyword: 'CommandByRm',
							ws,
							path: path + fileName,
						});
					} else {
						await newSftp_ws({
							keyword: 'CommandByRmdir',
							ws,
							path: path + fileName,
						});
					}
					dispatch({
						type: SFTP_SAVE_HISTORY,
						data: {
							uuid,
							name:
								mode === 'list'
									? key.fileName
									: key.item.fileName,
							path: response.result,
							size:
								mode === 'list'
									? key.fileSize
									: key.item.fileSize,
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

	const renameWorkFunction = useCallback(
		async (mode, highlightItem, formValue) => {
			highlightItem !== undefined &&
				(await newSftp_ws({
					keyword: 'CommandByPwd',
					ws,
				}).then((response) => {
					const path =
						mode === 'list'
							? response === '/'
								? response
								: response + '/'
							: highlightItem[0].path === '/'
							? '/'
							: highlightItem[0].path + '/';
					const fileName =
						mode === 'list'
							? highlightItem[0].fileName
							: highlightItem[0].item.fileName;
					newSftp_ws({
						keyword: 'CommandByRename',
						ws,
						path: path + fileName,
						newPath: path + formValue,
					}).then(() => initialWork());
				}));
		},
		[],
	);

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

	const sftNewFolderFunction = useCallback((formValue) => {
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

	return useMemo(
		() => ({
			deleteWork: (mode, highlightItem) => {
				deleteWorkFunction(mode, highlightItem);
			},

			renameWork: (mode, highlightItem, formValue) => {
				renameWorkFunction(mode, highlightItem, formValue);
			},

			editFile: async (curText) => {
				await editFileFunction(curText);
			},

			sftpNewFolder: (formValue) => {
				sftNewFolderFunction(formValue);
			},

			sftpDeleteHistory: () => {
				dispatch({
					type: SFTP_DELETE_HISTORY,
					data: {id: -1},
				});
			},
		}),
		[dispatch],
	);
};

export default useConfirmActions;
