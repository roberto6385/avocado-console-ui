import React, {useCallback, useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {DEEP_GRAY_COLOR, HIGHLIGHT_COLOR} from '../../../styles/global';
import {DirectoryIcon, FileIcon} from '../../../styles/sftp';
import {useContextMenu} from 'react-contexify';
import FileListContextMenu from './FileListContextMenu';
import {
	ADD_HIGHLIGHT,
	ADD_ONE_HIGHLIGHT,
	commandCdAction,
	REMOVE_HIGHLIGHT,
	SAVE_TEMP_PATH,
} from '../../../reducers/sftp';

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

	// 드래그 방지
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const FileListDropDown = ({server}) => {
	const {uuid, fileList, pathList, highlight} = server;
	console.log(highlight);

	const dispatch = useDispatch();
	const {show} = useContextMenu({
		id: uuid + 'fileList',
	});
	function displayMenu(e) {
		show(e);
	}

	const changePath = useCallback(
		({item, listindex}) => () => {
			dispatch(
				commandCdAction({
					...server,
					newPath: `${pathList[listindex]}/${item.name}`,
				}),
			);
		},
		[server],
	);

	const selectFile = useCallback(
		({item, listindex}) => (e) => {
			if (e.shiftKey) {
				highlight.find(
					(it) => it.item === item && it.path === pathList[listindex],
				) === undefined
					? dispatch({
							type: ADD_HIGHLIGHT,
							payload: {uuid, item, path: pathList[listindex]},
					  })
					: dispatch({
							type: REMOVE_HIGHLIGHT,
							payload: {uuid, item},
					  });
			} else {
				// 그냥 클릭했을 때 , 타입이 file 일 때
				highlight.find(
					(it) => it.item === item && it.path === pathList[listindex],
				) === undefined &&
					dispatch({
						type: ADD_ONE_HIGHLIGHT,
						payload: {uuid, item, path: pathList[listindex]},
					});
			}
		},
		[server],
	);

	const contextMenuOpen = useCallback(
		({item, path}) => (e) => {
			e.preventDefault();
			displayMenu(e);
			e.stopPropagation();
			dispatch({type: SAVE_TEMP_PATH, payload: {uuid, path}});

			console.log(item, path);
			highlight.length < 2 &&
				item !== undefined &&
				path !== undefined &&
				dispatch({
					type: ADD_ONE_HIGHLIGHT,
					payload: {uuid, item, path},
				});
		},
		[server],
	);

	return fileList !== undefined ? (
		<>
			{fileList.map((listItem, listindex) => {
				return (
					<DropdownUl
						id='fileList_ul'
						key={listindex}
						onContextMenu={contextMenuOpen({
							path: pathList[listindex],
						})}
					>
						{listItem.map((item, index) => {
							return (
								<DropdownLi
									className={
										highlight.find(
											(it) =>
												it.item === item &&
												it.path === pathList[listindex],
										) !== undefined
											? 'highlight_list active'
											: 'highlight_list'
									}
									key={index}
									onContextMenu={contextMenuOpen({
										item,
										path: pathList[listindex],
									})}
									onClick={selectFile({
										item,
										listindex,
									})}
									onDoubleClick={changePath({
										item,
										listindex,
									})}
								>
									{item.type === 'directory' ? (
										<DirectoryIcon />
									) : (
										<FileIcon />
									)}
									{item.name}
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
