import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import FavoriteServer from './FavoriteServer';
import FavoriteFolder from './FavoriteFolder';
import {
	LOCAL_SAVE_FAVORITES,
	SORT_FAVORITES_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import {_Nav} from '../../../styles/components/navigationBar';

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
	const {tempFavorites} = useSelector((state) => state.common, shallowEqual);
	const [filteredFavorite, setfilteredFavorite] = useState(tempFavorites);

	const dropNavList = useCallback(() => {
		//TODO favorites temp list drag and drop
		console.log('drop favorites temp list');
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
		setfilteredFavorite(searchTreeStart(tempFavorites, search));
	}, [tempFavorites, search]);

	const handleDragOver = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
	}, []);

	return (
		<_Nav
			onDrop={dropNavList}
			onDragOver={handleDragOver}
			id='sortableServerNav'
		>
			{filteredFavorite.map((data) =>
				data.type === 'folder' ? (
					<FavoriteFolder
						key={data.key + data.name}
						open={search !== ''}
						data={data}
						indent={1}
						temp={true}
					/>
				) : (
					<FavoriteServer
						key={data.key + data.name}
						data={data}
						indent={1}
						temp={true}
					/>
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
