import React, {useCallback, useMemo} from 'react';
import sftp_ws from '../ws/sftp_ws';
import {
	SFTP_SAVE_CURRENT_HIGHLIGHT,
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {listConversion} from '../components/SFTP/commands';
import {useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';
import newSftp_ws from '../ws/newSftp_ws';

const useSftpCommands = ({ws, uuid}) => {
	const dispatch = useDispatch();

	const initialWorkFunction = useCallback(() => {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
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
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			for await (const key of itemList) {
				await sftp_ws({
					keyword: 'CommandByGet',
					ws,
					uuid,
					path: response.result,
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
			dispatch({
				type: SFTP_SAVE_CURRENT_HIGHLIGHT,
				data: {uuid, list: []},
			});
		});
	}, []);

	return useMemo(
		() => ({
			// 경로 탐색, 디렉토리 조회, 리스트로 저장하는 함수
			initialWork: () => {
				initialWorkFunction();
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
