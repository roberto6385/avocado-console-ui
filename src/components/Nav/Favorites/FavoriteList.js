import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import PropTypes from 'prop-types';
import Sortable from 'sortablejs';
import {_Nav} from '../../../styles/components/navigationBar';
import FavoriteServer from './FavoriteServer';
import FavoriteFolder from './FavoriteFolder';
import {
	LOCAL_SAVE_FAVORITES,
	SORT_FAVORITES_SERVER_AND_FOLDER,
} from '../../../reducers/common';
import {searchTreeStart} from '../functions';

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

FavoriteList.propTypes = {
	search: PropTypes.string.isRequired,
	setSearch: PropTypes.func,
};

export default FavoriteList;
