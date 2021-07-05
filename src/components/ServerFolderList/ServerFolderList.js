import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';

import Folder from './Folder';
import Server from './Server';
import {SORT_SERVER_AND_FOLDER} from '../../reducers/common';
import {navColor} from '../../styles/color';
import {HiddenScroll} from '../../styles/function';

export const _Nav = styled(Nav)`
	display: block;
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	background: ${(props) => navColor[props.theme_value]};
	width: 100%;
	height: 100%;
	z-index: 3;
	${HiddenScroll}
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
	const {nav, theme} = useSelector((state) => state.common);
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

	return (
		<_Nav onDrop={dropNavList} theme_value={theme} id='sortableServerNav'>
			{filteredNav.map((data) =>
				data.type === 'folder' ? (
					<Folder
						key={data.key}
						open={search !== ''}
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
	setSearch: PropTypes.func,
};

export default ServerFolderList;
