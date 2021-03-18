import React from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileListContents from './FileListContents';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
`;

const FlexBox = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const FileList = ({index, socket}) => {
	return (
		<FlexBox>
			<Card.Header style={{position: 'relative'}}>
				파일리스트 네비게이션 버튼들
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
