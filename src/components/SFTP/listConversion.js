const dateConversion = ({month, day, time}) => {
	const date = new Date();
	const year = date.getFullYear();
	const monthObj = {
		Jan: 1,
		Feb: 2,
		Mar: 3,
		Apr: 4,
		May: 5,
		Jun: 6,
		Jul: 7,
		Aug: 8,
		Sep: 9,
		Oct: 10,
		Nov: 11,
		Dec: 12,
	};
	let ampm = '';
	if (time.includes(':')) {
		const timeSlice = time.split(':');
		let intTime = parseInt(timeSlice[0]);
		ampm =
			intTime < 12
				? `오전 ${time}`
				: `오후 ${intTime - 12}:${timeSlice[1]}`;
	}
	return `${time.includes(':') ? year : time}.${monthObj[month]}.${day} ${
		time.includes(':') ? `${ampm}` : '오전 00:00'
	}`;
};

function formatByteSizeString(bytes, decimals = 0) {
	if (bytes === 0) {
		return '0 Byte';
	}
	const k = 1000;
	const dm = decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const listConversion = (result) => {
	console.log('run listConversion');
	console.log(result);
	const fileList = [];
	result !== undefined &&
		result.forEach((list) => {
			const splitedList = list.replace(/\s{2,}/gi, ' ').split(' ');
			if (splitedList[splitedList.length - 1] !== '.') {
				fileList.push({
					name: splitedList.slice(8).join(' '),
					size: formatByteSizeString(parseInt(splitedList[4])),
					type: splitedList[0][0] === 'd' ? 'directory' : 'file',
					// lastModified: `${splitedList[5]} ${splitedList[6]} ${splitedList[7]}`, // 월 , 일 ,시간 or 년도
					lastModified: dateConversion({
						month: splitedList[5],
						day: splitedList[6],
						time: splitedList[7],
					}), // 월 , 일 ,시간 or 년도
					permission: splitedList[0],
					owner: splitedList[2],
					group: splitedList[3],
					links: splitedList[1],
				});
			}
		});
	fileList.sort((a, b) => {
		let typeA = a.type;
		let typeB = b.type;
		let nameA = a.name;
		let nameB = b.name;
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
