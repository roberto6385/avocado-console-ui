import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';

import FavoriteOnDialogBox from './FavoriteOnDialogBox';
import FavoriteGroupDialogBox from './FavoriteGroupDialogBox';
import {ResourceTree} from '../../../../styles/components/navigationBar';

const FavoriteItemTreeOnDialogBox = () => {
	const {tempFavorites} = useSelector((state) => state.common, shallowEqual);

	return (
		<ResourceTree>
			{tempFavorites.map((data) =>
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
