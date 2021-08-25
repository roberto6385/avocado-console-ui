import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {ResourceTreeContainer} from '../../../styles/components/navigationBar';
import Favorite from './Favorite';
import FavoriteGroup from './FavoriteGroup';
import {startCreatingTree} from '../../../utils/searchTree';
import {favoritesSelector} from '../../../reducers/favorites';
import Sortable from 'sortablejs';

const FavoriteTree = ({searchVal}) => {
	const {favoriteTree} = useSelector(favoritesSelector.all);

	const onDropResource = useCallback(() => {}, []);

	useEffect(() => {
		const sortableResources = document.getElementById(
			'sortable-favorite-tree',
		);
		sortableResources !== null &&
			Sortable.create(sortableResources, {
				sort: true,
				// fallbackOnBody: true,
				// animation: 150,
				// swapThreshold: 0.65,
				onEnd: function (evt) {
					console.log(evt.to, evt.from);
				},
			});
	}, []);

	return (
		<ResourceTreeContainer
			id='sortable-favorite-tree'
			onDrop={onDropResource}
		>
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
