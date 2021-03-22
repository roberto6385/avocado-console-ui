import React, {useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {PropTypes} from 'prop-types';
import styled from 'styled-components';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import {NAV_HEIGHT} from '../../styles/global';
import {listConversion, sendCommandByLs, sendCommandByPwd} from './commands';
import {SFTP_SAVE_CURRENT_LIST} from '../../reducers/sftp';
import {useDispatch} from 'react-redux';

const SFTPBody = styled(Card.Body)`
	padding: 0px;
	display: flex;
	overflow: hidden;
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
	const dispatch = useDispatch();
	const {ws, uuid} = socket;

	// useEffect(() => {
	// 	console.log('FileList 실행됨');
	// 	sendCommandByPwd(ws, uuid, dispatch)
	// 		.then((result) => sendCommandByLs(ws, uuid, result))
	// 		.then((result) => listConversion(result))
	// 		.then((result) =>
	// 			dispatch({
	// 				type: SFTP_SAVE_CURRENT_LIST,
	// 				data: {uuid, list: result},
	// 			}),
	// 		);
	// }, []);
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
