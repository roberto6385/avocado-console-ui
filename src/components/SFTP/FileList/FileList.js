import React from 'react';
import PropTypes from 'prop-types';
import 'react-contexify/dist/ReactContexify.css';
import FileListContextMenu from '../../ContextMenu/FileListContextMenu';
import TableHead from './FileListTableHead';
import {formatByteSizeString, dataFormater} from '../functions';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {FONT_14, HEIGHT_48} from '../../../styles/length';
import styled from 'styled-components';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {HoverButton, Icon} from '../../../styles/components/icon';

const _Table = styled.table`
	display: flex;
	position: relative;
	flex: 1;
	flex-direction: column;
	font-size: ${FONT_14};
	overflow: scroll;
	margin: 0;
	padding: 0;
	border: none;
	${PreventDragCopy};
	${HiddenScroll};
`;

const _Tbody = styled.tbody`
	flex: 1;
	width: 100%;
	min-width: 778px;
	position: absolute;
	top: ${HEIGHT_48};
	.active {
		background: ${(props) =>
			props.theme.pages.webTerminal.main.panels.sftp.files
				.selectedBackgroundColor};
	}
`;

const _Th = styled.th`
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

const _Tr = styled.tr`
	padding-left: 16px;
	display: flex;
	height: ${HEIGHT_48};
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
	cursor: pointer;
`;

const FileList = ({
	uuid,
	path,
	highlight,
	lang,
	list,
	onContextMenu,
	onClick,
	onDownload,
	onEdit,
	onDoubleClick,
}) => {
	return (
		<React.Fragment>
			<_Table onContextMenu={onContextMenu()}>
				<TableHead uuid={uuid} />
				<_Tbody>
					{list.map((item, index) => {
						if (item.name !== '.') {
							return (
								<_Tr
									onContextMenu={onContextMenu(item)}
									onClick={onClick({item, index})}
									onDoubleClick={onDoubleClick(item)}
									key={index + uuid}
									className={
										highlight.find(
											(v) =>
												JSON.stringify(v) ===
												JSON.stringify({...item, path}),
										)
											? 'filelist_contents active'
											: 'filelist_contents'
									}
								>
									<_Th min={'150px'} flex={1}>
										{item.type === 'directory' ? (
											<Icon margin_right={'8px'}>
												{folderOpenIcon}
											</Icon>
										) : (
											<Icon margin_right={'8px'}>
												{fileIcon}
											</Icon>
										)}

										<span className='filelist_contents'>
											{item.name}
										</span>
									</_Th>
									<_Th min={'135px'} justify='flex-end'>
										{item.name !== '..' &&
											formatByteSizeString(item.size)}
									</_Th>
									<_Th min={'212px'}>
										{item.name !== '..' &&
											dataFormater({
												modify: item.lastModified,
												keyword: 'format',
												language: lang,
											})}
									</_Th>
									<_Th min={'105px'}>{item.permission}</_Th>
									<_Th min={'63px'} justify={'flex-end'}>
										{item.type === 'file' && (
											<HoverButton
												margin_right={'12px'}
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
									</_Th>
								</_Tr>
							);
						}
					})}
				</_Tbody>
			</_Table>
			<FileListContextMenu uuid={uuid} />
		</React.Fragment>
	);
};

FileList.propTypes = {
	uuid: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	highlight: PropTypes.array.isRequired,
	lang: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onDownload: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func.isRequired,
};

export default FileList;
