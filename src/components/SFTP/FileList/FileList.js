import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {FlexBox, SFTPBody} from '../../../styles/sftp';
import FileListDropDown from './FileListDropDown';
import {useSelector} from 'react-redux';

const FileList = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;
	return (
		<FlexBox>
			<Card.Header>
				<FileListNav uuid={uuid} />
			</Card.Header>
			<SFTPBody>
				{mode === 'list' ? (
					<FileListContents uuid={uuid} />
				) : (
					<FileListDropDown uuid={uuid} />
				)}
			</SFTPBody>
		</FlexBox>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileList;
