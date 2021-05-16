import React, {useCallback, useEffect} from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from '../Dropzone';
import {useDispatch, useSelector} from 'react-redux';
import {
	FaArrowAltCircleDown,
	FaArrowAltCircleUp,
	FaCloudUploadAlt,
	FaEdit,
	MdRemoveCircle,
} from 'react-icons/all';
import {
	BLUE_COLOR,
	HIGHLIGHT_COLOR,
	MAIN_COLOR,
	RED_COLOR,
	SMALL_FONT,
} from '../../../styles/global';
import {
	ADD_HISTORY_HI,
	ADD_HISTORY,
	commandPutAction,
	ADD_HIGHLIGHT,
	INITIAL_HISTORY_HI,
} from '../../../reducers/sftp';
import {ProgressBar} from 'react-bootstrap';
import {ColBox, FlexBox} from '../../../styles/divs';
import {formatByteSizeString} from '../listConversion';
import {BaseSpan, EllipsisSpan} from '../../../styles/texts';
import {BaseLi, BaseUl, CustomLi} from '../../../styles/lists';
import {useContextMenu} from 'react-contexify';
import HistoryContextMenu from './HistoryContextMenu';

const HistoryContents = ({uuid}) => {
	const {sftp} = useSelector((state) => state.sftp);
	const corServer = sftp.find((it) => it.uuid === uuid);
	const {history, history_highlight} = corServer;
	const dispatch = useDispatch();

	const upload = useCallback(
		async (files) => {
			for await (let value of files) {
				dispatch(
					commandPutAction({
						...corServer,
						file: value,
						keyword: 'put',
					}),
				);
				dispatch({
					type: ADD_HISTORY,
					payload: {
						uuid: uuid,
						name: value.name,
						size: value.size,
						todo: 'put',
						progress: 0,
					},
				});
			}
			dispatch(commandPutAction({...corServer, keyword: 'pwd'}));
		},
		[corServer],
	);

	const selectItem = useCallback(
		(selectValue, index) => (e) => {
			e.stopPropagation();
			console.log(history);
			const prev_history = history.slice();
			const prev_history_hi = history_highlight.slice();
			if (e.metaKey) {
				if (prev_history_hi.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: prev_history_hi.filter(
								(item) => item !== selectValue,
							),
						},
					});
				} else {
					prev_history_hi.push(selectValue);
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {uuid, history: prev_history_hi},
					});
				}
			} else if (e.shiftKey) {
				if (prev_history_hi.length === 0) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				} else {
					compareNumber(
						prev_history.findIndex(
							(item) => item === prev_history_hi[0],
						),
						index,
					);
				}
			} else {
				if (!prev_history_hi.find((item) => item === selectValue)) {
					dispatch({
						type: ADD_HISTORY_HI,
						payload: {
							uuid,
							history: [selectValue],
						},
					});
				}
			}
		},
		[dispatch, history, history_highlight],
	);

	const compareNumber = (first, second) => {
		console.log(first, second);
		dispatch({type: INITIAL_HISTORY_HI, payload: {uuid}});

		let list = [];
		if (first <= second) {
			for (let i = first; i <= second; i++) {
				list.push(history[i]);
			}
		} else {
			for (let i = first; i >= second; i--) {
				list.push(history[i]);
			}
		}
		dispatch({
			type: ADD_HISTORY_HI,
			payload: {
				uuid,
				history: list,
			},
		});
	};

	console.log(history_highlight);

	// const {show} = useContextMenu({
	// 	id: uuid + 'history',
	// });

	// const contextMenuOpen = useCallback((e, history) => {
	// 	show(e);
	// }, []);

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{history.length === 0 ? (
				<div>
					<FaCloudUploadAlt />
					<div>Drop files here to upload</div>
				</div>
			) : (
				<BaseUl>
					{history.map((history, index) => {
						return (
							<BaseLi
								padding={'4px'}
								className={'history_contents'}
								key={history.HISTORY_ID}
								onClick={selectItem(history, index)}
								back={
									history_highlight.find(
										(item) => item === history,
									) && HIGHLIGHT_COLOR
								}
							>
								<FlexBox justify={'space-between'}>
									<EllipsisSpan
										// 나중에 split pane 만들면 반응형으로!
										width={'120px'}
										fontSize={SMALL_FONT}
										className={'history_contents'}
									>
										{history.todo === 'put' && (
											<FaArrowAltCircleUp
												style={{
													marginRight: '4px',
													color: `${MAIN_COLOR}`,
												}}
											/>
										)}
										{history.todo === 'get' && (
											<FaArrowAltCircleDown
												style={{
													marginRight: '4px',
													color: `${BLUE_COLOR}`,
												}}
											/>
										)}
										{history.todo === 'edit' && (
											<FaEdit
												style={{marginRight: '4px'}}
											/>
										)}
										{history.todo === 'rm' && (
											<MdRemoveCircle
												style={{
													marginRight: '4px',
													color: `${RED_COLOR}`,
												}}
											/>
										)}
										{history.name}
									</EllipsisSpan>
									<EllipsisSpan
										fontSize={SMALL_FONT}
										className={'history_contents'}
									>
										{formatByteSizeString(history.size)}
									</EllipsisSpan>
								</FlexBox>
								<BaseSpan
									fontSize={SMALL_FONT}
									className={'history_contents'}
								>
									{history.progress === 100 ? (
										'Complete'
									) : (
										<ProgressBar
											style={{width: '100%'}}
											now={history.progress}
											label={`${history.progress}%`}
										/>
									)}
								</BaseSpan>
							</BaseLi>
						);
					})}
				</BaseUl>
			)}
			{/*<HistoryContextMenu*/}
			{/*	uuid={uuid}*/}
			{/*	// highlight={highlight}*/}
			{/*	// setHighlight={setHighlight}*/}
			{/*/>*/}
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
