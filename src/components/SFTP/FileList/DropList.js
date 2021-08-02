import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {HEIGHT_48, WIDTH_220} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	highColor,
	tabColor,
} from '../../../styles/color';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {HoverButton, Icon} from "../../../styles/components/icon";

const _Container = styled.div`
	display: flex;
	flex: 1;
	overflow-x: scroll;
	font-size: 14px;
`;

const _ItemContainer = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 106px;
	margin-right: 16px;
`;

const _FirstItemContainer = styled(_ItemContainer)`
	display: flex;
	align-items: center;
	flex: 1;
	min-width: 200px;
	margin-left: 16px;
`;

const _ButtonContainer = styled(_ItemContainer)`
	display: flex;
	justify-content: flex-end;
	min-width: 63px;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	${HiddenScroll}
	height: 100%;
	min-width: ${(props) => props.width};
	flex: ${(props) => props.flex};
	list-style: none;
	overflow-y: scroll;
	margin: 0px;
	padding: 0px;
	outline: none;
	background: ${(props) => props.back};
	border-right: 1px solid;
	border-color: ${(props) => props.bcolor};
	color: ${(props) => props.color};
`;

const _Li = styled.li`
	background: ${(props) => props?.back};
	min-width: ${WIDTH_220};
	height: ${HEIGHT_48};
	white-space: nowrap;
	padding: 0px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid;
	border-color: ${(props) => props.bcolor};
	font-weight: bold;
`;

const DropList = ({
	uuid,
	list,
	pathList,
	theme,
	onClick,
	onContextMenu,
	highlight,
	path,
	onEdit,
	onDownload,
}) => {
	return (
		<_Container>
			{list.map((listItem, listindex) => {
				return (
					<_Ul
						width={
							pathList.length - 1 === listindex
								? '500px'
								: '220px'
						}
						flex={pathList.length - 1 === listindex && 1}
						back={tabColor[theme]}
						color={fontColor[theme]}
						bcolor={
							pathList.length - 1 === listindex
								? 'transparent'
								: borderColor[theme]
						}
						id='fileList_ul'
						key={listindex}
						onContextMenu={onContextMenu({
							clickedPath: pathList[listindex],
						})}
					>
						{listItem.map((item, index) => {
							if (listindex === 0 && item.name === '..') return;
							return (
								item.name !== '.' && (
									<_Li
										className={'filelist_contents'}
										back={
											(highlight.findIndex(
												(it) =>
													it?.name === item.name &&
													path ===
														pathList[listindex],
											) > -1 &&
												fileListHighColor[theme]) ||
											(pathList[listindex + 1]
												?.split('/')
												.pop() === item.name &&
												highColor[theme]) ||
											tabColor[theme]
										}
										bcolor={borderColor[theme]}
										key={index}
										onContextMenu={onContextMenu({
											item,
											clickedPath: pathList[listindex],
										})}
										onClick={onClick({
											item,
											listindex,
											itemIndex: index,
										})}
									>
										<_FirstItemContainer
											className={'filelist_contents'}
										>
											{item.type === 'directory' ? (
												<Icon
													margin_right={'8px'}
													color={activeColor[theme]}
												>
													{folderOpenIcon}
												</Icon>
											) : (
												<Icon
													margin_right={'8px'}
													theme_value={theme}
												>
													{fileIcon}
												</Icon>
											)}

											<div
												className={'filelist_contents'}
											>
												{item.name}
											</div>
										</_FirstItemContainer>
										{pathList.length - 1 === listindex && (
											<>
												<_ItemContainer
													className={
														'filelist_contents'
													}
												>
													{item.permission}
												</_ItemContainer>
												<_ButtonContainer>
													{item.type === 'file' &&
														item.name !== '..' && (
															<HoverButton
																theme_value={
																	theme
																}
																margin_right={
																	'12px'
																}
																zIndex={1}
																onClick={onEdit(
																	item,
																)}
															>
																{editIcon}
															</HoverButton>
														)}
													{item.name !== '..' && (
														<HoverButton
															theme_value={theme}
															zIndex={1}
															margin_right={'0px'}
															onClick={onDownload(
																item,
															)}
														>
															{fileDownloadIcon}
														</HoverButton>
													)}
												</_ButtonContainer>
											</>
										)}
									</_Li>
								)
							);
						})}
					</_Ul>
				);
			})}
			<FileListContextMenu uuid={uuid} />
		</_Container>
	);
};

DropList.propTypes = {
	uuid: PropTypes.string.isRequired,
	pathList: PropTypes.array.isRequired,
	theme: PropTypes.number.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	highlight: PropTypes.array.isRequired,
	path: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	onDownload: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	list: PropTypes.array.isRequired,
};
export default DropList;
