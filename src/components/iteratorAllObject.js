export const iteratorAllObject = (iterableItem, selectedItem) => {
	return new Promise((resolve) => {
		const initArray = [];
		const locationArray = [];
		const iteratorFunc = (item) =>
			item.forEach((pNode) => {
				const currentLocation = item.findIndex((it) => it === pNode);
				initArray.push(currentLocation === 0 ? '/0' : currentLocation);
				if (JSON.stringify(pNode) === JSON.stringify(selectedItem)) {
					const initString = initArray.join('');
					initString
						.split('/')
						.splice(1)
						.forEach((str) => {
							locationArray.push(
								parseInt(str.slice(str.length - 1)),
							);
						});
					resolve(locationArray);
				} else {
					// eslint-disable-next-line no-prototype-builtins
					if (pNode.hasOwnProperty('contain')) {
						// eslint-disable-next-line no-unused-vars
						iteratorFunc(pNode.contain);
					} else {
						initArray.pop();
					}
				}
			});
		iteratorFunc(iterableItem);
	});
};
