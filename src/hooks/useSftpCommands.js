import React, {useCallback, useMemo} from 'react';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
	SFTP_SAVE_DROPLIST_HIGHLIGHT,
} from '../reducers/subSftp';
import {listConversion} from '../components/SFTP/listConversion';
import {useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';
import newSftp_ws from '../sagas/sftp/messageSender';
import {downloadAction} from '../reducers/download';
import {uploadAction} from '../reducers/upload';

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
		dispatch()
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
