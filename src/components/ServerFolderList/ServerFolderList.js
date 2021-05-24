import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as PropTypes from 'prop-types';

import Folder from './Folder';
import Server from './Server';
import Sortable from 'sortablejs';
import {SORT_SERVER_AND_FOLDER} from '../../reducers/common';

import styled from 'styled-components';
import {Nav} from 'react-bootstrap';

export const _Nav = styled(Nav)`
	display: flex;
	flex-direction: column;
`;

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

function searchTreeStart(root, name) {
	let tempRoot = [];
	for (let x of root) {
		const result = searchTreeNode(x, name);
		if (result) tempRoot.push(result);
	}
	return tempRoot;
}

const ServerFolderList = ({search}) => {
	const dispatch = useDispatch();

	const {nav} = useSelector((state) => state.common);
	const [filteredNav, setfilteredNav] = useState(nav);

	const dropNavList = useCallback(() => {
		dispatch({type: SORT_SERVER_AND_FOLDER, data: {next: 'toEdge'}});
	}, []);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setfilteredNav(searchTreeStart(nav, search));
	}, [nav, search]);

	useEffect(() => {}, []);

	return (
		<_Nav onDrop={dropNavList} id='sortableServerNav'>
			{filteredNav.map((data) =>
				data.type === 'folder' ? (
					<Folder
						key={data.key}
						open={search === '' ? false : true}
						data={data}
						indent={1}
					/>
				) : (
					<Server key={data.key} data={data} indent={1} />
				),
			)}
		</_Nav>
	);
};

ServerFolderList.propTypes = {
	search: PropTypes.string.isRequired,
};

export default ServerFolderList;
