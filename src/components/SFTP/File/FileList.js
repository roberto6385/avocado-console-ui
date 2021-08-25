import React from 'react';
import PropTypes from 'prop-types';
import 'react-contexify/dist/ReactContexify.css';
import SFTPFileListContextMenu from '../../ContextMenus/SFTPFileListContextMenu';
import TableHeader from './TableHeader';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import styled from 'styled-components';

import {HideScroll, PreventDragCopy} from '../../../styles/function';
import {HoverButton} from '../../../styles/components/icon';
import {SftpMainIcon} from '../../../styles/components/sftp/icons';
import {sftpDateFormater, fileByteSizeFormater} from '../../../utils/sftp';

const Table = styled.table`
	display: flex;
	position: relative;
	flex: 1;
	flex-direction: column;
	font-size: 14px;
	overflow: scroll;
	margin: 0;
	padding: 0;
	border: none;
	${PreventDragCopy};
	${HideScroll};
`;

const Tbody = styled.tbody`
	flex: 1;
	width: 100%;
	min-width: 778px;
	top: 48px;
	.active {
		background: ${(props) =>
			props.theme.pages.webTerminal.main.panels.sftp.files
				.selectedBackgroundColor};
	}
`;

const Th = styled.th`
	margin-right: 16px;
	display: flex;
	align-items: center;
	min-width: ${(props) => props?.min};
	width: ${(props) => props?.min};
	flex: ${(props) => props.flex};
	justify-content: ${(props) => props.justify || 'flex-start'};
	white-space: nowrap;
	border: none !important;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const Tr = styled.tr`
	padding-left: 16px;
	display: flex;
	height: 48px;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
	cursor: pointer;
`;

const FileList = ({
	uuid,
	path,
	highlight,
	language,
	list,
	onContextMenu,
	onSelectFile,
	onDownload,
	onEdit,
	onChangePath,
}) => {
	return (
		<React.Fragment>
			<Table>
				<TableHeader uuid={uuid} />
				<Tbody onContextMenu={onContextMenu()}>
					{list.map((item, index) => {
						if (path === '/' && item.name === '..') return;
						return (
							<Tr
								onContextMenu={onContextMenu(item)}
								onClick={onSelectFile(item)}
								onDoubleClick={onChangePath(item)}
								key={index + uuid}
								className={
									highlight.find(
										(v) =>
											JSON.stringify(v) ===
											JSON.stringify(item),
									)
										? 'filelist-content active'
										: 'filelist-content'
								}
							>
								<Th min={'150px'} flex={1}>
									<SftpMainIcon
										type={
											item.type === 'directory'
												? 'main'
												: undefined
										}
										margin_right={'8px'}
									>
										{item.type === 'directory'
											? folderOpenIcon
											: fileIcon}
									</SftpMainIcon>

									<span className='filelist-content'>
										{item.name}
									</span>
								</Th>
								<Th min={'135px'} justify='flex-end'>
									{item.name !== '..' &&
										fileByteSizeFormater(item.size)}
								</Th>
								<Th min={'212px'}>
									{item.name !== '..' &&
										sftpDateFormater({
											modify: item.lastModified,
											keyword: 'format',
											language: language,
										})}
								</Th>
								<Th min={'105px'}>{item.permission}</Th>
								<Th min={'63px'} justify={'flex-end'}>
									{item.type === 'file' && (
										<HoverButton
											margin_right={'8px'}
											onClick={onEdit(item)}
										>
											{editIcon}
										</HoverButton>
									)}
									{item.name !== '..' && (
										<HoverButton
											margin={'0px'}
											onClick={onDownload(item)}
										>
											{fileDownloadIcon}
										</HoverButton>
									)}
								</Th>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</React.Fragment>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string,
	path: PropTypes.string,
	highlight: PropTypes.array,
	language: PropTypes.string,
	list: PropTypes.array,
	onContextMenu: PropTypes.func,
	onSelectFile: PropTypes.func,
	onDownload: PropTypes.func,
	onEdit: PropTypes.func,
	onChangePath: PropTypes.func,
};

export default FileList;
