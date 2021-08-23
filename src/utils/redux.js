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
	} else if (node.childern && node.childern.length > 0) {
		let result = null;
		for (let i = 0; !result && i < node.childern.length; i++) {
			result = searchNode(node.childern[i], id);
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

function deleteTreeNode(parent, node, key) {
	if (node.key === key) {
		let index = parent.contain.findIndex((v) => v.key === key);
		parent.contain.splice(index, 1);
	} else if (node.contain && node.contain.length > 0) {
		for (let i = 0; i < node.contain.length; i++)
			deleteTreeNode(node, node.contain[i], key);
	}
}

export function startDeleteingTree(root, key) {
	for (let i = 0; i < root.length; i++) {
		if (root[i].key === key) {
			root.splice(i, 1);
		} else deleteTreeNode(root, root[i], key);
	}
}

export function addDataOnNode(nav, selectedResource, data) {
	let node = null;
	if (!selectedResource) node = nav;
	else if (selectedResource[0] === 's')
		node = startSearchingParentNode(nav, selectedResource);
	else node = startSearchingNode(nav, selectedResource);

	if (node.contain) node.contain.push(data);
	else node.push(data);
}
