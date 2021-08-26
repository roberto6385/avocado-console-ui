import React from 'react';

import FavoriteOnDialogBox from './FavoriteOnDialogBox';
import FavoriteGroupOnDialogBox from './FavoriteGroupOnDialogBox';
import {ResourceTreeContainer} from '../../../../styles/components/navigationBar';

const FavoriteTreeOnDialogBox = () => {
	return (
		<ResourceTreeContainer>
			{JSON.parse(localStorage.getItem('tempFavoriteTree')).map((data) =>
				data.type === 'resourceGroup' ? (
					<FavoriteGroupOnDialogBox
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
