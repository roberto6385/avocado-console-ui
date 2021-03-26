import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from './Dropzone';
import {useDispatch, useSelector} from 'react-redux';
import {
	FaArrowAltCircleDown,
	FaArrowAltCircleUp,
	FaCloudUploadAlt,
	FaEdit,
	MdRemoveCircle,
} from 'react-icons/all';
import {BLUE_COLOR, MAIN_COLOR, RED_COLOR} from '../../styles/global';
import {useContextMenu} from 'react-contexify';
import HistoryContextMenu from './HistoryContextMenu';
import {
	CustomLi,
	CustomP,
	CustomUl,
	FlexSpaceBetween,
	NoHistory,
} from '../../styles/sftp';
import usePostMessage from './hooks/usePostMessage';
import {SFTP_SAVE_HISTORY} from '../../reducers/sftp';

const HistoryContents = ({index, ws, uuid}) => {
	const {currentPath, History} = useSelector((state) => state.sftp);
	const dispatch = useDispatch();
	const eachHistory = History.filter((it) => it.uuid === uuid);
	const [highlight, setHighlight] = useState([]);

	const upload = async (files) => {
		return new Promise((resolve) => {
			usePostMessage({
				keyword: 'CommandByPwd',
				ws,
				uuid,
			}).then((response) => {
				for (const key of files) {
					usePostMessage({
						keyword: 'CommandByPut',
						ws,
						uuid,
						path: response.result,
						fileName: key.name,
						uploadFile: key,
					});
					dispatch({
						type: SFTP_SAVE_HISTORY,
						data: {
							uuid,
							name: key.name,
							path: response.result,
							size: key.size,
							todo: 'put',
							progress: 100,
							// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
							// 삭제, dispatch, 삭제 해서 progress 100 만들기
						},
					});
				}
				resolve();
			});
		});
	};

	const selectItem = (e, history) => {
		if (e.shiftKey) {
			if (!highlight.includes(history)) {
				setHighlight([...highlight, history]);
			}
		} else {
			if (highlight.includes(history)) {
				setHighlight([]);
			} else {
				setHighlight([history]);
			}
		}
	};

	const {show} = useContextMenu({
		id: uuid + 'history',
	});

	function displayMenu(e) {
		// pass the item id so the `onClick` on the `Item` has access to it
		show(e);
	}

	const contextMenuOpen = (e, history) => {
		if (!highlight.includes(history)) {
			setHighlight([history]);
		}
		displayMenu(e);
	};

	return (
		<Dropzone onDrop={(files) => upload(files)}>
			{eachHistory.length === 0 ? (
				<NoHistory>
					<FaCloudUploadAlt
						style={{fontSize: '50px', color: `${MAIN_COLOR}`}}
					/>
					<div>Drop files here to upload</div>
				</NoHistory>
			) : (
				<CustomUl>
					{eachHistory.map((history) => {
						return (
							<CustomLi
								onContextMenu={(e) =>
									contextMenuOpen(e, history)
								}
								key={history.id}
								className={
									highlight.includes(history)
										? 'history_list active'
										: 'history_list'
								}
								onClick={(e) => selectItem(e, history)}
							>
								<FlexSpaceBetween>
									<CustomP>
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
									</CustomP>
									<CustomP>{history.size} byte</CustomP>
								</FlexSpaceBetween>
								<CustomP>
									{history.progress === 100
										? 'Complete'
										: 'Progress'}
								</CustomP>
							</CustomLi>
						);
					})}
				</CustomUl>
			)}
			<HistoryContextMenu
				ws={ws}
				uuid={uuid}
				highlight={highlight}
				setHighlight={setHighlight}
			/>
		</Dropzone>
	);
};
HistoryContents.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
