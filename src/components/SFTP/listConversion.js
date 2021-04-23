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
					size: parseInt(splitedList[4]),
					type: splitedList[0][0] === 'd' ? 'directory' : 'file',
					lastModified: `${splitedList[5]} ${splitedList[6]} ${splitedList[7]}`,
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
