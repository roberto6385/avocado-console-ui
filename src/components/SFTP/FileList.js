import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {NAV_HEIGHT} from '../../styles/global';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
`;

const FlexBox = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	.card-header {
		display: flex;
		align-items: center;
		position: relative;
		height: ${NAV_HEIGHT};
	}
`;

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
