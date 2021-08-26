export const compareTypes = {id: 'id', name: 'name'};
export const compareFiles = (total, select, criterion, type) => {
	console.log(total);
	console.log(select);
	console.log(criterion);
	let selectedIndex = total.findIndex((v) => v[type] === select[type]);
	let lastIndex = total.findIndex((v) => v[type] === criterion[type]);
	const array = [];
	if (selectedIndex === lastIndex) return [select];
	while (lastIndex !== selectedIndex) {
		array.push(total[lastIndex]);
		selectedIndex > lastIndex ? lastIndex++ : lastIndex--;
	}
	array.push(select);
	console.log(array);
	return array;
};

export const pathFormatter = (path, name) => {
	return path === '/' ? `${path}${name}` : `${path}/${name}`;
};

export function fileByteSizeFormater(bytes, decimals = 0) {
	if (bytes === 0) {
		return '0 byte';
	}
	const k = 1000;
	const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
		sizes[i]
	}`;
}

export function sortingUtil({array, type = 'name', asc = true}) {
	const nextList = array.slice().sort((a, b) => {
		if (type === 'name') {
			if (asc) {
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
		if (type === 'size') {
			if (asc) {
				return a.size < b.size ? -1 : a.size > b.size ? 1 : 0;
			} else {
				return a.size > b.size ? -1 : a.size < b.size ? 1 : 0;
			}
		}
		if (type === 'modified') {
			const lastA = sftpDateFormater({
				modify: a.lastModified,
				keyword: 'sort',
			});
			const lastB = sftpDateFormater({
				modify: b.lastModified,
				keyword: 'sort',
			});
			if (asc) {
				return lastA < lastB ? -1 : lastA > lastB ? 1 : 0;
			} else {
				return lastA > lastB ? -1 : lastA < lastB ? 1 : 0;
			}
		}
		if (type === 'permission') {
			if (asc) {
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

export const sftpDateFormater = ({modify, keyword, language}) => {
	const months = {
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

	const formatValue = modify.split(' ');
	let splitTime = formatValue[3].split(':');

	if (parseInt(splitTime[0]) > 12)
		splitTime.splice(0, 1, parseInt(splitTime[0]) - 12);
	if (keyword === 'format') {
		return `${formatValue[5]}.${months[formatValue[1]]}.${formatValue[2]}
		${
			typeof splitTime[0] === 'string'
				? `${am} ${splitTime.join(':')}`
				: `${pm} ${splitTime.join(':')}`
		}`;
	} else {
		return parseInt(
			formatValue[5] +
				months[formatValue[1]] +
				formatValue[2] +
				formatValue[3].replaceAll(':', ''),
		);
	}
};
export const createPathList = ({path}) => {
	let pathList = ['/'];
	let tempPathList = path.split('/');
	tempPathList.reduce(function (accumulator, currentValue) {
		path !== '/' && pathList.push(accumulator + '/' + currentValue);
		return accumulator + '/' + currentValue;
	});
	return pathList;
};
