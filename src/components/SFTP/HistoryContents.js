import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from './Dropzone';
import {sendCommandByPut} from './commands/sendCommandPut';
import {sendCommandByLs} from './commands/sendCommandLs';
import {useDispatch, useSelector} from 'react-redux';
import {
	FaArrowAltCircleDown,
	FaArrowAltCircleUp,
	FaCloudUploadAlt,
	FaEdit,
	MdRemoveCircle,
} from 'react-icons/all';
import {GRAY_COLOR, HIGHLIGHT_COLOR, MAIN_COLOR} from '../../styles/global';
import {useContextMenu} from 'react-contexify';
import HistoryContextMenu from './HistoryContextMenu';
import {CustomLi, CustomP, CustomUl, NoHistory} from '../../styles/sftp';

const HistoryContents = ({index, ws, uuid}) => {
	const {currentPath, History} = useSelector((state) => state.sftp);
	const pathItem = currentPath.find((item) => item.uuid === uuid);
	const dispatch = useDispatch();
	const eachHistory = History.filter((it) => it.uuid === uuid);
	const [highlight, setHighlight] = useState([]);

	const upload = async (files) => {
		for await (const key of files) {
			await sendCommandByPut(
				'put',
				key,
				ws,
				uuid,
				pathItem?.path,
				key.name,
				dispatch,
			);
		}
		sendCommandByLs(ws, uuid, pathItem?.path, dispatch);
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
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}
								>
									<CustomP>
										{history.todo === 'put' && (
											<FaArrowAltCircleUp
												style={{
													marginRight: '4px',
													color: '#116466',
												}}
											/>
										)}
										{history.todo === 'get' && (
											<FaArrowAltCircleDown
												style={{
													marginRight: '4px',
													color: '#3D88F5',
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
													color: '#F5513D',
												}}
											/>
										)}
										{history.name}
									</CustomP>
									<CustomP>{history.size} byte</CustomP>
								</div>
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
