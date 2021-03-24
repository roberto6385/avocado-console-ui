import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {FlexBox, SFTPBody} from '../../styles/sftp';

const FileList = ({index, socket}) => {
	return (
		<FlexBox>
			<Card.Header>
				<FileListNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<SFTPBody>
				<FileListContents
					id={`sftp ${String(index)}`}
					index={index}
					ws={socket.ws}
					uuid={socket.uuid}
				/>
			</SFTPBody>
		</FlexBox>
	);
};

FileList.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default FileList;
