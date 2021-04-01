import React, {useCallback, useMemo, useState} from 'react';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {listConversion} from '../components/SFTP/commands';
import {useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';
import newSftp_ws from '../ws/sftp_ws';
import * as path from 'path';

const useSftpCommands = ({ws, uuid}) => {
	const dispatch = useDispatch();

	const initialWorkFunction = useCallback(() => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			let pathList = ['/'];
			let tempPathList = response.split('/');
			tempPathList.reduce(function (accumulator, currentValue) {
				response !== '/' &&
					pathList.push(accumulator + '/' + currentValue);
				return accumulator + '/' + currentValue;
			});
			console.log(pathList);
			// while (loopPath !== '/') {
			// 	console.log(loopPath);
			// 	pathList.push(loopPath);
			// 	let tempPath = loopPath.split('/');
			// 	tempPath.pop();
			// 	loopPath = tempPath.join('/').trim();
			// }
			// if (response === '/') {
			// 	pathList = Array.from(['/']);
			// } else {
			// 	const tempList = response.split('/');
			// 	tempList.
			// 	pathList = Array.from(tempList);
			// }
			response !== undefined &&
				dispatch({
					type: SFTP_SAVE_CURRENT_PATH,
					data: {uuid, path: response},
				});
			response !== undefined &&
				newSftp_ws({
					keyword: 'CommandByLs',
					ws,
					path: response,
				}).then((response) => {
					if (response !== undefined) {
						const fileList = listConversion(response);
						dispatch({
							type: SFTP_SAVE_CURRENT_LIST,
							data: {uuid, list: fileList},
						});
						dispatch({
							type: SFTP_SAVE_CURRENT_HIGHLIGHT,
							data: {uuid, list: []},
						});
					}
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

	const downloadWorkFunction = useCallback((itemList) => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then(async (response) => {
			for await (const key of itemList) {
				await newSftp_ws({
					keyword: 'CommandByGet',
					ws,
					path: response,
					fileName: key.fileName,
				});
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: key.fileName,
						path: response.result,
						size: key.fileSize,
						todo: 'get',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				});
			}
		});
	}, []);

	return useMemo(
		() => ({
			// 경로 탐색, 디렉토리 조회, 리스트로 저장하는 함수
			initialWork: () => {
				initialWorkFunction();
			},
			changeDirectoryWork: async (item) => {
				await changeDirectoryFunction(item);
			},
			uploadWork: async (files) => {
				await uploadWorkFunction(files);
			},
			downloadWork: (itemList) => {
				downloadWorkFunction(itemList);
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
