import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import FileListContents from './FileListContents';
import FileListNav from './FileListNav';
import FileListDropDown from './FileListDropDown';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

const _Container = styled.div`
	display: flex;
	flex: 1;
	width: 0px;
	overflow: hidden;
	flex-direction: column;
`;

const FileList = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const {mode} = useMemo(() => sftp.find((it) => it.uuid === uuid), [
		sftp,
		uuid,
	]);

	return (
		<_Container>
			<FileListNav uuid={uuid} />
			{mode === 'list' ? (
				<FileListContents uuid={uuid} />
			) : (
				<FileListDropDown uuid={uuid} />
			)}
		</_Container>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default FileList;
