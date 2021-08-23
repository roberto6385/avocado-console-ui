import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import {ResourceTreeContainer} from '../../../styles/components/navigationBar';
import Favorite from './Favorite';
import FavoriteGroup from './FavoriteGroup';
import {startCreatingTree} from '../../../utils/searchTree';
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
		setsearchedFavorites(startCreatingTree(favoriteTree, search));
	}, [favoriteTree, search]);

	return (
		<ResourceTreeContainer id='sortable-favorites'>
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
		</ResourceTreeContainer>
	);
};

Favorites.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default Favorites;
