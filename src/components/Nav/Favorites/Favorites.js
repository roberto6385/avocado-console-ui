import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import {ResourceTree} from '../../../styles/components/navigationBar';
import Favorite from './Favorite';
import FavoriteGroup from './FavoriteGroup';
import {SORT_FAVORITE_RESOURCES} from '../../../reducers/common';
import {startSearchingTree} from '../../../utils/searchTree';

const Favorites = ({search}) => {
	const dispatch = useDispatch();
	const {favorites} = useSelector((state) => state.common, shallowEqual);
	const [searchedFavorites, setsearchedFavorites] = useState(favorites);

	const onDropSortFavorites = useCallback(() => {
		dispatch({
			type: SORT_FAVORITE_RESOURCES,
			payload: {next: 'toEdge'},
		});
	}, [dispatch]);

	useEffect(() => {
		const sortableFavorites = document.getElementById('sortable-favorites');
		sortableFavorites !== null &&
			Sortable.create(sortableFavorites, {
				sort: false,
			});
	}, []);

	useEffect(() => {
		setsearchedFavorites(startSearchingTree(favorites, search));
	}, [favorites, search]);

	return (
		<ResourceTree onDrop={onDropSortFavorites} id='sortable-favorites'>
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
