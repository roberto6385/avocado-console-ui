import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {Icon} from '../../../../styles/components/icon';
import {
	ResourceItem,
	ResourceItemTitle,
} from '../../../../styles/components/navigationBar';
import {awsServerIcon, linuxServerIcon} from '../../../../icons/icons';
import {
	favoritesAction,
	favoritesSelector,
} from '../../../../reducers/favorites';

const FavoriteOnDialogBox = ({data, indent}) => {
	const dispatch = useDispatch();
	const {tempSelectedFavorite} = useSelector(favoritesSelector.all);

	const onClickFavorite = useCallback(() => {
		if (tempSelectedFavorite === data.key) {
			dispatch(favoritesAction.setTempSelectedFavorite(null));
		} else {
			dispatch(favoritesAction.setTempSelectedFavorite(data.key));
		}
	});

	return (
		<React.Fragment>
			<ResourceItem
				selected={tempSelectedFavorite === data.key ? 1 : 0}
				left={(indent * 11 + 8).toString() + 'px'}
				onClick={onClickFavorite}
			>
				<Icon
					size={'sm'}
					margin_right={'12px'}
					itype={
						tempSelectedFavorite === data.key
							? 'selected'
							: undefined
					}
				>
					{data.icon === 'linux' && linuxServerIcon}
					{data.icon === 'aws' && awsServerIcon}
				</Icon>

				<ResourceItemTitle>{data.name}</ResourceItemTitle>
			</ResourceItem>
		</React.Fragment>
	);
};

FavoriteOnDialogBox.propTypes = {
	data: PropTypes.object.isRequired,
	indent: PropTypes.number.isRequired,
};

export default FavoriteOnDialogBox;
