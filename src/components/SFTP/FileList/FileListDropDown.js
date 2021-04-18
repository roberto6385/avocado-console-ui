import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {DEEP_GRAY_COLOR, HIGHLIGHT_COLOR} from '../../../styles/global';
import {DirectoryIcon, FileIcon} from '../../../styles/sftp';
import newSftp_ws from '../../../ws/sftp_ws';
import useSftpCommands from '../../../hooks/useSftpCommands';
import {SFTP_SAVE_DROPLIST_HIGHLIGHT} from '../../../reducers/subSftp';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from './FileListContextMenu';
import {commandCdAction, HIGHLIGHTING} from '../../../reducers/sftp';

const DropdownUl = styled.ul`
	margin: 0;
	padding: 0;
	min-width: 180px !important;
	border-right: 1px solid ${DEEP_GRAY_COLOR};
	list-style: none;
	overflow-y: scroll;
	.highlight_list.active {
		background: ${HIGHLIGHT_COLOR};
	}
`;

const DropdownLi = styled.li`
	padding: 2px;
	white-space: nowrap;
	width: 150px;
	text-overflow: ellipsis;
	overflow: hidden;

	&:hover {
		background-color: ${HIGHLIGHT_COLOR};
	}
	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const FileListDropDown = ({server}) => {
	const {uuid, fileList, pathList, highlight} = server;
	console.log(fileList);
	console.log(pathList);
	const {droplistHighlight} = useSelector((state) => state.subSftp);
	const dispatch = useDispatch();
	const dropdownHLList = droplistHighlight.find((item) => item.uuid === uuid);
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});
	function displayMenu(e) {
		show(e);
	}
	console.log(highlight);

	const selectFile = (e, {item, listindex}) => {
		if (e.shiftKey) {
			// if (!highlight.includes(item)) {
			// 	const sel = highlight.push(item);
			// 	dispatch({type: HIGHLIGHTING, payload: {list: sel}});
			// }
			// 쉬프트 키를 눌렀을 때
		} else {
			if (item.fileType === 'directory') {
				dispatch(
					commandCdAction({
						...server,
						newPath: `${pathList[listindex]}/${item.fileName}`,
					}),
				);
			} else {
				// 그냥 클릭했을 때 , 타입이 file 일 때
			}
		}
	};

	const contextMenuOpen = (e, {item, path}) => {
		e.preventDefault();
		displayMenu(e);
		e.stopPropagation();
		const list = {item, path};
		if (
			dropdownHLList?.list.length < 2 ||
			dropdownHLList?.list.findIndex(
				(list) => list.item === item,
				list.path === path,
			) === -1
		) {
			dispatch({
				type: SFTP_SAVE_DROPLIST_HIGHLIGHT,
				data: {uuid, list: [list]},
			});
		}
	};

	return fileList !== undefined ? (
		<>
			{fileList.map((listItem, listindex) => {
				return (
					<DropdownUl key={listindex}>
						{listItem.map((item, index) => {
							return (
								<DropdownLi
									// className={
									// 	dropdownHLList?.list !== undefined &&
									// 	dropdownHLList?.list.findIndex(
									// 		(list) =>
									// 			list.item === item &&
									// 			list.path === path[listindex],
									// 	) !== -1
									// 		? 'highlight_list active'
									// 		: 'highlight_list'
									// }
									key={index}
									onContextMenu={(e) =>
										contextMenuOpen(e, {
											item,
											path: pathList[listindex],
										})
									}
									onClick={(e) =>
										selectFile(e, {
											item,
											listindex,
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
			<FileListContextMenu server={server} />
		</>
	) : (
		<div>loading...</div>
	);
};

FileListDropDown.propTypes = {
	server: PropTypes.object.isRequired,
};
export default FileListDropDown;
