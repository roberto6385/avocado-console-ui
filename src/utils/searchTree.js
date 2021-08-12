function searchNextNode(node, name) {
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
		let result = searchNextNode(x, name);
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

export function startSearchingTree(root, name) {
	let tempRoot = [];
	for (let x of root) {
		const result = searchNextNode(x, name);
		if (result) tempRoot.push(result);
	}
	return tempRoot;
}
