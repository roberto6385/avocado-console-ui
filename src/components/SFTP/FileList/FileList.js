import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {FlexBox} from '../../../styles/sftp';
import FileListDropDown from './FileListDropDown';
import {useSelector} from 'react-redux';
import {BaseCard, MainHeader, SFTPBody} from '../../../styles/cards';

const FileList = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;
	return (
		<BaseCard flex={4}>
			<FileListNav uuid={uuid} />
			{mode === 'list' ? (
				<FileListContents uuid={uuid} />
			) : (
				<FileListDropDown uuid={uuid} />
			)}
		</BaseCard>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileList;
