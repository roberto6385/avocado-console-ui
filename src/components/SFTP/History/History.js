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
import {HEIGHT_48, HEIGHT_132} from '../../../styles/length';
import {
	activeColor,
	borderColor,
	historyDeleteColor,
	historyDownloadColor,
	fontColor,
	highColor,
	historyEditColor,
	iconColor,
	historyPauseColor,
	tabColor,
	historyUploadColor,
} from '../../../styles/color';

import {PreventDragCopy} from '../../../styles/function';
import {PrimaryGreenButton} from '../../../styles/components/button';
import {HoverButton, Icon} from '../../../styles/components/icon';

const _Container = styled.div`
	min-width: 256px;
	width: 256px;
	overflow: scroll;
	border-left: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
	background: ${(props) => tabColor[props.theme_value]};
`;

const DropSpaceDiv = styled.div`
	height: ${HEIGHT_132};
	margin: 8px;
	border: 1px dashed;
	border-color: ${(props) => props.bcolor};
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const _Ul = styled.ul`
	${PreventDragCopy}
	width:${(props) => props.width};
	list-style: none;
	margin: 0px;
	padding: 0px;
	outline: none;
	position: relative;
`;

const _Li = styled.li`
	line-height: 0;
	position: relative;
	height: ${HEIGHT_48};
	// padding: 16px;
	display: flex;
	align-items: center;
	background: ${(props) =>
		props.clicked
			? highColor[props.theme_value]
			: tabColor[props.theme_value]};
	white-space: nowrap;
	border-bottom: 1px solid;
	border-color: ${(props) => borderColor[props.theme_value]};
`;

const DropSpace_Button = styled(PrimaryGreenButton)`
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
		props.progress ? historyPauseColor : fontColor[props.theme_value]};
`;

const Progress = styled.div`
	position: absolute;
	bottom: 0;
	width: 100%;
`;

const Bar = styled.div`
	width: ${(props) => props?.width || '0%'};
	height: 2px;
	background: ${(props) => props.back};
`;

const _AnnounceText = styled.div`
	color: ${(props) => iconColor[props.theme_value]};
	padding: 32px 30px 12px 30px;
	line-height: 1.43;
	letter-spacing: 0.25px;
`;

const _BrowseButtonText = styled.div`
	font-size: 13px;
	letter-spacing: 0.13px;
`;

const _HistorySizeText = styled.span`
	color: ${(props) => fontColor[props.theme_value]};
	font-size: 12px;
	letter-spacing: 0.25px;
	line-height: 1.67;
`;

const History = ({
	theme,
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
		<_Container theme_value={theme}>
			<Dropzone onDrop={(files) => onUploadWithDrop(files)}>
				{history?.length === 0 ? (
					<DropSpaceDiv bcolor={iconColor[theme]}>
						<_AnnounceText theme_value={theme}>
							{t('paragraph')}
						</_AnnounceText>
						<DropSpace_Button
							theme_value={theme}
							onClick={onUploadWithClick}
						>
							<Icon
								size='sm'
								margin_right={'8px'}
								color={theme === 0 ? 'white' : 'black'}
							>
								{fileUploadIcon}
							</Icon>
							<_BrowseButtonText>{t('browse')}</_BrowseButtonText>
						</DropSpace_Button>
					</DropSpaceDiv>
				) : (
					<_Ul>
						{history.map((history, index) => {
							return (
								<_Li
									className={'history_contents'}
									key={history.HISTORY_ID}
									onClick={onSelect(history, index)}
									theme_value={theme}
									borderWidth={`${history.progress}%`}
									clicked={
										highlight.find(
											(item) => item === history,
										)
											? 1
											: 0
									}
								>
									<HoverButton
										onClick={onPauseAndStart(history)}
										size='20px'
										margin={'10px'}
										color={
											history.progress !== 100
												? historyPauseColor
												: history.todo === 'write'
												? historyUploadColor
												: history.todo === 'read'
												? historyDownloadColor
												: history.todo === 'edit'
												? historyEditColor
												: history.todo === 'rm' &&
												  historyDeleteColor
										}
									>
										{history.progress !== 100
											? (history.todo === 'write' &&
													history.progress !== 0 &&
													!writeSocket) ||
											  (history.todo === 'read' &&
													history.progress !== 0 &&
													!readSocket) ||
											  (history.todo === 'edit' &&
													history.progress !== 0 &&
													((history.key === 'write' &&
														!writeSocket) ||
														(history.key ===
															'read' &&
															!readSocket)))
												? playCircleIcon
												: pauseCircleIcon
											: history.todo === 'write'
											? arrowCircleUpIcon
											: history.todo === 'read'
											? arrowCircleDownIcon
											: history.todo === 'edit'
											? buildCircleIcon
											: history.todo === 'rm' &&
											  removeCircleIcon}
									</HoverButton>
									<HistoryText
										className={'history_contents'}
										flex={1}
										progress={
											history.progress !== 100 ? 1 : 0
										}
										theme_value={theme}
									>
										{history.name}
									</HistoryText>
									<_HistorySizeText
										theme_value={theme}
										className={'history_contents'}
									>
										{formatByteSizeString(history.size)}
									</_HistorySizeText>
									<HoverButton
										size={'sm'}
										margin={'10px'}
										theme_value={theme}
										onClick={onRemove(history)}
										className={'history_contents'}
									>
										{deleteIcon}
									</HoverButton>

									{history.progress !== 100 && (
										<Progress>
											<Bar
												back={activeColor[theme]}
												width={`${history.progress}%`}
											/>
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
	theme: PropTypes.number.isRequired,
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
