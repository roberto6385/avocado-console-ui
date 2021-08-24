import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ResourceTreeContainer} from '../../../styles/components/navigationBar';
import Favorite from './Favorite';
import FavoriteGroup from './FavoriteGroup';
import {startCreatingTree} from '../../../utils/searchTree';
import {favoritesSelector} from '../../../reducers/favorites';

const FavoriteTree = ({searchVal}) => {
	const {favoriteTree} = useSelector(favoritesSelector.all);

	// useEffect(() => {
	// 	const sortableFavorites = document.getElementById('sortable-favorites');
	// 	sortableFavorites !== null &&
	// 		Sortable.create(sortableFavorites, {
	// 			sort: false,
	// 		});
	// }, []);

	return (
		<ResourceTreeContainer id='sortable-favorites'>
			{(searchVal.length > 0
				? startCreatingTree(favoriteTree, searchVal)
				: favoriteTree
			).map((data) =>
				data.type === 'resourceGroup' ? (
					<FavoriteGroup
						key={data.id}
						open={searchVal !== ''}
						data={data}
						indent={1}
					/>
				) : (
					<Favorite key={data.id} data={data} indent={1} />
				),
			)}
		</ResourceTreeContainer>
	);
};

FavoriteTree.propTypes = {
	searchVal: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default FavoriteTree;
