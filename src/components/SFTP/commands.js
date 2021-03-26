import {
	SFTP_SAVE_COMPARE_TEXT,
	SFTP_SAVE_CURRENT_MODE,
	SFTP_SAVE_CURRENT_TEXT,
} from '../../reducers/sftp';
import usePostMessage from './hooks/usePostMessage';

export const listConversion = (result) => {
	console.log('run listConversion');

	const tempA = result;
	const tempB = tempA?.substring(1, tempA.length - 1);
	const tempC = tempB
		?.split(',')
		.map((line) => line.trim().replace(/\s{2,}/gi, ' '));
	const fileList = [];
	let i = 0;
	tempC?.forEach((list) => {
		const value = list.split(' ');
		if (value[8] !== '.') {
			const name = value.slice(8).join(' ');
			fileList.push({
				fileName: name,
				fileSize:
					typeof value[4] === 'string' &&
					value[4]
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						.trim(),
				fileType: value[0][0] === 'd' ? 'directory' : 'file',
				lastModified: `${value[5]} ${value[6]} ${value[7]}`,
				permission: value[0],
				owner: value[2],
				group: value[3],
				links: value[1],
				key: i++,
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

export const toEditMode = (e, ws, uuid, item, dispatch) => {
	e.stopPropagation();
	if (item.fileName !== '..' && item.fileType !== 'directory') {
		usePostMessage({
			keyword: 'CommandByPwd',
			ws,
			uuid,
		}).then((response) => {
			usePostMessage({
				keyword: 'EDIT',
				ws,
				uuid,
				path: response.result,
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
