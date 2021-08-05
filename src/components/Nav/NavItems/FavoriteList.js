import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';

import {HideScroll} from '../../../styles/function';
import FavoriteServer from './FavoriteServer';
import FavoriteFolder from './FavoriteFolder';
import {
	LOCAL_SAVE_FAVORITES,
	SORT_FAVORITES_SERVER_AND_FOLDER,
} from '../../../reducers/common';

export const _Nav = styled(Nav)`
	display: block;
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	width: 100%;
	height: 100%;
	z-index: 999;
	${HideScroll}
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

const FavoriteList = ({search}) => {
	const dispatch = useDispatch();
	const {favorites} = useSelector((state) => state.common, shallowEqual);
	const [filteredFavorite, setfilteredFavorite] = useState(favorites);

	const dropNavList = useCallback(() => {
		console.log('drop favorites list');
		dispatch({
			type: SORT_FAVORITES_SERVER_AND_FOLDER,
			data: {next: 'toEdge'},
		});
		dispatch({type: LOCAL_SAVE_FAVORITES});
	}, [dispatch]);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setfilteredFavorite(searchTreeStart(favorites, search));
	}, [favorites, search]);

	return (
		<_Nav onDrop={dropNavList} id='sortableServerNav'>
			{filteredFavorite.map((data) =>
				data.type === 'folder' ? (
					<FavoriteFolder
						key={data.key + data.name}
						open={search !== ''}
						data={data}
						indent={1}
						temp={false}
					/>
				) : (
					<FavoriteServer
						key={data.key + data.name}
						data={data}
						indent={1}
						temp={false}
					/>
				),
			)}
		</_Nav>
	);
};

FavoriteList.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default FavoriteList;
