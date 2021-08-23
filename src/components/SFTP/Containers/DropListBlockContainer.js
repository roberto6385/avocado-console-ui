import React, {useEffect, useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {compareFiles, sortingUtil} from '../../../utils/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {sftpAction, sftpSelector} from '../../../reducers/renewal';
import styled from 'styled-components';
import {SftpMainIcon} from '../../../styles/components/sftp/icons';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import {HideScroll, PreventDragCopy} from '../../../styles/function';

const Ul = styled.ul`
	${PreventDragCopy};
	${HideScroll};
	border-right: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
	color: ${(props) => props.color};
	overflow-y: scroll;
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

const DropListBlockContainer = ({uuid, blockPath}) => {
	const dispatch = useDispatch();
	const [sortedFiles, setSortedFiles] = useState([]);
	const [prevPath, setPrevPath] = useState('');
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);

	const selectItem = useCallback(
		(item) => (e) => {
			if (sftp.path === blockPath) {
				if (item.type === 'directory') {
					if (e.metaKey) {
						if (sftp.selected.files.length === 0) {
							dispatch(
								sftpAction.commandCd({
									socket: sftp.socket,
									uuid: uuid,
									path:
										blockPath === '/'
											? blockPath + item.name
											: `${blockPath}/${item.name}`,
								}),
							);
						} else {
							let result = sftp.selected.files.slice();

							if (result.find((v) => v.name === item.name)) {
								result = result.filter(
									(v) => v.name !== item.name,
								);
							} else {
								result.push(item);
							}
							dispatch(
								sftpAction.setSelectedFile({
									uuid: uuid,
									result: result,
								}),
							);
						}
					} else if (e.shiftKey) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: compareFiles(
									sortedFiles,
									item,
									sftp.selected.files
										? sftp.selected.files.slice().shift()
										: sortedFiles[0],
								),
							}),
						);
					} else {
						dispatch(
							sftpAction.commandCd({
								socket: sftp.socket,
								uuid: uuid,
								path:
									blockPath === '/'
										? blockPath + item.name
										: `${blockPath}/${item.name}`,
							}),
						);
					}
				} else {
					if (e.metaKey) {
						let result = sftp.selected.files.slice();

						if (result.find((v) => v.name === item.name)) {
							result = result.filter((v) => v.name !== item.name);
						} else {
							result.push(item);
						}
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: result,
							}),
						);
					} else if (e.shiftKey) {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: compareFiles(
									sortedFiles,
									item,
									sftp.selected.files
										? sftp.selected.files.slice().shift()
										: sortedFiles[0],
								),
							}),
						);
					} else {
						dispatch(
							sftpAction.setSelectedFile({
								uuid: uuid,
								result: [item],
							}),
						);
					}
				}
			} else {
				const formerItem = sftp.files[blockPath].find(
					(v) => v.name === prevPath,
				);
				if (e.metaKey) {
					dispatch(
						sftpAction.commandCd({
							socket: sftp.socket,
							uuid: uuid,
							path: blockPath,
						}),
					);
					dispatch(
						sftpAction.setSelectedFile({
							uuid: uuid,
							result: [formerItem, item],
						}),
					);
				} else if (e.shiftKey) {
					dispatch(
						sftpAction.commandCd({
							socket: sftp.socket,
							uuid: uuid,
							path: blockPath,
						}),
					);
					dispatch(
						sftpAction.setSelectedFile({
							uuid: uuid,
							result: compareFiles(sortedFiles, item, formerItem),
						}),
					);
				} else {
					dispatch(
						sftpAction.commandCd({
							socket: sftp.socket,
							uuid: uuid,
							path:
								item.type === 'file'
									? blockPath
									: blockPath === '/'
									? blockPath + item.name
									: `${blockPath}/${item.name}`,
						}),
					);
				}
			}
		},
		[
			blockPath,
			dispatch,
			prevPath,
			sftp.files,
			sftp.path,
			sftp.selected.files,
			sftp.socket,
			sortedFiles,
			uuid,
		],
	);

	useEffect(() => {
		setSortedFiles(
			sortingUtil({
				array: sftp.files[blockPath],
				type: sftp.sort.type,
				asc: sftp.sort.asc,
			}),
		);
	}, [blockPath, sftp.files, sftp.sort.asc, sftp.sort.type]);

	useEffect(() => {
		const index = blockPath === '/' ? 1 : blockPath.split('/').length;
		setPrevPath(sftp.path.split('/')[index]);
	}, [blockPath, sftp.path]);

	return (
		<Ul>
			{sortedFiles.map((v) => {
				if (blockPath === '/' && v.name === '..') return;
				return sftp.path !== blockPath ? (
					<Li
						key={v.name}
						type={v.name === prevPath ? 'former' : undefined}
						onClick={selectItem(v)}
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
						key={v.name}
						type={
							sftp.selected.files.find((x) => x.name === v.name)
								? 'selected'
								: undefined
						}
						onClick={selectItem(v)}
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
									<HoverButton margin_right={'0px'}>
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

DropListBlockContainer.propTypes = {
	uuid: PropTypes.string.isRequired,
	blockPath: PropTypes.string.isRequired,
};

export default DropListBlockContainer;
