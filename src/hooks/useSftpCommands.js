import React, {useCallback, useMemo} from 'react';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
	SFTP_SAVE_DROPLIST_HIGHLIGHT,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {listConversion} from '../components/SFTP/commands';
import {useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';
import newSftp_ws from '../ws/sftp_ws';
import {downloadAction} from '../reducers/download';

const useSftpCommands = ({ws, uuid}) => {
	const dispatch = useDispatch();

	const initialWorkFunction = useCallback(async () => {
		const multiFileList = [];
		let pathList = ['/'];
		await newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		})
			.then(async (response) => {
				let tempPathList = response.split('/');
				tempPathList.reduce(function (accumulator, currentValue) {
					response !== '/' &&
						pathList.push(accumulator + '/' + currentValue);
					return accumulator + '/' + currentValue;
				});
				response !== undefined &&
					dispatch({
						type: SFTP_SAVE_CURRENT_PATH,
						data: {uuid, path: response},
					});
				for (const key of pathList) {
					console.log(key);
					response !== undefined &&
						(await newSftp_ws({
							keyword: 'CommandByLs',
							ws,
							path: key,
						}).then((response) => {
							if (response !== undefined) {
								const fileList = listConversion(response);
								multiFileList.push(fileList);
								console.log(fileList);
							}
						}));
				}
			})
			.then(() => {
				dispatch({
					type: SFTP_SAVE_CURRENT_LIST,
					data: {uuid, list: multiFileList, path: pathList},
				});
				dispatch({
					type: SFTP_SAVE_CURRENT_HIGHLIGHT,
					data: {uuid, list: []},
				});
				dispatch({
					type: SFTP_SAVE_DROPLIST_HIGHLIGHT,
					data: {uuid, list: []},
				});
			});
	}, []);

	const changeDirectoryFunction = useCallback((item) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			const path = response === '/' ? response : response + '/';
			response !== undefined &&
				newSftp_ws({
					keyword: 'CommandByCd',
					ws,
					path: path + item.fileName,
				});
		});
	}, []);

	const uploadWorkFunction = useCallback(async (files) => {
		await newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then(async (response) => {
			for (const key of files) {
				await newSftp_ws({
					keyword: 'CommandByPut',
					ws,
					path: response,
					uploadFile: key,
				}).then(() => {
					dispatch({
						type: SFTP_SAVE_HISTORY,
						data: {
							uuid,
							name: key.name,
							path: response,
							size: key.size,
							todo: 'put',
							progress: 100,
							// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
							// 삭제, dispatch, 삭제 해서 progress 100 만들기
						},
					});
				});
			}
		});
	}, []);

	const downloadWorkFunction = useCallback((mode, itemList) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			for (const key of itemList) {
				if (mode === 'list') {
					dispatch(downloadAction({ws, uuid, key, path: response}));
				} else {
					if (key.fileType !== 'directory') {
						dispatch(
							downloadAction({
								ws,
								uuid,
								key: key.item,
								path: key.path,
							}),
						);
					}
				}
			}
		});
	}, []);

	return useMemo(
		() => ({
			// 경로 탐색, 디렉토리 조회, 리스트로 저장하는 함수
			initialWork: async () => {
				await initialWorkFunction();
			},
			changeDirectoryWork: async (item) => {
				await changeDirectoryFunction(item);
			},
			uploadWork: async (files) => {
				await uploadWorkFunction(files);
			},
			downloadWork: (mode, itemList) => {
				downloadWorkFunction(mode, itemList);
			},
		}),
		[],
	);
};

useSftpCommands.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string,
};

export default useSftpCommands;
