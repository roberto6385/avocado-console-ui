export const fillTabs = (tab, max_display_tab, current_tab) => {
	if (tab.length === 0) {
		current_tab = null;
	} else {
		let visible_tab_length = tab.filter((x) => x.display).length;

		for (let i = 0; i < tab.length; i++) {
			if (visible_tab_length === max_display_tab) break;
			else if (visible_tab_length > max_display_tab) {
				if (tab[i].display && tab[i].uuid !== current_tab) {
					tab[i].display = false;
					visible_tab_length--;
				}
			} else if (visible_tab_length < max_display_tab) {
				if (!tab[i].display) {
					tab[i].display = true;
					visible_tab_length++;
				}
			}
		}

		if (tab.find((v) => v.uuid === current_tab && v.display) === undefined)
			current_tab = tab.find((x) => x.display).uuid;
	}
	return current_tab;
};

function searchNode(node, id) {
	if (node.id === id) {
		return node;
	} else if (node.children && node.children.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.children.length; i++) {
			result = searchNode(node.children[i], id);
		}
		return result;
	}
	return null;
}

export function startSearchingNode(root, id) {
	for (let x of root) {
		let result = searchNode(x, id);
		if (result !== null) return result;
	}
	return root;
}

function searchParentNode(parent, node, key) {
	if (node.key === key) {
		return parent;
	} else if (node.contain && node.contain.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.contain.length; i++) {
			result = searchParentNode(node, node.contain[i], key);
		}
		return result;
	}
	return null;
}

export function startSearchingParentNode(root, key) {
	for (let x of root) {
		let result = searchParentNode(root, x, key);
		if (result !== null) return result;
	}
	return root;
}

function deleteTreeNode(node, id) {
	if (node.id === id) return null;
	if (node.children && node.children.length > 0) {
		for (let i = 0; i < node.children.length; i++)
			deleteTreeNode(node.children[i], id);
	}
	return node;
}

export function startDeleteingTree(root, id) {
	for (let i = 0; i < root.length; i++) {
		if (root[i].id === id) {
			root.splice(i, 1);
			return;
		} else root[i] = deleteTreeNode(root[i], id);
	}
}

export function addDataOnNode(nav, selectedResource, data) {
	console.log(selectedResource);
	if (!selectedResource) {
		data.parents = null;
		data.path = '/' + data.id;
		nav.push(data);
	} else {
		let node = startSearchingNode(nav, selectedResource);
		if (node.type === 'resourceGroup') {
			data.parents = node.id;
			data.path = node.path + '/' + data.id;
			node.children.push(data);
		}
		if (node.type === 'resource') {
			if (node.parents === null) {
				data.parents = null;
				data.path = '/' + data.id;
				nav.push(data);
			} else {
				node = startSearchingNode(nav, node.parents);
				data.parents = node.id;
				data.path = node.path + '/' + data.id;
				node.children.push(data);
			}
		}
	}
}
