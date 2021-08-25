import React, {useCallback, useMemo, useState} from 'react';
import History from '../History/History';
import {useDispatch, useSelector} from 'react-redux';
import {
	ADD_HISTORY_HI,
	INITIAL_HISTORY_HI,
	REMOVE_HISTORY,
	REMOVE_READ_WRITE_LIST,
} from '../../../reducers/sftp';
import * as PropTypes from 'prop-types';
import {authSelector} from '../../../reducers/api/auth';
import {tabBarSelector} from '../../../reducers/tabBar';
import {remoteResourceSelector} from '../../../reducers/remoteResource';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import {compareFiles, compareTypes} from '../../../utils/sftp';

const HistoryContianer = ({uuid}) => {
	const dispatch = useDispatch();
	const [prevOffset, setPrevOffset] = useState(null);
	const {userData} = useSelector(authSelector.all);
	const {resources, accounts} = useSelector(remoteResourceSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	const {terminalTabs} = useSelector(tabBarSelector.all);
	const terminalTab = useMemo(
		() => terminalTabs.find((it) => it.uuid === uuid),
		[terminalTabs, uuid],
	);

	const resource = useMemo(
		() => resources.find((it) => it.key === terminalTab.server.key),
		[terminalTab.server.key, resources],
	);
	const account = useMemo(
		() =>
			accounts.find(
				(it) =>
					it.key === terminalTab.server.key && it.checked === true,
			),
		[accounts, terminalTab],
	);

	const onClickUploadHistory = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const files = e.target.files;
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: sftp.path, file: v},
					}),
				);
				dispatch(
					sftpAction.addHistory({
						uuid: uuid,
						history: {
							name: v.name,
							size: v.size,
							type: types.upload,
						},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: types.upload,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, sftp, terminalTabs, uuid]);

	const onDropUploadHistory = useCallback(
		async (files) => {
			console.log(files);
			const terminalTab = terminalTabs.find((it) => it.uuid === uuid);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: sftp.path, file: v},
					}),
				);
				dispatch(
					sftpAction.addHistory({
						uuid: uuid,
						history: {
							name: v.name,
							size: v.size,
							type: types.upload,
						},
					}),
				);
			}
			if (!sftp.upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: terminalTab.server.key,
						type: types.upload,
					}),
				);
			}
		},
		[dispatch, sftp, terminalTabs, uuid],
	);
	const compareHistories = useCallback(
		(first, second) => {
			dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});

			let list = [];
			if (first <= second) {
				for (let i = first; i <= second; i++) {
					list.push(history[i]);
				}
			} else {
				for (let i = first; i >= second; i--) {
					list.push(history[i]);
				}
			}
			dispatch({
				type: ADD_HISTORY_HI,
				payload: {
					uuid,
					history: list,
				},
			});
		},
		[dispatch, history, uuid],
	);

	const onClickSelectHistory = useCallback(
		(item) => (e) => {
			let result = sftp.selected.historys.slice();
			if (e.metaKey) {
				if (result.find((v) => v.id === item.id)) {
					result = result.filter((v) => v.id !== item.id);
				} else {
					result.push(item);
				}
			} else if (e.shiftKey) {
				if (result.length === 0) {
					const index = sftp.history.findIndex(
						(v) => v.id === item.id,
					);
					console.log(index);
					result = sftp.history.slice(0, index + 1);
				} else {
					result = compareFiles(
						sftp.history,
						item,
						result[0],
						compareTypes.id,
					);
				}
			} else {
				result = [item];
			}
			dispatch(
				sftpAction.setSelectedHistory({
					uuid: uuid,
					result: result,
				}),
			);
		},
		[dispatch, sftp, uuid],
	);

	//TODO progress가 0인 히스토리 삭제 시 작업삭제
	const onClickDeleteHistory = useCallback(
		(history) => () => {
			if (history.progress === 0) {
				console.log(history);
				dispatch({
					type: REMOVE_READ_WRITE_LIST,
					payload: {uuid, history},
				});
			}
			if (
				history.progress === 0 ||
				history.progress === 100 ||
				isNaN(history.progress)
			) {
				dispatch({type: REMOVE_HISTORY, payload: {uuid, history}});
			}
		},
		[dispatch, uuid],
	);

	return (
		<History
			history={sftp.history}
			selectedHistorys={sftp.selected.historys}
			// writeSocket={writeSocket}
			// readSocket={readSocket}
			onDropUpload={onDropUploadHistory}
			onClickUpload={onClickUploadHistory}
			onSelect={onClickSelectHistory}
			// onRemove={onClickDeleteHistory}
		/>
	);
};

HistoryContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContianer;
