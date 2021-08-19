import React from 'react';
import {useSelector} from 'react-redux';

import FavoriteOnDialogBox from './FavoriteOnDialogBox';
import FavoriteGroupDialogBox from './FavoriteGroupDialogBox';
import {ResourceTree} from '../../../../styles/components/navigationBar';
import {favoritesSelector} from '../../../../reducers/favorites';

const FavoriteItemTreeOnDialogBox = () => {
	const {tempFavoriteTree} = useSelector(favoritesSelector.all);

	return (
		<ResourceTree>
			{tempFavoriteTree.map((data) =>
				data.type === 'folder' ? (
					<FavoriteGroupDialogBox
						key={data.key}
						data={data}
						indent={1}
					/>
				) : (
					<FavoriteOnDialogBox
						key={data.key}
						data={data}
						indent={1}
					/>
				),
			)}
		</ResourceTree>
	);
};

export default FavoriteItemTreeOnDialogBox;
