import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {FlexBox, SFTPBody} from '../../../styles/sftp';
import {useSelector} from 'react-redux';
import FileListDropDown from './FileListDropDown';

const FileList = ({index, socket}) => {
	const {listMode} = useSelector((state) => state.sftp);
	const currentMode = listMode.find((item) => item.uuid === socket.uuid);
	return (
		<FlexBox>
			<Card.Header>
				<FileListNav index={index} ws={socket.ws} uuid={socket.uuid} />
			</Card.Header>
			<SFTPBody>
				{currentMode?.mode === 'list' ? (
					<FileListContents
						id={`sftp ${String(index)}`}
						index={index}
						ws={socket.ws}
						uuid={socket.uuid}
					/>
				) : (
					<FileListDropDown ws={socket.ws} uuid={socket.uuid} />
				)}
			</SFTPBody>
		</FlexBox>
	);
};

FileList.propTypes = {
	index: PropTypes.number.isRequired,
	socket: PropTypes.object.isRequired,
};

export default FileList;
