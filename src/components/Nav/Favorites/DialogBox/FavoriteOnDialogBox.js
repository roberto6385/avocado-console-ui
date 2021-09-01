import React, {useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';

import {useSelector} from 'react-redux';
import {Icon} from '../../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../../styles/components/navigationBar';
import {awsServerIcon, linuxServerIcon} from '../../../../icons/icons';
import {remoteResourceSelector} from '../../../../reducers/remoteResource';

const FavoriteOnDialogBox = ({data, indent}) => {
	const {resources} = useSelector(remoteResourceSelector.all);
	const resource = useMemo(
		() => resources.find((v) => v.id === data.id),
		[resources, data.id],
	);

	const onClickFavorite = useCallback(() => {
		//TODO: If alreay selected Item => deselect
		// If alreay deselected Item => select
		// !!importand point : duplicate selection is possible
	}, []);

	return (
		<React.Fragment>
			{/*다이얼로그박스 폴더안에 서버아이템들*/}
			<ResourceItem
				//TODO: if selected ? 1 : 0
				// selected={
				// (if selected)
				// 		? 1
				// 		: 0
				// }
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavorite}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					//TODO: if selected ? 'selected : undefined
					// itype={
					// (if selected)
					// 		? 'selected'
					// 		: undefined
					// }
				>
					{resource.data.osType === 'linux' && linuxServerIcon}
					{resource.data.osType === 'aws' && awsServerIcon}
				</Icon>
				<ResourceItemTitle>{resource.name}</ResourceItemTitle>
			</ResourceItem>
		</React.Fragment>
	);
};

FavoriteOnDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteOnDialogBox;
