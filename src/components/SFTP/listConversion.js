export function formatByteSizeString(bytes, decimals = 0) {
	if (bytes === 0) {
		return '0 Byte';
	}
	const k = 1000;
	const dm = decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function sortFunction({fileList, keyword, toggle}) {
	const nextList = fileList.slice().sort((a, b) => {
		if (keyword === 'name') {
			if (toggle) {
				return a.type < b.type
					? -1
					: a.type > b.type
					? 1
					: a.name < b.name
					? -1
					: a.name > b.name
					? 1
					: 0;
			} else {
				return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
			}
		}
		if (keyword === 'size') {
			if (toggle) {
				return a.size < b.size ? -1 : a.size > b.size ? 1 : 0;
			} else {
				return a.size > b.size ? -1 : a.size < b.size ? 1 : 0;
			}
		}
		if (keyword === 'modified') {
			const lastA = dataFormater({
				modify: a.lastModified,
				keyword: 'sort',
			});
			const lastB = dataFormater({
				modify: b.lastModified,
				keyword: 'sort',
			});
			if (toggle) {
				return lastA < lastB ? -1 : lastA > lastB ? 1 : 0;
			} else {
				return lastA > lastB ? -1 : lastA < lastB ? 1 : 0;
			}
		}
		if (keyword === 'permission') {
			if (toggle) {
				return a.permission < b.permission
					? -1
					: a.permission > b.permission
					? 1
					: 0;
			} else {
				return a.permission > b.permission
					? -1
					: a.permission < b.permission
					? 1
					: 0;
			}
		}
	});

	nextList.sort((a, b) => {
		if (a.name === '..') return -1;
	});

	return nextList;
}

export const dataFormater = ({modify, keyword, language}) => {
	const formatValue = modify.split(' ');
	const monthObj = {
		Jan: '01',
		Feb: '02',
		Mar: '03',
		Apr: '04',
		May: '05',
		Jun: '06',
		Jul: '07',
		Aug: '08',
		Sep: '09',
		Oct: '10',
		Nov: '11',
		Dec: '12',
	};

	const am = language === 'ko-KR' ? '오전' : 'AM';
	const pm = language === 'ko-KR' ? '오후' : 'PM';

	let splitTime = formatValue[3].split(':');
	if (parseInt(splitTime[0]) > 12)
		splitTime.splice(0, 1, parseInt(splitTime[0]) - 12);
	if (keyword === 'format') {
		return `${formatValue[5]}.${monthObj[formatValue[1]]}.${formatValue[2]}
		${
			typeof splitTime[0] === 'string'
				? `${am} ${splitTime.join(':')}`
				: `${pm} ${splitTime.join(':')}`
		}`;
	} else {
		return parseInt(
			formatValue[5] +
				monthObj[formatValue[1]] +
				formatValue[2] +
				formatValue[3].replaceAll(':', ''),
		);
	}
};
