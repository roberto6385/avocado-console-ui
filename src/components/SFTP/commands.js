import {SFTP_SAVE_CURRENT_LIST} from '../../reducers/sftp';

export const listConversion = (result, uuid, dispatch) => {
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
		if (typeA < typeB) {
			return -1;
		}
		if (typeA > typeB) {
			return 1;
		}
		return 0;
	});
	dispatch({
		type: SFTP_SAVE_CURRENT_LIST,
		data: {uuid, list: fileList},
	});
};
