import React, {useCallback} from 'react';
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
	MAIN_COLOR,
	RED_COLOR,
	SMALL_FONT,
} from '../../../styles/global';
import {ADD_HISTORY, commandPutAction} from '../../../reducers/sftp';
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
	const {history} = corServer;
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
		(history) => () => {
			console.log(history);
		},
		[],
	);

	// const {show} = useContextMenu({
	// 	id: uuid + 'history',
	// });

	// const contextMenuOpen = useCallback((e, history) => {
	// 	show(e);
	// }, []);

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{history.length === 0 ? (
				<ColBox>
					<FaCloudUploadAlt
						style={{fontSize: '50px', color: `${MAIN_COLOR}`}}
					/>
					<div>Drop files here to upload</div>
				</ColBox>
			) : (
				<BaseUl>
					{history.map((history) => {
						return (
							<BaseLi
								padding={'4px'}
								key={history.HISTORY_ID}
								onClick={selectItem(history)}
							>
								<FlexBox justify={'space-between'}>
									<EllipsisSpan
										// 나중에 split pane 만들면 반응형으로!
										width={'120px'}
										fontSize={SMALL_FONT}
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
									<EllipsisSpan fontSize={SMALL_FONT}>
										{formatByteSizeString(history.size)}
									</EllipsisSpan>
								</FlexBox>
								<BaseSpan fontSize={SMALL_FONT}>
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
