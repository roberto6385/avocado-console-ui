import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from '../Dropzone';
import {useTranslation} from 'react-i18next';
import {formatByteSizeString} from '../functions';
import styled from 'styled-components';

import {
	arrowCircleDownIcon,
	arrowCircleUpIcon,
	buildCircleIcon,
	deleteIcon,
	fileUploadIcon,
	pauseCircleIcon,
	playCircleIcon,
	removeCircleIcon,
} from '../../../icons/icons';

import {PreventDragCopy} from '../../../styles/function';
import {NormalButton} from '../../../styles/components/button';
import {HoverButton, Icon} from '../../../styles/components/icon';

const _Container = styled.div`
	min-width: 256px;
	width: 256px;
	overflow: scroll;
	border-left: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const DropSpaceDiv = styled.div`
	height: 132px;
	margin: 8px;
	border: 1px dashed;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.history.texts.description
			.font.color};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	list-style: none;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

const _Li = styled.li`
	line-height: 0;
	position: relative;
	height: 48px;
	display: flex;
	align-items: center;
	background: ${(props) =>
		props.selected
			? props.theme.pages.webTerminal.main.panels.sftp.history.items
					.selectedStyle.backgroundColor
			: props.theme.pages.webTerminal.main.panels.sftp.history.items
					.normalStyle.backgroundColor};
	white-space: nowrap;
	border-bottom: 1px solid;
	border-color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.border.color};
`;

const DropSpace_Button = styled(NormalButton)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 160px;
	margin: 16px 40px 30px 40px;
`;

const HistoryText = styled.div`
	flex: 1;
	line-height: 1.43;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-right: 6px;
	color: ${(props) =>
		!props?.progress &&
		props.theme.pages.webTerminal.main.panels.sftp.history.texts.description
			.font.color};
`;

const Progress = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const Bar = styled.div`
	width: ${(props) => props?.width || '0%'};
	height: 2px;
	background: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.history.items.progressBar
			.font.color};
`;

const _DescriptionText = styled.div`
	color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.history.texts.description
			.font.color};
	padding: 32px 30px 12px 30px;
	line-height: 1.43;
	letter-spacing: 0.25px;
`;

const _BrowseButtonText = styled.div`
	font-size: 13px;
	letter-spacing: 0.13px;
`;

const _HistorySizeText = styled.span`
	color: ${(props) =>
		props.theme.pages.webTerminal.main.panels.sftp.history.texts.size.font
			.color};
	font-size: 12px;
	letter-spacing: 0.25px;
	line-height: 1.67;
`;

const HistoryButton = styled(Icon)`
	color: ${(props) =>
		(props.type === 'pause' &&
			props.theme.pages.webTerminal.main.panels.sftp.history.icons.pause
				.font.color) ||
		(props.type === 'upload' &&
			props.theme.pages.webTerminal.main.panels.sftp.history.icons.upload
				.font.color) ||
		(props.type === 'read' &&
			props.theme.pages.webTerminal.main.panels.sftp.history.icons
				.download.font.color) ||
		(props.type === 'edit' &&
			props.theme.pages.webTerminal.main.panels.sftp.history.icons.edit
				.font.color) ||
		(props.type === 'delete' &&
			props.theme.pages.webTerminal.main.panels.sftp.history.icons.delete
				.font.color)};

	svg {
		fill: ${(props) =>
			(props.type === 'pause' &&
				props.theme.pages.webTerminal.main.panels.sftp.history.icons
					.pause.font.color) ||
			(props.type === 'upload' &&
				props.theme.pages.webTerminal.main.panels.sftp.history.icons
					.upload.font.color) ||
			(props.type === 'read' &&
				props.theme.pages.webTerminal.main.panels.sftp.history.icons
					.download.font.color) ||
			(props.type === 'edit' &&
				props.theme.pages.webTerminal.main.panels.sftp.history.icons
					.edit.font.color) ||
			(props.type === 'delete' &&
				props.theme.pages.webTerminal.main.panels.sftp.history.icons
					.delete.font.color)};
	}
`;

const History = ({
	onUploadWithDrop,
	onUploadWithClick,
	onSelect,
	highlight,
	onPauseAndStart,
	onRemove,
	writeSocket,
	readSocket,
	history,
}) => {
	const {t} = useTranslation('historyContents');

	return (
		<_Container>
			<Dropzone onDrop={(files) => onUploadWithDrop(files)}>
				{history.length === 0 ? (
					<DropSpaceDiv>
						<_DescriptionText>{t('paragraph')}</_DescriptionText>
						<DropSpace_Button onClick={onUploadWithClick}>
							<Icon size='sm' margin_right={'8px'}>
								{fileUploadIcon}
							</Icon>
							<_BrowseButtonText>{t('browse')}</_BrowseButtonText>
						</DropSpace_Button>
					</DropSpaceDiv>
				) : (
					<_Ul>
						{history.map((item, index) => {
							return (
								<_Li
									className={'history_contents'}
									key={item.HISTORY_ID}
									onClick={onSelect(item, index)}
									borderWidth={`${item.progress}%`}
									selected={highlight.find(
										(v) => v.HISTORY_ID === item.HISTORY_ID,
									)}
								>
									<HistoryButton
										onClick={onPauseAndStart(item)}
										size='20px'
										margin={'10px'}
										type={
											item.progress !== 100
												? 'pause'
												: item.todo === 'write'
												? 'upload'
												: item.todo === 'read'
												? 'read'
												: item.todo === 'edit'
												? 'edit'
												: item.todo === 'rm' && 'delete'
										}
									>
										{item.progress !== 100
											? (item.todo === 'write' &&
													item.progress !== 0 &&
													!writeSocket) ||
											  (item.todo === 'read' &&
													item.progress !== 0 &&
													!readSocket) ||
											  (item.todo === 'edit' &&
													item.progress !== 0 &&
													((item.key === 'write' &&
														!writeSocket) ||
														(item.key === 'read' &&
															!readSocket)))
												? playCircleIcon
												: pauseCircleIcon
											: item.todo === 'write'
											? arrowCircleUpIcon
											: item.todo === 'read'
											? arrowCircleDownIcon
											: item.todo === 'edit'
											? buildCircleIcon
											: item.todo === 'rm' &&
											  removeCircleIcon}
									</HistoryButton>

									<HistoryText
										className={'history_contents'}
										flex={1}
										progress={item.progress === 100}
									>
										{item.name}
									</HistoryText>
									<_HistorySizeText
										className={'history_contents'}
									>
										{formatByteSizeString(item.size)}
									</_HistorySizeText>
									<HoverButton
										size={'sm'}
										margin={'10px'}
										onClick={onRemove(item)}
										className={'history_contents'}
									>
										{deleteIcon}
									</HoverButton>

									{item.progress !== 100 && (
										<Progress>
											<Bar width={`${item.progress}%`} />
										</Progress>
									)}
								</_Li>
							);
						})}
					</_Ul>
				)}
			</Dropzone>
		</_Container>
	);
};
History.propTypes = {
	onUploadWithDrop: PropTypes.func.isRequired,
	onUploadWithClick: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	highlight: PropTypes.array.isRequired,
	onPauseAndStart: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	history: PropTypes.array.isRequired,
	writeSocket: PropTypes.object,
	readSocket: PropTypes.object,
};

export default History;
