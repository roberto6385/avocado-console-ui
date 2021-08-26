import React, {useCallback} from 'react';
import History from '../History/History';
import {useDispatch, useSelector} from 'react-redux';
import * as PropTypes from 'prop-types';
import {sftpAction, sftpSelector, types} from '../../../reducers/renewal';
import {compareFiles, compareTypes} from '../../../utils/sftp';

const HistoryContianer = ({uuid, resourceId}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector(sftpSelector.all);

	const onClickUploadHistory = useCallback(async () => {
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = async (e) => {
			const {path, upload} = sftp.find((v) => v.uuid === uuid);
			const files = e.target.files;
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: path, file: v},
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
			if (!upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: resourceId,
						type: types.upload,
					}),
				);
			}
		};
		document.body.removeChild(uploadInput);
	}, [dispatch, resourceId, sftp, uuid]);

	const onDropUploadHistory = useCallback(
		async (files) => {
			const {path, upload} = sftp.find((v) => v.uuid === uuid);

			console.log(files);
			for await (let v of files) {
				dispatch(
					sftpAction.addList({
						uuid: uuid,
						type: types.upload,
						value: {path: path, file: v},
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
			if (!upload.on) {
				dispatch(
					sftpAction.createSocket({
						uuid: uuid,
						key: resourceId,
						type: types.upload,
					}),
				);
			}
		},
		[dispatch, resourceId, sftp, uuid],
	);

	const onClickSelectHistory = useCallback(
		(item) => (e) => {
			const {selected} = sftp.find((v) => v.uuid === uuid);

			let result = selected.historys.slice();
			if (e.metaKey) {
				if (result.find((v) => v.id === item.id)) {
					result = result.filter((v) => v.id !== item.id);
				} else {
					result.push(item);
				}
			} else if (e.shiftKey) {
				if (result.length === 0) {
					const index = history.findIndex((v) => v.id === item.id);
					console.log(index);
					result = history.slice(0, index + 1);
				} else {
					result = compareFiles(
						history,
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
	const onClickDeleteHistory = useCallback(() => () => {}, []);

	return (
		<History
			history={sftp.find((v) => v.uuid === uuid).history}
			selectedHistorys={
				sftp.find((v) => v.uuid === uuid).selected.historys
			}
			onDropUpload={onDropUploadHistory}
			onClickUpload={onClickUploadHistory}
			onSelect={onClickSelectHistory}
			// onRemove={onClickDeleteHistory}
		/>
	);
};

HistoryContianer.propTypes = {
	uuid: PropTypes.string.isRequired,
	resourceId: PropTypes.string.isRequired,
};

export default HistoryContianer;
