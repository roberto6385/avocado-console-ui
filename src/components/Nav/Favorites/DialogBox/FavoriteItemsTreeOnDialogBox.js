import React from 'react';
import {useSelector} from 'react-redux';

import FavoriteServerOnDialogBox from './FavoriteServerOnDialogBox';
import FolderOnFavoritesDialogBox from './FolderOnFavoritesDialogBox';
import {_Nav} from '../../../../styles/components/navigationBar';
import {favoritesSelector} from '../../../../reducers/favorites';

const FavoriteItemsTreeOnDialogBox = () => {
	const {favoriteTreeOnDialogBox} = useSelector(favoritesSelector.all);

	return (
		<_Nav id='sortableFavoritesOnDialogBox'>
			{favoriteTreeOnDialogBox.map((data) =>
				data.type === 'folder' ? (
					<FolderOnFavoritesDialogBox
						key={data.key}
						data={data}
						indent={1}
					/>
				) : (
					<FavoriteServerOnDialogBox
						key={data.key}
						data={data}
						indent={1}
					/>
				),
			)}
		</_Nav>
	);
};

export default FavoriteItemsTreeOnDialogBox;
