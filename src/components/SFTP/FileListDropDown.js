import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {DEEP_GRAY_COLOR, HIGHLIGHT_COLOR} from '../../styles/global';
import {DirectoryIcon, FileIcon} from '../../styles/sftp';
import newSftp_ws from '../../ws/sftp_ws';
import useSftpCommands from '../../hooks/useSftpCommands';

const DropdownUl = styled.ul`
	margin: 0;
	padding: 0;
	width: 200px;
	border-right: 1px solid ${DEEP_GRAY_COLOR};
	list-style: none;
`;

const DropdownLi = styled.li`
	padding: 2px;
	white-space: nowrap;
	min-width: 120px;
	&:hover {
		background-color: ${HIGHLIGHT_COLOR};
	}
`;

const FileListDropDown = ({ws, uuid}) => {
	const {currentList} = useSelector((state) => state.sftp);
	const [list, setList] = useState([]);
	const [path, setPath] = useState([]);
	const {initialWork} = useSftpCommands({ws, uuid});

	const selectFile = ({name, type, path}) => {
		console.log(name);
		console.log(type);
		console.log(path);

		type === 'directory' &&
			newSftp_ws({
				keyword: 'CommandByCd',
				ws,
				path: path === '/' ? path + name : path + '/' + name,
			}).then(() => initialWork());
	};

	useEffect(() => {
		const list = currentList?.find((item) => item.uuid === uuid)?.list;
		const path = currentList?.find((item) => item.uuid === uuid)?.path;
		console.log(list);
		setList(list);
		console.log(path);
		setPath(path);
	}, [currentList]);

	return list !== undefined ? (
		<>
			{list.map((listItem, listindex) => {
				return (
					<DropdownUl key={listindex}>
						{listItem.map((item, index) => {
							return (
								<DropdownLi
									key={index}
									onClick={() =>
										selectFile({
											name: item.fileName,
											type: item.fileType,
											path: path[listindex],
										})
									}
								>
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
				);
			})}
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
