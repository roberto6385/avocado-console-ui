import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {ServerNavBarContainer} from '../../styles/common';
import Folder from './Folder';
import Server from './Server';
import ServerContextMenu from '../ServerContextMenu';
import * as PropTypes from 'prop-types';

function searchTreeNode(node, name) {
	if (node.type === 'server' || !node.contain.length) {
		if (node.name.includes(name)) return node;
		else return null;
	}

	let tempContain = [];
	for (let x of node.contain) {
		let result = searchTreeNode(x, name);
		if (result) tempContain.push(result);
	}
	const val = {...node, contain: tempContain};

	if (!tempContain.length && !node.name.includes(name)) return null;
	return val;
}

function searchTreeStart(root, name) {
	let tempRoot = [];
	for (let x of root) {
		const result = searchTreeNode(x, name);
		if (result) tempRoot.push(result);
	}
	return tempRoot;
}

const NavList = ({search}) => {
	const {nav} = useSelector((state) => state.common);
	const [filteredNav, setfilteredNav] = useState(nav);

	useEffect(() => {
		setfilteredNav(searchTreeStart(nav, search));
	}, [nav, search]);

	return (
		<ServerNavBarContainer className={'flex-column'}>
			{filteredNav.map((data) =>
				data.type === 'folder' ? (
					<Folder key={data.key} data={data} indent={1} />
				) : (
					<Server key={data.key} data={data} indent={1} />
				),
			)}
		</ServerNavBarContainer>
	);
};

NavList.propTypes = {
	search: PropTypes.string.isRequired,
};

export default NavList;
