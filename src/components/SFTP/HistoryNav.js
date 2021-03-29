import React, {useState} from 'react';
import {
	BsArrowClockwise,
	BsCheck,
	MdFileUpload,
	MdPause,
	MdDelete,
} from 'react-icons/all';
import {PropTypes} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import ConfirmPopup from '../ConfirmPopup';
import {NavItem} from '../../styles/sftp';
import sftp_ws from '../../ws/sftp_ws';
import {SFTP_SAVE_CURRENT_LIST, SFTP_SAVE_HISTORY} from '../../reducers/sftp';
import {OPEN_TAB} from '../../reducers/common';
import {listConversion} from './commands';

const HistoryNav = ({index, ws, uuid, serverId}) => {
	const {currentPath} = useSelector((state) => state.sftp);
	console.log(index);
	const {server} = useSelector((state) => state.common);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);

	const upload = async () => {
		// return new Promise((resolve) => {
		const data = server.find((item) => item.id === serverId);
		console.log(data);
		const uploadInput = document.createElement('input');
		document.body.appendChild(uploadInput);
		uploadInput.setAttribute('type', 'file');
		uploadInput.setAttribute('multiple', 'multiple');
		uploadInput.setAttribute('style', 'display:none');
		uploadInput.click();
		uploadInput.onchange = (e) => {
			const File = e.target.files;
			sftp_ws({
				keyword: 'CommandByPwd',
				ws,
				uuid,
			}).then(async (response) => {
				for (const key of Object.keys(File)) {
					await sftp_ws({
						keyword: 'CommandByPut',
						ws,
						uuid,
						path: response.result,
						fileName: File[key].name,
						uploadFile: File[key],
					}).then((response) => {
						dispatch({
							type: SFTP_SAVE_HISTORY,
							data: {
								uuid,
								name: File[key].name,
								path: response.result,
								size: File[key].size,
								todo: 'put',
								progress: 100,
								// 나중에 서버에서 정보 넘어올때마다 dispatch 해주고
								// 삭제, dispatch, 삭제 해서 progress 100 만들기
							},
						});
					});
				}
				sftp_ws({
					keyword: 'CommandByLs',
					ws,
					uuid,
					path: response.result,
				})
					.then((response) => listConversion(response.result))
					.then((response) =>
						dispatch({
							type: SFTP_SAVE_CURRENT_LIST,
							data: {uuid, list: response},
						}),
					);
			});
		};
		document.body.removeChild(uploadInput);
	};

	const historyDelete = () => {
		// if exist highlighting history
		setOpen(true);
	};

	// const uploading = async () => {
	// 	const path = await upload();
	// 	console.log(path);
	// };

	return (
		<>
			<NavItem>
				<BsArrowClockwise />
			</NavItem>
			<NavItem>
				<BsCheck />
			</NavItem>
			<NavItem id='btn-upload' onClick={upload}>
				<MdFileUpload />
			</NavItem>
			<NavItem>
				<MdPause />
			</NavItem>
			<NavItem onClick={historyDelete}>
				<MdDelete />
			</NavItem>
			<ConfirmPopup
				keyword={'delete_history'}
				open={open}
				setOpen={setOpen}
				ws={ws}
				uuid={uuid}
			/>
		</>
	);
};

HistoryNav.propTypes = {
	index: PropTypes.number.isRequired,
	ws: PropTypes.object.isRequired,
	uuid: PropTypes.string.isRequired,
	serverId: PropTypes.number.isRequired,
};

export default HistoryNav;
