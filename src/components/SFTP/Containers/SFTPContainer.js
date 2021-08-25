import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SFTP from '../SFTP';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import {tabBarSelector} from '../../../reducers/tabBar';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {data} = useSelector(sftpSelector.all);
	const terminalTab = useMemo(
		() => terminalTabs.find((v) => v.uuid === uuid),
		[terminalTabs, uuid],
	);
	const sftp = useMemo(() => data.find((v) => v.uuid === uuid), [data, uuid]);

	// for (let v of sftp.delete.list) {
	// 	yield put(
	// 		sftpAction.commandRemove({
	// 			socket: sftp.delete.socket,
	// 			path:
	// 				v.path === '/'
	// 					? v.path + v.file.name
	// 					: `${v.path}/${v.file.name}`,
	// 			type: v.file.type,
	// 			uuid: uuid,
	// 		}),
	// 	);
	// 	yield take(sftpAction.commandRemoveDone);
	// 	yield put(
	// 		sftpAction.deleteList({uuid: uuid, type: 'delete'}),
	// 	);
	// }
	// yield put(
	// 	sftpAction.deleteSocket({
	// 		socket: sftp.delete.socket,
	// 		uuid: uuid,
	// 		type: 'delete',
	// 	}),
	// );
	// yield put(
	// 	sftpAction.commandPwd({socket: sftp.socket, uuid: uuid}),
	// );

	// delete
	useEffect(() => {
		if (
			sftp.delete.socket &&
			sftp.delete.list.length !== 0 &&
			!sftp.delete.on // switch => on이 아닐 때!
		) {
			dispatch(sftpAction.commandRemove({uuid: uuid}));
		}
	}, [dispatch, sftp.delete, uuid]);

	//search
	useEffect(() => {
		if (
			sftp.search.socket &&
			sftp.search.list.length !== 0 &&
			!sftp.search.on // switch => on이 아닐 때!
		) {
			dispatch(
				sftpAction.searchDirectory({
					uuid: uuid,
					key: terminalTab.server.key,
				}),
			);
		}
	}, [dispatch, sftp.search, terminalTab.server.key, uuid]);

	// upload
	useEffect(() => {
		if (
			sftp.upload.socket &&
			sftp.upload.list.length !== 0 &&
			!sftp.upload.on
		) {
			dispatch(sftpAction.commandWrite({uuid: uuid}));
		}
	}, [dispatch, sftp.upload, uuid]);

	// download;
	useEffect(() => {
		if (
			sftp.download.socket &&
			sftp.download.list.length !== 0 &&
			!sftp.download.on
		) {
			dispatch(sftpAction.commandRead({uuid: uuid}));
		}
	}, [
		dispatch,
		sftp.download.list.length,
		sftp.download.on,
		sftp.download.socket,
		uuid,
	]);

	return <SFTP uuid={uuid} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
