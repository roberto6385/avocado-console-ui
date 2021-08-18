import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import {_Nav} from '../../../styles/components/navigationBar';
import FavoriteServer from './FavoriteServer';
import FolderOnFavorites from './FolderOnFavorites';
import {startSearchingTree} from '../../../utils/searchTree';
import {favoritesAction, favoritesSelector} from '../../../reducers/favorites';

const FavoriteItemsTree = ({search}) => {
	const dispatch = useDispatch();
	const {favoriteTree} = useSelector(favoritesSelector.all);
	const [filteredFavorites, setfilteredFavorites] = useState(favoriteTree);

	const dropNavList = useCallback(() => {
		console.log('drop favorites list');
		dispatch(favoritesAction.sortFavorites({next: 'toEdge'}));
	}, [dispatch]);

	useEffect(() => {
		const sortableServerNav = document.getElementById('sortableServerNav');
		sortableServerNav !== null &&
			Sortable.create(sortableServerNav, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setfilteredFavorites(startSearchingTree(favoriteTree, search));
	}, [favoriteTree, search]);

	return (
		<_Nav onDrop={dropNavList} id='sortableServerNav'>
			{filteredFavorites.map((data) =>
				data.type === 'folder' ? (
					<FolderOnFavorites
						key={data.key}
						open={search !== ''}
						data={data}
						indent={1}
						temp={false}
					/>
				) : (
					<FavoriteServer
						key={data.key}
						data={data}
						indent={1}
						temp={false}
					/>
				),
			)}
		</_Nav>
	);
};

FavoriteItemsTree.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default FavoriteItemsTree;
