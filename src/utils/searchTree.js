function createTree(node, name) {
	if (node.type === 'resource' || !node.childern.length) {
		if (doesNameIncludeVal(node.name, name)) return node;
		else return null;
	}

	let tempContain = [];
	for (let x of node.childern) {
		let result = createTree(x, name);
		if (result) tempContain.push(result);
	}

	if (!tempContain.length && !doesNameIncludeVal(node, name)) return null;
	return {...node, childern: tempContain};
}

export function startCreatingTree(root, name) {
	let tempRoot = [];
	for (let x of root) {
		const result = createTree(x, name);
		if (result) tempRoot.push(result);
	}
	return tempRoot;
}

export function doesNameIncludeVal(name, val) {
	return name
		.toLowerCase()
		.replace(/ /g, '')
		.includes(val.toLowerCase().replace(/ /g, ''));
}
