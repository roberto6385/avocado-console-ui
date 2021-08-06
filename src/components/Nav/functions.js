export const isValidFolderName = (folderArray, name) => {
	let pass = true;

	for (let i of folderArray) {
		if (i.type === 'folder') {
			if (i.name === name) return false;
			else if (i.contain.length > 0) {
				pass = pass && isValidFolderName(i.contain, name);
			}
		}
	}
	return pass;
};

function searchTreeNode(node, name) {
	if (node.type === 'server' || !node.contain.length) {
		if (
			node.name
				.toLowerCase()
				.replace(/ /g, '')
				.includes(name.toLowerCase().replace(/ /g, ''))
		)
			return node;
		else return null;
	}

	let tempContain = [];
	for (let x of node.contain) {
		let result = searchTreeNode(x, name);
		if (result) tempContain.push(result);
	}
	const val = {...node, contain: tempContain};

	if (
		!tempContain.length &&
		!node.name
			.toLowerCase()
			.replace(/ /g, '')
			.includes(name.toLowerCase().replace(/ /g, ''))
	)
		return null;
	return val;
}

export function searchTreeStart(root, name) {
	let tempRoot = [];
	for (let x of root) {
		const result = searchTreeNode(x, name);
		if (result) tempRoot.push(result);
	}
	return tempRoot;
}
