import React, {useState} from 'react';
import {MdCancel, MdFileDownload, MdSave} from 'react-icons/md';
import {
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_CURRENT_TEXT,
	SFTP_SAVE_HISTORY,
} from '../../reducers/sftp';
import {useDispatch, useSelector} from 'react-redux';
import {PropTypes} from 'prop-types';
import ConfirmPopup from '../ConfirmPopup';
import {Navbar, NavItem} from '../../styles/sftp';
import sftp_ws from '../../ws/sftp_ws';

const EditNav = ({index, ws, uuid}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const {currentText, currentCompareText, currentPath} = useSelector(
		(state) => state.sftp,
	);
	const curText = currentText.find((item) => item.uuid === uuid);
	const compareText = currentCompareText.find((item) => item.uuid === uuid);
	const curPath = currentPath.find((item) => item.uuid === uuid);
	const path = curPath?.path;

	const editedFileDownload = () => {
		const editFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		})
			.then((response) => {
				sftp_ws({
					keyword: 'CommandByGet',
					ws,
					uuid,
					path: response.result,
					fileName: editFile.name,
				});
			})
			.then(() =>
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: editFile.name,
						path: path,
						size: editFile.size,
						todo: 'get',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				}),
			);
	};

	const editedFileSave = () => {
		const editedFile = new File([curText?.text], curText?.name, {
			type: 'text/plain',
		});
		sftp_ws({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then(async (response) => {
			await sftp_ws({
				keyword: 'CommandByPut',
				ws,
				uuid,
				path: response.result,
				fileName: editedFile.name,
				uploadFile: editedFile,
			});
			sftp_ws({
				keyword: 'EDIT',
				ws,
				uuid,
				path: response.result,
				fileName: editedFile.name,
			}).then((response) => {
				dispatch({
					type: SFTP_SAVE_CURRENT_TEXT,
					data: {
						uuid,
						text: response,
						name: editedFile.name,
					},
				});
				dispatch({
					type: SFTP_SAVE_COMPARE_TEXT,
					data: {
						uuid,
						text: response,
						name: editedFile.name,
					},
				});
				dispatch({
					type: SFTP_SAVE_HISTORY,
					data: {
						uuid,
						name: editedFile.name,
						path: response.result,
						size: editedFile.size,
						todo: 'edit',
						progress: 100,
						// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
						// 삭제, dispatch, 삭제 해서 progress 100 만들기
					},
				});
			});
		});
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
