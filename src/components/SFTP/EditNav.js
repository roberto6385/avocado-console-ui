import React, {useState} from 'react';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {SFTP_SAVE_CURRENT_MODE, SFTP_SAVE_HISTORY} from '../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';
import {Navbar, NavItem} from '../../styles/sftp';
import useConfirmActions from '../../hooks/useConfirmActions';

const EditNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const {editFile} = useConfirmActions(ws, uuid);
	const {currentText, currentCompareText, currentPath} = useSelector(
		(state) => state.sftp,
	);
	const curText = currentText.find((item) => item.uuid === uuid);
	const compareText = currentCompareText.find((item) => item.uuid === uuid);
	const curPath = currentPath.find((item) => item.uuid === uuid);
	const path = curPath?.path;

	const editedFileDownload = () => {
		let link = document.createElement('a');
		link.download = curText?.name;
		let blob = new Blob([curText?.text], {type: 'text/plain'});
		link.href = URL.createObjectURL(blob);
		link.click();
		URL.revokeObjectURL(link.href);
		dispatch({
			type: SFTP_SAVE_HISTORY,
			data: {
				uuid,
				name: curText?.name,
				path: path,
				size: blob.size,
				todo: 'get',
				progress: 100,
				// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
				// 삭제, dispatch, 삭제 해서 progress 100 만들기
			},
		});
	};

	const editedFileSave = async () => {
		await editFile(curText);
	};

	const toNormalMode = () => {
		if (curText?.text !== compareText?.text) {
			setOpen(true);
		} else {
			dispatch({
				type: SFTP_SAVE_CURRENT_MODE,
				data: {uuid, mode: 'normal'},
			});
		}
	};

	return (
		<Navbar>
			<span style={{fontSize: '14px'}}>
				{`${path === '/' ? path : `${path}/`}${curText?.name}`}
			</span>
			<div style={{display: 'flex', alignItems: 'center'}}>
				<NavItem onClick={editedFileDownload}>
					<MdFileDownload />
				</NavItem>
				<NavItem onClick={editedFileSave}>
					<MdSave />
				</NavItem>
				<NavItem onClick={toNormalMode}>
					<MdCancel />
				</NavItem>
			</div>
			<ConfirmPopup
				keyword={'edit_file'}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</Navbar>
	);
};

EditNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
};

export default EditNav;
