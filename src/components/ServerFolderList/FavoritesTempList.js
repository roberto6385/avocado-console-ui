import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';

import {navColor} from '../../styles/color';
import {HiddenScroll} from '../../styles/function';
import FavoritesServer from './FavoritesServer';
import FavoritesFolder from './FavoritesFolder';
import {SORT_FAVORITES_SERVER_AND_FOLDER} from '../../reducers/common';

export const _Nav = styled(Nav)`
	display: block;
	min-height: 0;
	flex: 1 1 0;
	overflow-y: scroll;
	background: ${(props) => navColor[props.theme_value]};

	width: 100%;
	height: 100%;
	z-index: 999;
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

const FavoriteTempList = ({search}) => {
	const dispatch = useDispatch();
	const {tempFavorites, theme} = useSelector((state) => state.common);
	const [filteredFavorite, setfilteredFavorite] = useState(tempFavorites);

	const dropNavList = useCallback(() => {
		console.log('drop nav list');
		dispatch({
			type: SORT_FAVORITES_SERVER_AND_FOLDER,
			data: {next: 'toEdge'},
		});
	}, [dispatch]);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setfilteredFavorite(searchTreeStart(tempFavorites, search));
	}, [tempFavorites, search]);

	return (
		<_Nav onDrop={dropNavList} theme_value={theme} id='sortableServerNav'>
			{filteredFavorite.map((data) =>
				data.type === 'folder' ? (
					<FavoritesFolder
						temp={true}
						key={data.key}
						open={search !== ''}
						data={data}
						indent={1}
					/>
				) : (
					<FavoritesServer key={data.key} data={data} indent={1} />
				),
			)}
		</_Nav>
	);
};

FavoriteTempList.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default FavoriteTempList;
