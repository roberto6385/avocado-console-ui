import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';

import FavoriteServerOnDialogBox from './FavoriteServerOnDialogBox';
import FolderOnFavoritesDialogBox from './FolderOnFavoritesDialogBox';
import {_Nav} from '../../../../styles/components/navigationBar';

const FavoriteItemsTreeOnDialogBox = () => {
	const {tempFavorites} = useSelector((state) => state.common, shallowEqual);

	return (
		<_Nav id='sortableFavoritesOnDialogBox'>
			{tempFavorites.map((data) =>
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
