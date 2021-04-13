import React, {useCallback, useState} from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from '../Dropzone';
import {useSelector} from 'react-redux';
import {
	FaArrowAltCircleDown,
	FaArrowAltCircleUp,
	FaCloudUploadAlt,
	FaEdit,
	MdRemoveCircle,
} from 'react-icons/all';
import {BLUE_COLOR, MAIN_COLOR, RED_COLOR} from '../../../styles/global';
import {useContextMenu} from 'react-contexify';
import HistoryContextMenu from './HistoryContextMenu';
import {
	CustomLi,
	CustomP,
	CustomUl,
	FlexSpaceBetween,
	NoHistory,
} from '../../../styles/sftp';
import useSftpCommands from '../../../hooks/useSftpCommands';

const HistoryContents = ({ws, uuid}) => {
	const {initialWork} = useSftpCommands({ws, uuid});
	const {History} = useSelector((state) => state.sftp);
	const eachHistory = History.filter((it) => it.uuid === uuid);
	const [highlight, setHighlight] = useState([]);
	const {uploadWork} = useSftpCommands({ws, uuid});

	const upload = useCallback(async (files) => {
		uploadWork(files).then(() => initialWork());
	}, []);

	const selectItem = useCallback(
		(e, history) => {
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
		},
		[highlight],
	);

	const {show} = useContextMenu({
		id: uuid + 'history',
	});

	function displayMenu(e) {
		// pass the item id so the `onClick` on the `Item` has access to it
		show(e);
	}

	const contextMenuOpen = useCallback(
		(e, history) => {
			if (!highlight.includes(history)) {
				setHighlight([history]);
			}
			displayMenu(e);
		},
		[highlight],
	);

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
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default HistoryContents;
