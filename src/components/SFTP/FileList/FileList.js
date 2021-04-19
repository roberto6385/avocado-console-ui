import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {FlexBox, SFTPBody} from '../../../styles/sftp';
import FileListDropDown from './FileListDropDown';

const FileList = ({server}) => {
	const {mode} = server;
	return (
		<FlexBox>
			<Card.Header>
				<FileListNav server={server} />
			</Card.Header>
			<SFTPBody>
				{mode === 'list' ? (
					<FileListContents server={server} />
				) : (
					<FileListDropDown server={server} />
				)}
			</SFTPBody>
		</FlexBox>
	);
};

FileList.propTypes = {
	server: PropTypes.object.isRequired,
};

export default FileList;
