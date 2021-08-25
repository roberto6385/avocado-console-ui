import React from 'react';

import FavoriteOnDialogBox from './FavoriteOnDialogBox';
import FavoriteGroupDialogBox from './FavoriteGroupDialogBox';
import {ResourceTreeContainer} from '../../../../styles/components/navigationBar';

const FavoriteTreeOnDialogBox = () => {
	console.log(JSON.parse(localStorage.getItem('tempFavoriteTree')));
	console.log(localStorage.getItem('tempFavoriteTree'));
	return (
		<ResourceTreeContainer>
			{JSON.parse(localStorage.getItem('tempFavoriteTree')).map((data) =>
				data.type === 'resourceGroup' ? (
					<FavoriteGroupDialogBox
						key={data.id}
						data={data}
						indent={1}
					/>
				) : (
					<FavoriteOnDialogBox key={data.id} data={data} indent={1} />
				),
			)}
		</ResourceTreeContainer>
	);
};

export default FavoriteTreeOnDialogBox;
