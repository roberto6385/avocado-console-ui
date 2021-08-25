import React from 'react';
import {SftpMainIcon} from '../../../styles/components/sftp/icons';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import styled from 'styled-components';
import {HideScroll, PreventDragCopy} from '../../../styles/function';
import PropTypes from 'prop-types';

const Ul = styled.ul`
	${PreventDragCopy};
	${HideScroll};
	border-right: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
	color: ${(props) => props.color};
	// overflow-y: scroll;
	flex: ${(props) => props.flex};
`;
const Li = styled.li`
	cursor: pointer;
	background: ${(props) =>
		(props.type === 'selected' &&
			props.theme.pages.webTerminal.main.panels.sftp.files
				.selectedBackgroundColor) ||
		(props.type === 'former' &&
			props.theme.pages.webTerminal.main.panels.sftp.files
				.prevPathBackgroundColor)};
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};

	display: flex;
	align-items: center;
	min-width: 220px;
	height: 48px;
	font-weight: bold;
	padding: 12px 16px;
`;

const LastLi = styled(Li)`
	min-width: 500px;
	flex: 1;
	justify-content: space-between;
`;

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
`;
const PermissionContainer = styled(FlexContainer)`
	width: 106px;
	justify-content: flex-end;
`;
const ButtonContainer = styled(FlexContainer)`
	width: 122px;
	justify-content: flex-end;
`;

const DropListBlock = ({
	sortedFiles,
	blockPath,
	onSelectItem,
	prevPath,
	currentPath,
	selectedFiles,
	onContextMenu,
	onDownload,
}) => {
	return (
		<Ul flex={currentPath === blockPath ? 1 : undefined}>
			{sortedFiles.map((v) => {
				if (blockPath === '/' && v.name === '..') return;
				return currentPath !== blockPath ? (
					<Li
						onContextMenu={onContextMenu(v, blockPath)}
						key={v.name}
						type={v.name === prevPath ? 'former' : undefined}
						onClick={onSelectItem(v)}
					>
						<SftpMainIcon
							type={v.type === 'directory' ? 'main' : undefined}
							margin_right={'8px'}
						>
							{v.type === 'directory' ? folderOpenIcon : fileIcon}
						</SftpMainIcon>
						<span>{v.name}</span>
					</Li>
				) : (
					<LastLi
						onContextMenu={onContextMenu(v)}
						key={v.name}
						type={
							selectedFiles.find((x) => x.name === v.name)
								? 'selected'
								: undefined
						}
						onClick={onSelectItem(v)}
					>
						<FlexContainer>
							<SftpMainIcon
								type={
									v.type === 'directory' ? 'main' : undefined
								}
								margin_right={'8px'}
							>
								{v.type === 'directory'
									? folderOpenIcon
									: fileIcon}
							</SftpMainIcon>
							<span>{v.name}</span>
						</FlexContainer>
						<FlexContainer>
							<PermissionContainer>
								{v.permission}
							</PermissionContainer>
							<ButtonContainer>
								{v.type === 'file' && v.name !== '..' && (
									<HoverButton margin_right={'8px'}>
										{editIcon}
									</HoverButton>
								)}
								{v.name !== '..' && (
									<HoverButton
										margin_right={'0px'}
										onClick={onDownload(v)}
									>
										{fileDownloadIcon}
									</HoverButton>
								)}
							</ButtonContainer>
						</FlexContainer>
					</LastLi>
				);
			})}
		</Ul>
	);
};
DropListBlock.propTypes = {
	sortedFiles: PropTypes.array.isRequired,
	blockPath: PropTypes.string.isRequired,
	onSelectItem: PropTypes.func.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	onDownload: PropTypes.func.isRequired,
	currentPath: PropTypes.string.isRequired,
	selectedFiles: PropTypes.array.isRequired,
	prevPath: PropTypes.string,
};

export default DropListBlock;
