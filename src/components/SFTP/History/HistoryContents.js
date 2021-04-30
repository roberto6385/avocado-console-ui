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
import {BLUE_COLOR, MAIN_COLOR, RED_COLOR} from '../../../styles/global';
import {
	CustomLi,
	CustomP,
	CustomUl,
	FlexSpaceBetween,
	NoHistory,
} from '../../../styles/sftp';
import {ADD_HISTORY, commandPutAction} from '../../../reducers/sftp';
import {ProgressBar} from 'react-bootstrap';

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

	// const selectItem = useCallback((e, history) => {}, []);

	// const {show} = useContextMenu({
	// 	id: uuid + 'history',
	// });

	// const contextMenuOpen = useCallback((e, history) => {
	// 	show(e);
	// }, []);

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{history.length === 0 ? (
				<NoHistory>
					<FaCloudUploadAlt
						style={{fontSize: '50px', color: `${MAIN_COLOR}`}}
					/>
					<div>Drop files here to upload</div>
				</NoHistory>
			) : (
				<CustomUl>
					{history.map((history) => {
						return (
							<CustomLi
								key={history.HISTORY_ID}
								// onClick={(e) => selectItem(e, history)}
							>
								<FlexSpaceBetween>
									<CustomP minWidth={'15px'}>
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
									</CustomP>
									<CustomP flex={1}>{history.name}</CustomP>
									<CustomP minWidth={'90px'} align={'right'}>
										{history.size} byte
									</CustomP>
								</FlexSpaceBetween>
								<div style={{padding: '0px 4px'}}>
									{history.progress === 100 ? (
										'Complete'
									) : (
										<ProgressBar
											now={history.progress}
											label={`${history.progress}%`}
										/>
									)}
								</div>
							</CustomLi>
						);
					})}
				</CustomUl>
			)}
			{/*<HistoryContextMenu*/}
			{/*	uuid={uuid}*/}
			{/*	highlight={highlight}*/}
			{/*	setHighlight={setHighlight}*/}
			{/*/>*/}
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
