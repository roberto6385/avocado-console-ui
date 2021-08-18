import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import {ResourceTree} from '../../../styles/components/navigationBar';
import Favorite from './Favorite';
import FavoriteGroup from './FavoriteGroup';
import {startSearchingTree} from '../../../utils/searchTree';
import {favoritesSelector} from '../../../reducers/favorites';

const Favorites = ({search}) => {
	const {favoriteTree} = useSelector(favoritesSelector.all);
	const [searchedFavorites, setsearchedFavorites] = useState(favoriteTree);

	useEffect(() => {
		const sortableFavorites = document.getElementById('sortable-favorites');
		sortableFavorites !== null &&
			Sortable.create(sortableFavorites, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setsearchedFavorites(startSearchingTree(favoriteTree, search));
	}, [favoriteTree, search]);

	return (
		<ResourceTree id='sortable-favorites'>
			{searchedFavorites.map((data) =>
				data.type === 'folder' ? (
					<FavoriteGroup
						key={data.key}
						open={search !== ''}
						data={data}
						indent={1}
						temp={false}
					/>
				) : (
					<Favorite
						key={data.key}
						data={data}
						indent={1}
						temp={false}
					/>
				),
			)}
		</ResourceTree>
	);
};

Favorites.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default Favorites;
