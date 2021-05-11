import React from 'react';
import {PropTypes} from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import FileListDropDown from './FileListDropDown';
import {useSelector} from 'react-redux';
import {ColBox, RowBox} from '../../../styles/divs';

const FileList = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {mode} = corServer;
	return (
		<RowBox flex={1} width={'350px'}>
			<ColBox overflow={'scroll'} width={'100%'}>
				<FileListNav uuid={uuid} />
				{mode === 'list' ? (
					<FileListContents uuid={uuid} />
				) : (
					<FileListDropDown uuid={uuid} />
				)}
			</ColBox>
		</RowBox>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileList;
