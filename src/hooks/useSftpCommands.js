import React, {useCallback, useMemo} from 'react';
import sftp_ws from '../ws/sftp_ws';
import {
	SFTP_SAVE_CURRENT_LIST,
	SFTP_SAVE_CURRENT_PATH,
	SFTP_SAVE_HISTORY,
} from '../reducers/sftp';
import {listConversion} from '../components/SFTP/commands';
import {useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';

const useSftpCommands = ({ws, uuid}) => {
	const dispatch = useDispatch();

	const initialWorkFunction = useCallback(() => {
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then((response) => {
			dispatch({
				type: SFTP_SAVE_CURRENT_PATH,
				data: {uuid, path: response.result},
			});
			sftp_ws({
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
				);
		});
	}, []);

	const uploadWorkFunction = useCallback((files) => {
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			for (const key of files) {
				await sftp_ws({
					keyword: 'CommandByPut',
					ws,
					uuid,
					path: response.result,
					fileName: key.name,
					uploadFile: key,
				}).then((response) => {
					dispatch({
						type: SFTP_SAVE_HISTORY,
						data: {
							uuid,
							name: key.name,
							path: response.result,
							size: key.size,
							todo: 'put',
							progress: 100,
							// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
							// 삭제, dispatch, 삭제 해서 progress 100 만들기
						},
					});
				});
			}
			sftp_ws({
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
				);
		});
	}, []);

	return useMemo(
		() => ({
			// 경로 탐색, 디렉토리 조회, 리스트로 저장하는 함수
			initialWork: () => {
				initialWorkFunction();
			},
			uploadWork: (files) => {
				uploadWorkFunction(files);
			},
		}),
		[],
	);
};

useSftpCommands.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default useSftpCommands;
