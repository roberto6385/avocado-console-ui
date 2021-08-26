import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import SFTP from '../SFTP';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import {tabBarSelector} from '../../../reducers/tabBar';

const SFTPContainer = ({uuid}) => {
	const dispatch = useDispatch();
	const {sftp} = useSelector(sftpSelector.all);
	const {terminalTabs} = useSelector(tabBarSelector.all);
	const {resourceId} = terminalTabs.find((v) => v.uuid === uuid);

	// delete
	useEffect(() => {
		const {socket, list, on} = sftp.find((v) => v.uuid === uuid).delete;
		if (socket && list.length !== 0 && !on) {
			dispatch(sftpAction.commandRemove({uuid: uuid}));
		}
	}, [dispatch, sftp, uuid]);

	//search
	useEffect(() => {
		const {socket, list, on} = sftp.find((v) => v.uuid === uuid).search;
		if (socket && list.length !== 0 && !on) {
			dispatch(
				sftpAction.searchDirectory({
					uuid: uuid,
					key: resourceId,
				}),
			);
		}
	}, [dispatch, resourceId, sftp, sftp.search, uuid]);

	// upload
	useEffect(() => {
		const {socket, list, on} = sftp.find((v) => v.uuid === uuid).upload;

		if (socket && list.length !== 0 && !on) {
			dispatch(sftpAction.commandWrite({uuid: uuid}));
		}
	}, [dispatch, sftp, sftp.upload, uuid]);

	// download;
	useEffect(() => {
		const {socket, list, on} = sftp.find((v) => v.uuid === uuid).download;

		if (socket && list.length !== 0 && !on) {
			dispatch(sftpAction.commandRead({uuid: uuid}));
		}
	}, [dispatch, sftp, sftp.download, uuid]);

	return <SFTP uuid={uuid} resourceId={resourceId} />;
};

SFTPContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default SFTPContainer;
