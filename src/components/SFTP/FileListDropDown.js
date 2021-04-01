import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {DEEP_GRAY_COLOR, HIGHLIGHT_COLOR} from '../../styles/global';
import {DirectoryIcon, FileIcon} from '../../styles/sftp';

const DropdownUl = styled.ul`
	margin: 0;
	padding: 0;
	width: 200px;
	border-right: 1px solid ${DEEP_GRAY_COLOR};
	list-style: none;
`;

const DropdownLi = styled.li`
	padding: 2px;
	&:hover {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

const FileListDropDown = ({ws, uuid}) => {
	const {currentList} = useSelector((state) => state.sftp);
	const data = currentList.find((item) => item.uuid === uuid)?.list;
	console.log(data);

	return data !== undefined ? (
		<>
			<DropdownUl>
				{data.map((item, index) => {
					return (
						<DropdownLi key={index}>
							{item.fileType === 'directory' ? (
								<DirectoryIcon />
							) : (
								<FileIcon />
							)}
							{item.fileName}
						</DropdownLi>
					);
				})}
			</DropdownUl>
		</>
	) : (
		<div>loading...</div>
	);
};

FileListDropDown.propTypes = {
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};
export default FileListDropDown;
