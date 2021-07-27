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
import {
	activeColor,
	borderColor,
	fileListHighColor,
	fontColor,
	tabColor,
} from '../../../styles/color';
import LoadingSpinner from '../../loadingSpinner';
import styled from 'styled-components';

import {HiddenScroll, PreventDragCopy} from '../../../styles/function';
import {ClickableIconButton, IconBox} from '../../../styles/button';

const _Table = styled.table`
	display: flex;
	background: ${(props) => props?.back};
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
	background: ${(props) => props?.back};
	flex: 1;
	width: 100%;
	min-width: 778px;
	position: absolute;
	top: ${HEIGHT_48};
	.active {
		background: ${(props) => props.active};
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
	color: ${(props) => fontColor[props.theme_value]};
	background: ${(props) => tabColor[props.theme_value]};
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
	cursor: pointer;
`;

const FileList = ({
	uuid,
	path,
	highlight,
	theme,
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
			{list.length === 0 && <LoadingSpinner />}
			<_Table onContextMenu={onContextMenu()} back={tabColor[theme]}>
				<TableHead uuid={uuid} />
				<_Tbody active={fileListHighColor[theme]}>
					{list.map((item, index) => {
						if (item.name !== '.') {
							return (
								<_Tr
									theme_value={theme}
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
											<IconBox
												margin_right={'8px'}
												color={activeColor[theme]}
											>
												{folderOpenIcon}
											</IconBox>
										) : (
											<IconBox
												margin_right={'8px'}
												theme_value={theme}
											>
												{fileIcon}
											</IconBox>
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
											<ClickableIconButton
												theme_value={theme}
												margin_right={'12px'}
												onClick={onEdit(item)}
											>
												{editIcon}
											</ClickableIconButton>
										)}
										{item.name !== '..' && (
											<ClickableIconButton
												theme_value={theme}
												margin={'0px'}
												onClick={onDownload(item)}
											>
												{fileDownloadIcon}
											</ClickableIconButton>
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
	theme: PropTypes.number.isRequired,
	lang: PropTypes.string.isRequired,
	list: PropTypes.array.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
	onDownload: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func.isRequired,
};

export default FileList;
