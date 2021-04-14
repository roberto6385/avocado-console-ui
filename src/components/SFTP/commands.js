import {
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_CURRENT_TEXT,
} from '../../reducers/sftp';
import newSftp_ws from '../../ws/sftp_ws';

export const listConversion = (result) => {
	console.log('run listConversion');
	console.log(result);
	const fileList = [];
	result !== undefined &&
		typeof result === 'object' &&
		result?.forEach((list) => {
			const splitedList = list.replace(/\s{2,}/gi, ' ').split(' ');
			if (splitedList[splitedList.length - 1] !== '.') {
				fileList.push({
					fileName: splitedList.slice(8).join(' '),
					fileSize: parseInt(splitedList[4]),
					fileType: splitedList[0][0] === 'd' ? 'directory' : 'file',
					lastModified: `${splitedList[5]} ${splitedList[6]} ${splitedList[7]}`,
					permission: splitedList[0],
					owner: splitedList[2],
					group: splitedList[3],
					links: splitedList[1],
				});
			}
		});
	fileList.sort((a, b) => {
		let typeA = a.fileType;
		let typeB = b.fileType;
		let nameA = a.fileName;
		let nameB = b.fileName;
		if (nameA === '..') {
			return -1;
		}
		if (typeA < typeB) {
			return -1;
		}
		if (typeA > typeB) {
			return 1;
		}
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		return 0;
	});

	return fileList;
};

export const toEditMode = (e, ws, uuid, path, item, dispatch, mode) => {
	e.stopPropagation();
	if (item.fileName !== '..' && item.fileType !== 'directory') {
		newSftp_ws({
			keyword: 'CommandByPwd',
			ws,
		}).then((response) => {
			newSftp_ws({
				keyword: 'CommandByEdit',
				ws,
				path: mode === 'list' ? response : path,
				fileName: item.fileName,
			}).then((response) => {
				dispatch({
					type: SFTP_SAVE_CURRENT_TEXT,
					data: {
						uuid,
						text: response,
						name: item.fileName,
					},
				});
				dispatch({
					type: SFTP_SAVE_COMPARE_TEXT,
					data: {
						uuid,
						text: response,
						name: item.fileName,
					},
				});
				dispatch({
					type: SFTP_SAVE_CURRENT_MODE,
					data: {uuid, mode: 'edit'},
				});
			});
		});
	}
};
