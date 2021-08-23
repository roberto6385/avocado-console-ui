import React, {useEffect, useMemo, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import {sortingUtil} from '../../../utils/sftp';
import {useSelector} from 'react-redux';
import {sftpSelector} from '../../../reducers/renewal';
import styled from 'styled-components';
import {SftpMainIcon} from '../../../styles/components/sftp/icons';
import {
	editIcon,
	fileDownloadIcon,
	fileIcon,
	folderOpenIcon,
} from '../../../icons/icons';
import {HoverButton} from '../../../styles/components/icon';
import {HideScroll} from '../../../styles/function';

const Ul = styled.ul`
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
		(props.type === 'current' &&
			props.theme.pages.webTerminal.main.panels.sftp.files
				.selectedBackgroundColor) ||
		(props.type === 'prev' &&
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
	const [sortedFiles, setSortedFiles] = useState([]);
	const {data} = useSelector(sftpSelector.all);
	const sftp = useMemo(
		() => data.find((it) => it.uuid === uuid),
		[data, uuid],
	);

	const selectItem = useCallback(
		(item) => () => {
			console.log(blockPath);
			console.log(item);
		},
		[blockPath],
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

	return (
		<Ul>
			{sortedFiles.map((v) => {
				if (blockPath === '/' && v.name === '..') return;
				return sftp.path !== blockPath ? (
					<Li key={v.name} onClick={selectItem(v)}>
						<SftpMainIcon
							type={v.type === 'directory' ? 'main' : undefined}
							margin_right={'8px'}
						>
							{v.type === 'directory' ? folderOpenIcon : fileIcon}
						</SftpMainIcon>
						<span>{v.name}</span>
					</Li>
				) : (
					<LastLi key={v.name}>
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
